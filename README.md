# TATUX 3D — Landing

Sitio en Astro, publicado en Vercel. Todo el contenido editable (contacto, cifras,
videos, casos, granjas, máquinas) está en `src/data/site.ts` (`siteConfig`).

## Formularios → Gmail + Notion

Los formularios envían a `POST /api/lead` (`src/pages/api/lead.ts`), que corre como
función serverless en Vercel, valida, filtra spam (honeypot), manda un mail y crea
una fila en el CRM de Notion. Si fallan los dos, el lead queda completo en los logs
de Vercel (buscar `LEAD NO ENTREGADO`).

### Variables de entorno (Vercel → Settings → Environment Variables)

| Variable | Qué es |
| --- | --- |
| `GMAIL_USER` | Cuenta de Gmail que envía los avisos |
| `GMAIL_APP_PASSWORD` | Contraseña de aplicación de esa cuenta (requiere verificación en 2 pasos) |
| `NOTIFY_TO` | Mail(s) de TATUX que reciben los leads, separados por coma |
| `NOTION_TOKEN` | Token de una integración interna de Notion |
| `NOTION_DB_ID` | ID de la base de datos del CRM |

Después de cargarlas hay que hacer **Redeploy** para que se apliquen.

### Base de datos de Notion (CRM)

Crear la base con estas propiedades (nombres exactos) y compartirla con la integración
(… → Conexiones → agregar la integración):

| Propiedad | Tipo |
| --- | --- |
| Nombre | Título |
| Email | Email |
| Teléfono | Teléfono |
| Empresa | Texto |
| Mensaje | Texto |
| Cantidad de piezas | Número |
| Urgencia | Select: Urgente (menos de 1 semana) · 1 a 2 semanas · Dentro del mes · Estoy cotizando, sin apuro |
| Origen | Select: Contacto · Máquinas · Granjas · Hero |
| Estado | Select: Nuevo · Contactado · Cotizado · Ganado · Perdido |
| Fecha de ingreso | Fecha |

## Desarrollo

```bash
npm install
npm run dev
```
