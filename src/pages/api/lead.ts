// POST /api/lead — recibe los formularios de la web, filtra spam y envía el
// lead por mail (Gmail SMTP) y al CRM de Notion. Corre como función
// serverless en Vercel; el resto del sitio sigue siendo estático.
//
// Variables de entorno (configurar en Vercel → Settings → Environment
// Variables, nunca en el repo):
//   GMAIL_USER          cuenta de Gmail que envía (ej: ventas@...)
//   GMAIL_APP_PASSWORD  contraseña de aplicación de esa cuenta
//   NOTIFY_TO           mail de TATUX que recibe los leads (acepta varios separados por coma)
//   NOTION_TOKEN        token de la integración interna de Notion
//   NOTION_DB_ID        ID de la base de datos del CRM
import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
import { siteConfig } from "../../data/site";

export const prerender = false;

interface Lead {
  name: string;
  email: string;
  phone: string;
  company: string;
  project: string;
  quantity: number;
  urgency: string;
  message: string;
  origin: string;
  page: string;
  receivedAt: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const str = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function validate(body: Record<string, unknown>): { lead?: Lead; error?: string } {
  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const company = str(body.company, 200);
  const project = str(body.project, 100);
  const urgency = str(body.urgency, 100);
  const message = str(body.message, 3000);
  const origin = str(body.origin, 40);
  const page = str(body.page, 500);
  const quantity = Number(body.quantity);

  if (name.length < 2) return { error: "Ingresá tu nombre." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: "El email no es válido." };
  if (phone.replace(/\D/g, "").length < 6) return { error: "El teléfono no es válido." };
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10_000_000)
    return { error: "La cantidad de piezas tiene que ser un número entero, mínimo 1." };
  if (!siteConfig.urgencyOptions.includes(urgency)) return { error: "Elegí para cuándo lo necesitás." };
  if (project && !siteConfig.projectOptions.some((option) => option.value === project))
    return { error: "Elegí qué necesitás producir." };

  // Filtro básico de spam: demasiados links en el mensaje.
  if ((message.match(/https?:\/\//gi) ?? []).length > 3) return { error: "El mensaje no pudo procesarse." };

  return {
    lead: {
      name,
      email,
      phone,
      company,
      project,
      quantity,
      urgency,
      message,
      origin: (siteConfig.leadOrigins as string[]).includes(origin) ? origin : "Contacto",
      page,
      receivedAt: new Date().toISOString(),
    },
  };
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function leadRows(lead: Lead): [string, string][] {
  const fecha = new Date(lead.receivedAt).toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
  return [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["WhatsApp / Teléfono", lead.phone],
    ["Empresa", lead.company || "—"],
    ["Qué necesita producir", lead.project || "—"],
    ["Cantidad de piezas", String(lead.quantity)],
    ["Urgencia", lead.urgency],
    ["Mensaje", lead.message || "—"],
    ["Origen (sección)", lead.origin],
    ["Página de origen", lead.page || "—"],
    ["Fecha", fecha],
  ];
}

async function sendEmail(lead: Lead) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !NOTIFY_TO)
    throw new Error("Faltan variables de entorno de Gmail (GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_TO).");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  const rows = leadRows(lead);
  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#000e58">Nuevo lead desde la web</h2>
    <table cellpadding="8" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="border-bottom:1px solid #eee;font-weight:bold;vertical-align:top">${escapeHtml(label)}</td>` +
            `<td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>`;

  await transporter.sendMail({
    from: `"Web TATUX 3D" <${GMAIL_USER}>`,
    to: NOTIFY_TO,
    replyTo: `"${lead.name.replace(/"/g, "")}" <${lead.email}>`,
    subject: `Nuevo lead [${lead.urgency}]: ${lead.name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html,
  });
}

const richText = (value: string) => [{ type: "text", text: { content: value.slice(0, 2000) } }];

async function createNotionRow(lead: Lead) {
  const { NOTION_TOKEN, NOTION_DB_ID } = process.env;
  if (!NOTION_TOKEN || !NOTION_DB_ID) throw new Error("Faltan variables de entorno de Notion (NOTION_TOKEN, NOTION_DB_ID).");

  const mensaje = [lead.project && `Qué necesita producir: ${lead.project}`, lead.message, lead.page && `Página: ${lead.page}`]
    .filter(Boolean)
    .join("\n\n");

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Nombre: { title: richText(lead.name) },
        Email: { email: lead.email },
        "Teléfono": { phone_number: lead.phone },
        Empresa: { rich_text: richText(lead.company) },
        Mensaje: { rich_text: richText(mensaje) },
        "Cantidad de piezas": { number: lead.quantity },
        Urgencia: { select: { name: lead.urgency } },
        Origen: { select: { name: lead.origin } },
        Estado: { select: { name: "Nuevo" } },
        "Fecha de ingreso": { date: { start: lead.receivedAt } },
      },
    }),
  });

  if (!response.ok) throw new Error(`Notion respondió ${response.status}: ${await response.text()}`);
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 20_000) return json({ ok: false, message: "El mensaje es demasiado largo." }, 413);
    body = JSON.parse(raw);
    if (!body || typeof body !== "object") throw new Error("invalid body");
  } catch {
    return json({ ok: false, message: "No pudimos leer el formulario." }, 400);
  }

  // Honeypot: si el campo oculto viene completo es un bot. Respondemos OK sin hacer nada.
  if (str(body.website, 500)) return json({ ok: true });

  const { lead, error } = validate(body);
  if (!lead) return json({ ok: false, message: error }, 422);

  const [mail, notion] = await Promise.allSettled([sendEmail(lead), createNotionRow(lead)]);

  if (mail.status === "rejected") console.error("[lead] Falló el envío del mail:", mail.reason);
  if (notion.status === "rejected") console.error("[lead] Falló la carga en Notion:", notion.reason);

  if (mail.status === "rejected" && notion.status === "rejected") {
    // No perder el lead: queda completo en los logs de Vercel para recuperarlo.
    console.error("[lead] LEAD NO ENTREGADO — recuperar desde este log:", JSON.stringify(lead));
    return json(
      { ok: false, message: "Tuvimos un problema técnico y no pudimos registrar tu consulta." },
      502,
    );
  }

  if (mail.status === "rejected" || notion.status === "rejected") {
    console.warn("[lead] Lead entregado parcialmente:", JSON.stringify(lead));
  }

  return json({ ok: true });
};

export const ALL: APIRoute = () => json({ ok: false, message: "Método no permitido." }, 405);
