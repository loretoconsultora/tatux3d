// ─────────────────────────────────────────────────────────────────────────────
// siteConfig — ÚNICO lugar para editar datos de contacto, cifras, videos y
// contenidos pendientes. Todo lo marcado como PENDIENTE se completa acá.
// ─────────────────────────────────────────────────────────────────────────────

export type LeadOrigin = "Contacto" | "Máquinas" | "Granjas" | "Hero";

export interface CaseItem {
  title: string;
  /** Link del reel: YouTube (normal o Shorts), Instagram (reel/post) o un .mp4 */
  videoUrl: string;
  /** Descripción breve de 2 a 3 líneas */
  description: string;
}

export interface MachineModel {
  name: string;
  /** Precio en texto ("USD 1.500", "$ 2.300.000") o "Consultar" */
  price: string;
  description: string;
  specs: string[];
  image?: string;
}

export const siteConfig = {
  // ── Contacto (confirmados) ────────────────────────────────────────────────
  contact: {
    address: "Aguero 778, CABA",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aguero+778%2C+CABA",
    phone: "+54 9 11 3680-1900",
    phoneHref: "tel:+5491136801900",
    whatsapp: "https://wa.link/x815lx",
    instagramHandle: "@tatux3d.ar",
    instagram: "https://www.instagram.com/tatux3d.ar/",
    facebookHandle: "tatux3d.granjadeimpresion3d",
    facebook: "https://www.facebook.com/tatux3d.granjadeimpresion3d",
    tiktok: "https://www.tiktok.com/@tatux3d.ar",
  },

  // ── Agenda de llamadas ────────────────────────────────────────────────────
  calendlyUrl: "https://calendly.com/contacto-tatux3d/tatux-3d-diagnostico-de-produccion",
  appointmentName: "Llamada",

  // ── Datos a validar con Iair (NO cambiar hasta que confirme) ──────────────
  stats: {
    printers: "30",
    companies: "+100",
    materials: ["ABS", "Nylon"],
    maxHeight: "1 metro",
    maxColors: "4",
  },

  // ── Formularios ───────────────────────────────────────────────────────────
  leadEndpoint: "/api/lead",
  projectOptions: [
    { value: "Prototipo o pieza única", label: "Prototipo o pieza única" },
    { value: "Producción en serie", label: "Producción en serie" },
    { value: "Repuesto o pieza descontinuada", label: "Repuesto o pieza descontinuada" },
    { value: "Todavía no lo sé", label: "Todavía no lo sé" },
  ],
  urgencyOptions: [
    "Urgente (menos de 1 semana)",
    "1 a 2 semanas",
    "Dentro del mes",
    "Estoy cotizando, sin apuro",
  ],
  leadOrigins: ["Contacto", "Máquinas", "Granjas", "Hero"] as LeadOrigin[],

  // ── Video del hero ────────────────────────────────────────────────────────
  // PENDIENTE: link o archivo del video nuevo. Acepta un .mp4/.webm (subilo a
  // /public/videos/ y poné "/videos/hero.mp4") o un link de YouTube.
  // Mientras esté vacío se muestra el video anterior (heroVideoFallbackUrl).
  heroVideoUrl: "",
  heroVideoFallbackUrl: "https://youtu.be/F18dNYVsYVQ",
  heroVideoPoster: "/services/produccion-serie.jpg",

  // ── Entrevista ────────────────────────────────────────────────────────────
  // PENDIENTE: link de YouTube de la entrevista. Vacío = placeholder.
  interviewVideoUrl: "",

  // ── Video "¿Por qué agendar tu Llamada?" ──────────────────────────────────
  bookingVideoId: "gsOjSXkNw_g",

  // ── Casos de éxito con video ──────────────────────────────────────────────
  // PENDIENTE: links de los reels + descripciones. Ejemplo:
  // { title: "Merch para Empresa X", videoUrl: "https://youtube.com/shorts/XXXX",
  //   description: "Produjimos 500 llaveros en 4 colores en 10 días." },
  cases: [] as CaseItem[],

  // ── Granjas de impresión 3D ───────────────────────────────────────────────
  farms: {
    title: "¿Tenés una granja de impresión 3D y los pedidos te desbordan?",
    subtitle: "Delegá tu pedido en nosotros. Producimos por vos, con calidad y en el plazo que necesitás.",
    points: [
      "Capacidad extra para picos de demanda.",
      "Producción en serie con control de calidad.",
      "Seguís manejando la relación con tu cliente.",
    ],
    // PENDIENTE de Iair: mínimos, precios, etc. Vacío = no se muestra.
    conditions: [] as string[],
    cta: "Delegá tu primer pedido",
  },

  // ── Venta de máquinas ─────────────────────────────────────────────────────
  machines: {
    teaserTitle: "¿Querés tu propia producción 3D?",
    teaserText:
      "También vendemos impresoras 3D, con la capacitación y el soporte de quienes producen con ellas todos los días.",
    // PENDIENTE de Iair: modelos y precios (usar "Consultar" si no se publica).
    models: [] as MachineModel[],
    // PENDIENTE de Iair: detalle de capacitación y soporte.
    training: "Te enseñamos a poner en marcha la máquina y a producir con ella. (Detalle pendiente de confirmar.)",
    support: "Te acompañamos después de la compra con soporte técnico. (Detalle pendiente de confirmar.)",
  },
};
