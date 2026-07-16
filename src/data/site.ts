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
  bookingVideoId: "gsOjSXkNw_g",
  bookingVideoUrl: "https://youtube.com/shorts/gsOjSXkNw_g",
  projectOptions: [
    { value: "prototipo", label: "Prototipo o pieza única" },
    { value: "serie", label: "Producción en serie" },
    { value: "repuesto", label: "Repuesto o pieza descontinuada" },
    { value: "no-se", label: "Todavía no lo sé" },
  ],
  social: {
    facebook: "https://www.facebook.com/tatux3d.granjadeimpresion3d",
    instagram: "https://www.instagram.com/tatux3d.arg/",
    tiktok: "https://www.tiktok.com/@tatux3d.ar",
  },
  address: "Agüero 778, C1171 Buenos Aires, CABA, Argentina",
};
