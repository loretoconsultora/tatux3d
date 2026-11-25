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
  /** Foto: subila a /public/maquinas/ y poné "/maquinas/modelo-1.jpg". Vacío = recuadro de espera. */
  image: string;
}

export const siteConfig = {
  // ── Contacto (confirmados) ────────────────────────────────────────────────
  contact: {
    address: "Aguero 778, CABA",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aguero+778%2C+CABA",
    phone: "+54 9 11 3680-1900",
    phoneHref: "tel:+5491136801900",
    whatsapp: "https://wa.link/x815lx",
    // Mismo número, en formato que permite mensaje predeterminado (?text=).
    whatsappNumber: "5491136801900",
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
  // value = lo que se guarda en Notion (los selects de Notion no admiten comas).
  urgencyOptions: [
    { value: "Urgente (menos de 1 semana)", label: "Urgente (menos de 1 semana)" },
    { value: "1 a 2 semanas", label: "1 a 2 semanas" },
    { value: "Dentro del mes", label: "Dentro del mes" },
    { value: "Estoy cotizando sin apuro", label: "Estoy cotizando, sin apuro" },
  ],
  leadOrigins: ["Contacto", "Máquinas", "Granjas", "Hero"] as LeadOrigin[],

  // ── Video del hero ────────────────────────────────────────────────────────
  // Acepta un .mp4/.webm (subilo a /public/videos/ y poné "/videos/hero.mp4"),
  // un link de YouTube o de Instagram. Solo el .mp4 permite autoplay
  // silenciado + loop; Instagram se muestra con su reproductor.
  // Vacío = se muestra el video anterior (heroVideoFallbackUrl).
  heroVideoUrl: "https://www.instagram.com/p/Dez9L6MFYpn/",
  heroVideoFallbackUrl: "https://youtu.be/F18dNYVsYVQ",
  heroVideoPoster: "/services/produccion-serie.jpg",

  // ── Entrevista ────────────────────────────────────────────────────────────
  // PENDIENTE: link de YouTube de la entrevista. Vacío = placeholder.
  interviewVideoUrl: "",

  // ── Video "¿Por qué agendar tu Llamada?" ──────────────────────────────────
  bookingVideoId: "gsOjSXkNw_g",

  // ── Casos de éxito con video ──────────────────────────────────────────────
  // Se muestran como carrusel horizontal, en este orden.
  cases: [
    {
      title: "Soporte giratorio para tablets",
      videoUrl: "https://www.instagram.com/p/Df9xK5avLD9/",
      description:
        "De un soporte enorme que no convencía a uno optimizado, firme y giratorio 🔄📱 Lo diseñamos, lo probamos y ajustamos hasta que la tablet entró a la perfección. ¡15 unidades listas para las mesas de nuestro cliente! 🍴✨",
    },
    {
      title: "Contenedores a medida para un dispenser",
      videoUrl: "https://www.instagram.com/p/DfqHHXDtWkH/",
      description:
        "Las piezas que nadie ve, pero que hacen que todo funcione 💧⚙️ Para este dispenser hicimos contenedores a medida, con el material justo para aguantar el agua caliente 🔥",
    },
    {
      title: "Soporte de hilo dental con Desta Tools",
      videoUrl: "https://www.instagram.com/p/DfR9R2-x-DG/",
      description:
        "200 piezas, un producto listo para vender 🦷✨ Así se hizo realidad este soporte de hilo dental con forma de muela, en colaboración con Desta Tools 🤝",
    },
    {
      title: "De una imagen con IA a 200 esculturas",
      videoUrl: "https://www.instagram.com/p/DfFp-1Rulp0/",
      description:
        "De una imagen hecha con IA a 200 esculturas realistas 🤯 Ahora imaginá lo que podemos hacer con tu idea: muñecos de acción, figuras de tus personajes favoritos, juguetes personalizados 🧸✨",
    },
    {
      title: "1.600 piezas para 200 abanicos",
      videoUrl: "https://www.instagram.com/p/De_46Y6IHJy/",
      description:
        "1.600 piezas para 200 abanicos: ese fue el desafío 🪭 Los abanicos volvieron con todo, y cuando un producto se lanza al mercado, los detalles hacen la diferencia ✨",
    },
    {
      title: "De una pieza a 3.000 para clubes",
      videoUrl: "https://www.instagram.com/p/DduXTslgWKA/",
      description:
        "Un cliente nos escribió por una pieza para enganchar las redes de los arcos de su club ⚽ La diseñamos, elegimos un material que aguante sol y pelotazos y validamos con una pieza de prueba 🖨️ Después vio la oportunidad y nos pidió 3.000 más para vender en otros clubes 📈",
    },
    {
      title: "Regalos corporativos que se guardan",
      videoUrl: "https://www.instagram.com/p/DeAL402iAwT/",
      description:
        "No todos los regalos corporativos terminan en un cajón 👇 Cuando el objeto tiene sentido para quien lo recibe, deja de ser \"otro regalo más\" y pasa a ser algo que la gente guarda con cariño.",
    },
  ] as CaseItem[],

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
    // Botón de cada tarjeta: abre WhatsApp con este mensaje.
    whatsappMessage: "Hola, he entrado a su página y quiero adquirir una impresora con ustedes.",
    // PENDIENTE de Iair: reemplazar nombre, foto, descripción y precio de cada modelo.
    models: [
      { name: "Modelo 1", image: "", description: "Descripción breve del modelo: volumen de impresión, materiales y para qué tipo de producción conviene.", price: "Consultar" },
      { name: "Modelo 2", image: "", description: "Descripción breve del modelo: volumen de impresión, materiales y para qué tipo de producción conviene.", price: "Consultar" },
      { name: "Modelo 3", image: "", description: "Descripción breve del modelo: volumen de impresión, materiales y para qué tipo de producción conviene.", price: "Consultar" },
    ] as MachineModel[],
    // PENDIENTE de Iair: detalle de capacitación y soporte.
    training: "Te enseñamos a poner en marcha la máquina y a producir con ella. (Detalle pendiente de confirmar.)",
    support: "Te acompañamos después de la compra con soporte técnico. (Detalle pendiente de confirmar.)",
  },
};
