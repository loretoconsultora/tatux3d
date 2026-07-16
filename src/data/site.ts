// Central place for content that is still pending confirmation from the client.
// Update these once real values are available.

export const site = {
  calendlyUrl: "https://calendly.com/contacto-tatux3d/tatux-3d-diagnostico-de-produccion",
  appointmentName: "Llamada",
  // TODO: replace with the real n8n webhook URL once it's set up. The form
  // POSTs the registration here before revealing the Calendly link.
  registrationWebhookUrl: "https://REPLACE-WITH-N8N-WEBHOOK-URL",
  whatsapp: "https://wa.me/5491136801900",
  whatsappMessage: "Hola! Quiero hablar con un asesor de TATUX 3D sobre mi proyecto.",
  email: "contacto@tatux3d.com", // TODO: confirm real inbox
  introVideoId: "F18dNYVsYVQ",
  introVideoUrl: "https://youtu.be/F18dNYVsYVQ",
  projectOptions: [
    { value: "prototipo", label: "Prototipo o pieza única" },
    { value: "serie", label: "Producción en serie" },
    { value: "repuesto", label: "Repuesto o pieza descontinuada" },
    { value: "no-se", label: "Todavía no lo sé" },
  ],
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
};
