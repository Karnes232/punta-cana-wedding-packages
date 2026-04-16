/**
 * Seed script — General Layout singleton
 *
 * Creates (or replaces) the generalLayout document in Sanity with realistic
 * placeholder data for Punta Cana Wedding Packages.
 *
 * Usage:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load .env.local from project root
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required env vars. Check .env.local.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-04-14',
  token,
  useCdn: false,
})

const generalLayout = {
  _id: 'generalLayout',
  _type: 'generalLayout',

  // ── Branding ────────────────────────────────────────────────────────────────
  brandName: 'Punta Cana Wedding Packages',

  // logo and favicon are image assets — skip in seed (upload via Studio)

  // ── Contact ─────────────────────────────────────────────────────────────────
  phoneNumber: '18295551234',
  email: 'hello@puntacanaweddings.com',

  // ── Social Media ─────────────────────────────────────────────────────────────
  socialLinks: [
    {
      _key: 'instagram',
      _type: 'socialLink',
      platform: 'instagram',
      url: 'https://www.instagram.com/puntacanaweddings',
    },
    {
      _key: 'facebook',
      _type: 'socialLink',
      platform: 'facebook',
      url: 'https://www.facebook.com/puntacanaweddings',
    },
    {
      _key: 'tiktok',
      _type: 'socialLink',
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@puntacanaweddings',
    },
    {
      _key: 'pinterest',
      _type: 'socialLink',
      platform: 'pinterest',
      url: 'https://www.pinterest.com/puntacanaweddings',
    },
  ],

  // ── Footer ───────────────────────────────────────────────────────────────────
  footerDescription: {
    _type: 'localizedText',
    en: 'Your destination wedding sanctuary in Punta Cana, Dominican Republic. Beautiful weddings, transparent pricing, zero stress.',
    es: 'Tu santuario de bodas en Punta Cana, República Dominicana. Bodas hermosas, precios transparentes, sin estrés.',
  },

}

const homePage = {
  _id: 'homePage',
  _type: 'homePage',

  // ── Hero ─────────────────────────────────────────────────────────────────────
  heroTitle: {
    _type: 'localizedString',
    en: 'Design Your Dream Wedding in Punta Cana',
    es: 'Diseña la Boda de Tus Sueños en Punta Cana',
  },
  heroSubtitle: {
    _type: 'localizedText',
    en: 'Create your perfect destination wedding in minutes. Transparent pricing, real choices, zero stress.',
    es: 'Crea tu boda de destino perfecta en minutos. Precios transparentes, opciones reales, sin estrés.',
  },

  // heroImage: upload via Studio

  // ── How It Works ─────────────────────────────────────────────────────────────
  howItWorksSteps: [
    {
      _key: 'step1',
      _type: 'step',
      title: { _type: 'localizedString', en: 'Choose Your Style', es: 'Elige Tu Estilo' },
      description: {
        _type: 'localizedText',
        en: 'Pick your date, guest count, and venue preference in seconds.',
        es: 'Elige tu fecha, número de invitados y preferencia de lugar en segundos.',
      },
    },
    {
      _key: 'step2',
      _type: 'step',
      title: { _type: 'localizedString', en: 'Customize Everything', es: 'Personaliza Todo' },
      description: {
        _type: 'localizedText',
        en: 'Select your menu, decor, photography, entertainment, and more.',
        es: 'Selecciona tu menú, decoración, fotografía, entretenimiento y más.',
      },
    },
    {
      _key: 'step3',
      _type: 'step',
      title: { _type: 'localizedString', en: 'See Your Price', es: 'Ve Tu Precio' },
      description: {
        _type: 'localizedText',
        en: 'Every choice updates your estimated total in real time — no surprises.',
        es: 'Cada elección actualiza tu total estimado en tiempo real — sin sorpresas.',
      },
    },
    {
      _key: 'step4',
      _type: 'step',
      title: { _type: 'localizedString', en: 'Submit & We Plan', es: 'Envía y Planificamos' },
      description: {
        _type: 'localizedText',
        en: 'Send us your configuration and our team takes it from there.',
        es: 'Envíanos tu configuración y nuestro equipo se encarga del resto.',
      },
    },
  ],

  // galleryImages: upload via Studio

  // ── Transparent Pricing ───────────────────────────────────────────────────────
  pricingStartingFrom: 4100,
  pricingDescription: {
    _type: 'localizedText',
    en: 'Every element — menu, decor, photography, entertainment — is priced upfront. Build your wedding and see exactly what it costs before you commit to anything.',
    es: 'Cada elemento — menú, decoración, fotografía, entretenimiento — tiene precio definido. Diseña tu boda y ve exactamente cuánto cuesta antes de comprometerte.',
  },

  // ── Why Choose Us ─────────────────────────────────────────────────────────────
  whyTitle: {
    _type: 'localizedString',
    en: 'Why Choose Punta Cana Wedding Packages?',
    es: '¿Por Qué Elegirnos?',
  },

  // whyTeamPhoto: upload via Studio

  whyPoints: [
    {
      _key: 'point1',
      _type: 'point',
      en: 'Fixed venue at Cabeza de Toro — a stunning beachfront location',
      es: 'Lugar fijo en Cabeza de Toro — un impresionante lugar frente al mar',
    },
    {
      _key: 'point2',
      _type: 'point',
      en: 'Predetermined pricing — no hidden fees or last-minute surprises',
      es: 'Precios predeterminados — sin cargos ocultos ni sorpresas de último momento',
    },
    {
      _key: 'point3',
      _type: 'point',
      en: 'Dedicated wedding coordinator from first inquiry to the big day',
      es: 'Coordinadora de bodas dedicada desde la primera consulta hasta el gran día',
    },
    {
      _key: 'point4',
      _type: 'point',
      en: 'Available 7 days a week via WhatsApp, email, and video call',
      es: 'Disponibles 7 días a la semana por WhatsApp, correo y videollamada',
    },
    {
      _key: 'point5',
      _type: 'point',
      en: 'Full legal paperwork handled for you in the Dominican Republic',
      es: 'Toda la documentación legal gestionada por nosotros en República Dominicana',
    },
  ],
}

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',

  // ── Hero ─────────────────────────────────────────────────────────────────────
  heroTitle: {
    _type: 'localizedString',
    en: 'The Team Behind Your Dream Wedding',
    es: 'El Equipo Detrás de la Boda de Tus Sueños',
  },
  heroSubtitle: {
    _type: 'localizedText',
    en: 'We are a dedicated team of wedding specialists based in Punta Cana, passionate about creating unforgettable moments for couples from around the world.',
    es: 'Somos un equipo dedicado de especialistas en bodas con sede en Punta Cana, apasionados por crear momentos inolvidables para parejas de todo el mundo.',
  },

  // heroImage: upload via Studio

  // ── Story ─────────────────────────────────────────────────────────────────────
  storyTitle: {
    _type: 'localizedString',
    en: 'Our Story',
    es: 'Nuestra Historia',
  },

  storyContent: {
    _type: 'localizedBlock',
    en: [
      makeBlock('We started Punta Cana Wedding Packages with a simple belief: planning a destination wedding should feel exciting — not overwhelming. Too many couples spent months chasing quotes, coordinating vendors, and managing uncertainty. We built a better way.'),
      makeBlock('Based at the stunning Cabeza de Toro beach, our team brings years of experience in destination weddings together with a transparent, technology-driven planning process. Every couple deserves to see exactly what their wedding costs before they commit to anything.'),
      makeBlock('Today we have helped hundreds of couples from around the world say "I do" on the shores of the Caribbean. Each wedding is unique, each couple is different — and that is exactly why we built a tool that puts you in control while our team handles the rest.'),
    ],
    es: [
      makeBlock('Comenzamos Punta Cana Wedding Packages con una creencia simple: planificar una boda de destino debería sentirse emocionante, no agobiante. Demasiadas parejas pasaban meses persiguiendo cotizaciones, coordinando proveedores y gestionando la incertidumbre. Construimos una mejor manera.'),
      makeBlock('Con sede en la impresionante playa de Cabeza de Toro, nuestro equipo combina años de experiencia en bodas de destino con un proceso de planificación transparente y tecnológico. Cada pareja merece ver exactamente cuánto cuesta su boda antes de comprometerse con cualquier cosa.'),
      makeBlock('Hoy hemos ayudado a cientos de parejas de todo el mundo a decir "sí, acepto" a orillas del Caribe. Cada boda es única, cada pareja es diferente — y es exactamente por eso que construimos una herramienta que te pone en control mientras nuestro equipo se encarga del resto.'),
    ],
  },

  // storyImage: upload via Studio

  // ── Venue ─────────────────────────────────────────────────────────────────────
  venueTitle: {
    _type: 'localizedString',
    en: 'The Venue — Cabeza de Toro',
    es: 'El Lugar — Cabeza de Toro',
  },
  venueDescription: {
    _type: 'localizedText',
    en: "Cabeza de Toro is one of Punta Cana's most spectacular beachfront locations. Nestled between swaying palms and the turquoise Caribbean Sea, it provides the perfect backdrop for the wedding of your dreams. Whether you envision an intimate ceremony for 20 guests or a grand celebration for 200, this venue adapts beautifully to every vision.",
    es: 'Cabeza de Toro es uno de los lugares frente al mar más espectaculares de Punta Cana. Ubicado entre palmeras y el mar Caribe turquesa, ofrece el escenario perfecto para la boda de tus sueños. Ya sea una ceremonia íntima de 20 invitados o una gran celebración de 200, este lugar se adapta a cada visión.',
  },
  venueHighlights: [
    { _key: 'h1', _type: 'highlight', en: 'Beachfront ceremony location with breathtaking ocean views', es: 'Ceremonia frente al mar con vistas impresionantes al océano' },
    { _key: 'h2', _type: 'highlight', en: 'Capacity for intimate gatherings to grand celebrations of 200+ guests', es: 'Capacidad desde reuniones íntimas hasta celebraciones de más de 200 invitados' },
    { _key: 'h3', _type: 'highlight', en: 'Professional sound, lighting, and staging fully included', es: 'Sonido, iluminación y escenografía profesional completamente incluidos' },
    { _key: 'h4', _type: 'highlight', en: 'Exclusive access to vetted catering, floral, and entertainment vendors', es: 'Acceso exclusivo a proveedores verificados de catering, flores y entretenimiento' },
    { _key: 'h5', _type: 'highlight', en: 'On-site coordination team present throughout your entire event', es: 'Equipo de coordinación presente durante todo tu evento' },
  ],

  // ── Team ─────────────────────────────────────────────────────────────────────
  teamTitle: {
    _type: 'localizedString',
    en: 'Meet the Team',
    es: 'Conoce al Equipo',
  },
  teamMembers: [
    {
      _key: 'member1',
      _type: 'member',
      name: 'Sofia Martínez',
      role: { _type: 'localizedString', en: 'Lead Wedding Coordinator', es: 'Coordinadora Principal de Bodas' },
      bio: {
        _type: 'localizedText',
        en: 'Sofia has coordinated over 200 destination weddings in Punta Cana over the past decade. Her calm presence and meticulous attention to detail make every couple feel completely at ease.',
        es: 'Sofía ha coordinado más de 200 bodas de destino en Punta Cana durante la última década. Su presencia tranquila y atención meticulosa al detalle hacen que cada pareja se sienta completamente tranquila.',
      },
      // photo: upload via Studio
    },
    {
      _key: 'member2',
      _type: 'member',
      name: 'Carlos Reyes',
      role: { _type: 'localizedString', en: 'Venue & Logistics Manager', es: 'Gerente de Lugar y Logística' },
      bio: {
        _type: 'localizedText',
        en: 'Carlos oversees all venue operations, vendor relationships, and day-of logistics. He has an unmatched knowledge of the Cabeza de Toro property and the entire Punta Cana supplier network.',
        es: 'Carlos supervisa todas las operaciones del lugar, relaciones con proveedores y logística del día. Tiene un conocimiento inigualable de la propiedad de Cabeza de Toro y la red de proveedores de Punta Cana.',
      },
      // photo: upload via Studio
    },
  ],

  // ── Values ───────────────────────────────────────────────────────────────────
  valuesTitle: {
    _type: 'localizedString',
    en: 'What We Stand For',
    es: 'Lo Que Nos Define',
  },
  values: [
    {
      _key: 'v1',
      _type: 'value',
      title: { _type: 'localizedString', en: 'Transparency', es: 'Transparencia' },
      description: { _type: 'localizedText', en: 'Every price is visible before you commit. No hidden fees, no surprise invoices — just honest, upfront costs.', es: 'Cada precio es visible antes de comprometerte. Sin cargos ocultos ni facturas sorpresa — solo costos honestos y claros.' },
    },
    {
      _key: 'v2',
      _type: 'value',
      title: { _type: 'localizedString', en: 'Simplicity', es: 'Simplicidad' },
      description: { _type: 'localizedText', en: 'We built our platform so that planning a wedding takes minutes, not months. Simple tools, clear process.', es: 'Construimos nuestra plataforma para que planificar una boda tome minutos, no meses. Herramientas simples, proceso claro.' },
    },
    {
      _key: 'v3',
      _type: 'value',
      title: { _type: 'localizedString', en: 'Elegance', es: 'Elegancia' },
      description: { _type: 'localizedText', en: 'Beautiful weddings are our craft. We obsess over every detail so your day looks and feels extraordinary.', es: 'Las bodas hermosas son nuestro oficio. Nos obsesionamos con cada detalle para que tu día se vea y se sienta extraordinario.' },
    },
    {
      _key: 'v4',
      _type: 'value',
      title: { _type: 'localizedString', en: 'Dedication', es: 'Dedicación' },
      description: { _type: 'localizedText', en: 'From your first inquiry to the last dance, our team is with you every step — 7 days a week.', es: 'Desde tu primera consulta hasta el último baile, nuestro equipo está contigo en cada paso — 7 días a la semana.' },
    },
  ],
}

const howItWorksPage = {
  _id: 'howItWorksPage',
  _type: 'howItWorksPage',

  // ── Hero ─────────────────────────────────────────────────────────────────────
  heroTitle: {
    _type: 'localizedString',
    en: 'The Path to Your Perfect Wedding',
    es: 'El Camino Hacia Tu Boda Perfecta',
  },
  heroSubtitle: {
    _type: 'localizedText',
    en: 'Our simple, guided process takes you from first idea to final plan in minutes. No back-and-forth, no waiting for quotes — just clarity from the start.',
    es: 'Nuestro proceso simple y guiado te lleva desde la primera idea hasta el plan final en minutos. Sin idas y venidas, sin esperar cotizaciones — solo claridad desde el principio.',
  },

  // heroImage: upload via Studio

  // ── Process Steps ─────────────────────────────────────────────────────────────
  processTitle: {
    _type: 'localizedString',
    en: 'How It Works',
    es: 'Cómo Funciona',
  },
  processSteps: [
    {
      _key: 'step1',
      _type: 'step',
      title: { _type: 'localizedString', en: 'Design Your Wedding', es: 'Diseña Tu Boda' },
      description: {
        _type: 'localizedText',
        en: 'Open the wedding builder and walk through each element — guests, menu, drinks, decor, photography, and more.',
        es: 'Abre el constructor de bodas y recorre cada elemento — invitados, menú, bebidas, decoración, fotografía y más.',
      },
    },
    {
      _key: 'step2',
      _type: 'step',
      title: { _type: 'localizedString', en: 'Get Your Estimate', es: 'Obtén Tu Estimado' },
      description: {
        _type: 'localizedText',
        en: 'Every choice updates your total in real time. See a full price breakdown before committing to anything.',
        es: 'Cada elección actualiza tu total en tiempo real. Ve un desglose completo de precios antes de comprometerte con cualquier cosa.',
      },
    },
    {
      _key: 'step3',
      _type: 'step',
      title: { _type: 'localizedString', en: 'Submit Your Request', es: 'Envía Tu Solicitud' },
      description: {
        _type: 'localizedText',
        en: "When you're happy with your configuration, submit it. Your full wedding plan lands directly in our team's inbox.",
        es: 'Cuando estés satisfecho con tu configuración, envíala. Tu plan completo de boda llega directamente a la bandeja de entrada de nuestro equipo.',
      },
    },
    {
      _key: 'step4',
      _type: 'step',
      title: { _type: 'localizedString', en: 'We Plan Together', es: 'Planificamos Juntos' },
      description: {
        _type: 'localizedText',
        en: 'A dedicated coordinator contacts you within 24 hours to confirm details, answer questions, and lock in your date.',
        es: 'Una coordinadora dedicada te contacta en 24 horas para confirmar detalles, responder preguntas y asegurar tu fecha.',
      },
    },
  ],

  // ── Financial Peace of Mind ───────────────────────────────────────────────────
  paymentTitle: {
    _type: 'localizedString',
    en: 'Financial Peace of Mind',
    es: 'Tranquilidad Financiera',
  },
  depositAmount: 500,
  depositDescription: {
    _type: 'localizedText',
    en: 'Your $500 deposit is fully deductible from your total wedding cost. If your plans change, we offer a full refund up to 90 days before your event.',
    es: 'Tu depósito de $500 es totalmente deducible del costo total de tu boda. Si tus planes cambian, ofrecemos un reembolso completo hasta 90 días antes de tu evento.',
  },
  paymentScheduleNote: {
    _type: 'localizedText',
    en: '50% of your remaining balance is due 30 days before the wedding. The final 50% is due 15 days before. No lump-sum surprises — just two predictable installments.',
    es: 'El 50% de tu saldo restante vence 30 días antes de la boda. El 50% final vence 15 días antes. Sin sorpresas de suma global — solo dos cuotas predecibles.',
  },
  flexibilityNote: {
    _type: 'localizedText',
    en: 'Need to shift your date? We allow one free date change up to 6 months in advance, subject to venue availability. Your deposit carries over automatically.',
    es: '¿Necesitas cambiar tu fecha? Permitimos un cambio de fecha gratuito hasta 6 meses de anticipación, sujeto a disponibilidad del lugar. Tu depósito se transfiere automáticamente.',
  },
  advanceBookingNote: {
    _type: 'localizedText',
    en: 'Securing your date early costs you nothing extra. Book now for 2026 or 2027 — your deposit holds your slot while you continue planning at your own pace.',
    es: 'Asegurar tu fecha anticipadamente no te cuesta nada extra. Reserva ahora para 2026 o 2027 — tu depósito reserva tu lugar mientras continúas planificando a tu propio ritmo.',
  },

  // ── Why It Works ─────────────────────────────────────────────────────────────
  whyTitle: {
    _type: 'localizedString',
    en: 'Why This Works for Modern Couples',
    es: '¿Por Qué Funciona para Parejas Modernas?',
  },
  whyBody: {
    _type: 'localizedText',
    en: 'Modern couples are busy. They want clarity, not confusion — and they want to feel in control without being overwhelmed. Our process was built from scratch to respect your time, your budget, and your vision. Every tool, every step, every interaction is designed to feel simple and reassuring.',
    es: 'Las parejas modernas están ocupadas. Quieren claridad, no confusión — y quieren sentir que tienen el control sin estar abrumadas. Nuestro proceso fue construido desde cero para respetar tu tiempo, tu presupuesto y tu visión. Cada herramienta, cada paso, cada interacción está diseñada para sentirse simple y tranquilizadora.',
  },
  whyPoints: [
    {
      _key: 'wp1',
      _type: 'point',
      en: 'No brokers, no middlemen — you speak directly with your coordinator',
      es: 'Sin intermediarios — hablas directamente con tu coordinadora',
    },
    {
      _key: 'wp2',
      _type: 'point',
      en: 'Pricing is fixed and visible before you commit to anything',
      es: 'Los precios son fijos y visibles antes de comprometerte con cualquier cosa',
    },
    {
      _key: 'wp3',
      _type: 'point',
      en: 'Build your full wedding configuration in under 15 minutes',
      es: 'Configura tu boda completa en menos de 15 minutos',
    },
    {
      _key: 'wp4',
      _type: 'point',
      en: 'Our team is reachable 7 days a week via WhatsApp, email, or video call',
      es: 'Nuestro equipo está disponible 7 días a la semana por WhatsApp, correo o videollamada',
    },
  ],

  // whyImage: upload via Studio

  // ── FAQ ───────────────────────────────────────────────────────────────────────
  faqTitle: {
    _type: 'localizedString',
    en: 'Frequently Asked Questions',
    es: 'Preguntas Frecuentes',
  },
  faqItems: [
    {
      _key: 'faq1',
      _type: 'faqItem',
      question: { _type: 'localizedString', en: 'Is the $500 deposit refundable?', es: '¿Es reembolsable el depósito de $500?' },
      answer: {
        _type: 'localizedText',
        en: 'Yes — fully refundable. If you cancel more than 90 days before your wedding date, you receive a 100% refund of your deposit. No questions asked.',
        es: 'Sí — totalmente reembolsable. Si cancelas más de 90 días antes de tu fecha de boda, recibes un reembolso del 100% de tu depósito. Sin preguntas.',
      },
    },
    {
      _key: 'faq2',
      _type: 'faqItem',
      question: { _type: 'localizedString', en: 'Can I change my wedding date after booking?', es: '¿Puedo cambiar mi fecha de boda después de reservar?' },
      answer: {
        _type: 'localizedText',
        en: 'Absolutely. We allow one free date change up to 6 months before your event, subject to venue availability. Your deposit automatically carries over to the new date.',
        es: 'Absolutamente. Permitimos un cambio de fecha gratuito hasta 6 meses antes de tu evento, sujeto a disponibilidad del lugar. Tu depósito se transfiere automáticamente a la nueva fecha.',
      },
    },
    {
      _key: 'faq3',
      _type: 'faqItem',
      question: { _type: 'localizedString', en: 'How long does it take to get a full wedding plan?', es: '¿Cuánto tiempo tarda obtener un plan de boda completo?' },
      answer: {
        _type: 'localizedText',
        en: 'Using the wedding builder, you can configure your entire wedding in under 15 minutes. Once you submit, our coordinator will contact you within 24 hours to confirm details and lock in your date.',
        es: 'Usando el constructor de bodas, puedes configurar toda tu boda en menos de 15 minutos. Una vez que envíes, nuestra coordinadora te contactará en 24 horas para confirmar detalles y asegurar tu fecha.',
      },
    },
    {
      _key: 'faq4',
      _type: 'faqItem',
      question: { _type: 'localizedString', en: 'What payment methods do you accept?', es: '¿Qué métodos de pago aceptan?' },
      answer: {
        _type: 'localizedText',
        en: 'We accept international bank transfers, credit cards (Visa, Mastercard, Amex), and PayPal. All prices are quoted in USD.',
        es: 'Aceptamos transferencias bancarias internacionales, tarjetas de crédito (Visa, Mastercard, Amex) y PayPal. Todos los precios están en USD.',
      },
    },
    {
      _key: 'faq5',
      _type: 'faqItem',
      question: { _type: 'localizedString', en: 'What happens if I need to cancel the wedding?', es: '¿Qué pasa si necesito cancelar la boda?' },
      answer: {
        _type: 'localizedText',
        en: 'Cancellations made more than 90 days before the event receive a full deposit refund. Cancellations within 90 days are non-refundable but the deposit can be applied toward a future date.',
        es: 'Las cancelaciones hechas más de 90 días antes del evento reciben un reembolso completo del depósito. Las cancelaciones dentro de los 90 días no son reembolsables, pero el depósito puede aplicarse a una fecha futura.',
      },
    },
  ],
}

// ── Privacy Policy seed helpers ──────────────────────────────────────────────
function makeBlock(text: string) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
  }
}

function makeHeading(text: string) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
  }
}

const privacyPolicy = {
  _id: 'privacyPolicy',
  _type: 'privacyPolicy',
  title: {
    _type: 'localizedString',
    en: 'Privacy Policy',
    es: 'Política de Privacidad',
  },
  content: {
    _type: 'localizedBlock',
    en: [
      makeBlock('This Privacy Policy describes how Punta Cana Wedding Packages collects, uses, and protects your personal information when you use our website and services.'),
      makeHeading('Information We Collect'),
      makeBlock('We collect information you provide directly to us when you use our wedding builder, submit a planning request, or contact us. This may include your name, email address, phone number, and wedding preferences.'),
      makeHeading('How We Use Your Information'),
      makeBlock('We use the information we collect to provide, maintain, and improve our services, communicate with you about your wedding planning, and respond to your inquiries. We do not sell your personal information to third parties.'),
      makeHeading('Cookies'),
      makeBlock('We use cookies to improve your experience on our website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'),
      makeHeading('Data Security'),
      makeBlock('We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'),
      makeHeading('Contact Us'),
      makeBlock('If you have any questions about this Privacy Policy, please contact us at hello@puntacanaweddings.com.'),
    ],
    es: [
      makeBlock('Esta Política de Privacidad describe cómo Punta Cana Wedding Packages recopila, usa y protege tu información personal cuando usas nuestro sitio web y servicios.'),
      makeHeading('Información que Recopilamos'),
      makeBlock('Recopilamos la información que nos proporcionas directamente cuando usas nuestro constructor de bodas, envías una solicitud de planificación o nos contactas. Esto puede incluir tu nombre, dirección de correo electrónico, número de teléfono y preferencias de boda.'),
      makeHeading('Cómo Usamos Tu Información'),
      makeBlock('Usamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, comunicarnos contigo sobre la planificación de tu boda y responder a tus consultas. No vendemos tu información personal a terceros.'),
      makeHeading('Cookies'),
      makeBlock('Usamos cookies para mejorar tu experiencia en nuestro sitio web. Puedes instruir a tu navegador para que rechace todas las cookies o para que indique cuándo se envía una cookie.'),
      makeHeading('Seguridad de Datos'),
      makeBlock('Implementamos medidas técnicas y organizativas apropiadas para proteger tu información personal contra el acceso no autorizado, alteración, divulgación o destrucción.'),
      makeHeading('Contáctanos'),
      makeBlock('Si tienes alguna pregunta sobre esta Política de Privacidad, contáctanos en hello@puntacanaweddings.com.'),
    ],
  },
}

const termsOfService = {
  _id: 'termsOfService',
  _type: 'termsOfService',
  title: {
    _type: 'localizedString',
    en: 'Terms of Service',
    es: 'Términos de Servicio',
  },
  content: {
    _type: 'localizedBlock',
    en: [
      makeBlock('By using the Punta Cana Wedding Packages website and services, you agree to the following terms and conditions. Please read them carefully.'),
      makeHeading('Use of Service'),
      makeBlock('Our wedding builder and planning tools are provided for the purpose of configuring and submitting wedding planning requests. You agree to use our services only for lawful purposes and in accordance with these terms.'),
      makeHeading('Payments & Deposit'),
      makeBlock('A refundable deposit of $500 USD is required to secure your wedding date. The remaining balance is due in two installments: 50% at 30 days before the event and 50% at 15 days before the event. All prices are quoted in USD.'),
      makeHeading('Cancellation Policy'),
      makeBlock('Cancellations made more than 90 days before the event are eligible for a full deposit refund. Cancellations within 90 days of the event are non-refundable, but the deposit may be applied to a future booking subject to availability.'),
      makeHeading('Date Changes'),
      makeBlock('One free date change is permitted up to 6 months before the event, subject to venue availability. Subsequent date changes may incur an administrative fee.'),
      makeHeading('Limitation of Liability'),
      makeBlock('Punta Cana Wedding Packages shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or from events beyond our reasonable control, including weather, natural disasters, or government actions.'),
      makeHeading('Contact'),
      makeBlock('For questions about these terms, please contact us at hello@puntacanaweddings.com.'),
    ],
    es: [
      makeBlock('Al usar el sitio web y los servicios de Punta Cana Wedding Packages, aceptas los siguientes términos y condiciones. Por favor léelos cuidadosamente.'),
      makeHeading('Uso del Servicio'),
      makeBlock('Nuestro constructor de bodas y herramientas de planificación se proporcionan con el propósito de configurar y enviar solicitudes de planificación de bodas. Aceptas usar nuestros servicios solo para propósitos legales y de acuerdo con estos términos.'),
      makeHeading('Pagos y Depósito'),
      makeBlock('Se requiere un depósito reembolsable de $500 USD para asegurar tu fecha de boda. El saldo restante vence en dos cuotas: 50% 30 días antes del evento y 50% 15 días antes del evento. Todos los precios están en USD.'),
      makeHeading('Política de Cancelación'),
      makeBlock('Las cancelaciones realizadas más de 90 días antes del evento son elegibles para un reembolso completo del depósito. Las cancelaciones dentro de los 90 días del evento no son reembolsables, pero el depósito puede aplicarse a una reserva futura sujeta a disponibilidad.'),
      makeHeading('Cambios de Fecha'),
      makeBlock('Se permite un cambio de fecha gratuito hasta 6 meses antes del evento, sujeto a disponibilidad del lugar. Los cambios de fecha posteriores pueden incurrir en una tarifa administrativa.'),
      makeHeading('Limitación de Responsabilidad'),
      makeBlock('Punta Cana Wedding Packages no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso de nuestros servicios o de eventos fuera de nuestro control razonable, incluido el clima, desastres naturales o acciones gubernamentales.'),
      makeHeading('Contacto'),
      makeBlock('Para preguntas sobre estos términos, contáctanos en hello@puntacanaweddings.com.'),
    ],
  },
}

const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',

  heroTitle: {
    _type: 'localizedString',
    en: "Let's Plan Your Dream Wedding",
    es: 'Planifiquemos la Boda de Tus Sueños',
  },
  heroSubtitle: {
    _type: 'localizedText',
    en: 'We are here to help you every step of the way. Reach out and we will get back to you within 24 hours.',
    es: 'Estamos aquí para ayudarte en cada paso del camino. Contáctanos y te responderemos en 24 horas.',
  },

  // heroImage: upload via Studio

  introText: {
    _type: 'localizedText',
    en: 'Fill in the details below and we\'ll get back to you within 24 hours. You can also reach us directly on WhatsApp or by email.',
    es: 'Completa los datos a continuación y te responderemos en 24 horas. También puedes contactarnos directamente por WhatsApp o correo electrónico.',
  },
}

// ─── Blog Categories ──────────────────────────────────────────────────────────

const blogCategories = [
  {
    _id: 'blog-category-planning',
    _type: 'blogCategory',
    title: 'Planning Tips',
    slug: { _type: 'slug', current: 'planning-tips' },
  },
  {
    _id: 'blog-category-punta-cana',
    _type: 'blogCategory',
    title: 'Punta Cana',
    slug: { _type: 'slug', current: 'punta-cana' },
  },
  {
    _id: 'blog-category-real-weddings',
    _type: 'blogCategory',
    title: 'Real Weddings',
    slug: { _type: 'slug', current: 'real-weddings' },
  },
]

// ─── Blog Articles ────────────────────────────────────────────────────────────
// Each document = one language version. translationGroup links them together.

const blogArticles = [

  // ── Group 1: punta-cana-wedding-cost ─────────────────────────────────────

  {
    _id: 'blog-article-cost-en',
    _type: 'blogArticle',
    language: 'en',
    translationGroup: 'punta-cana-wedding-cost',
    slug: { _type: 'slug', current: 'how-much-does-a-punta-cana-wedding-cost' },
    title: 'How Much Does a Punta Cana Wedding Cost?',
    excerpt: 'Wondering what a destination wedding in Punta Cana really costs? We break down every line item so you can plan with confidence and zero surprises.',
    publishedAt: '2025-10-01',
    readingTime: 7,
    author: 'The Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('The Short Answer'),
      makeBlock('A Punta Cana wedding typically ranges from $8,000 to $35,000 USD, depending on guest count, menu selection, décor package, and extras like photography or entertainment. The good news: because nearly everything is bundled and priced upfront, there are very few surprises once you decide.'),
      makeHeading('Breaking Down the Budget'),
      makeBlock('Venue and coordination fees are usually fixed — they cover the event space, staffing, and a dedicated coordinator from your first email to the final toast. At Cabeza de Toro, this baseline is included in every package. On top of that, food and beverage is typically the largest variable: expect $80–$180 per guest depending on the menu tier and open-bar duration.'),
      makeHeading('Décor, Photography, and Extras'),
      makeBlock('Decoration packages start around $1,500 for a romantic essentials setup and climb toward $6,000 for a full floral arch, canopy, and custom centrepieces. Photography packages range from $1,200 for a 4-hour session to $3,500+ for full-day coverage with a second shooter and video highlights. Entertainment — DJ sets, live music, or fire dancers — adds $800–$2,500.'),
      makeHeading('How to Control Your Budget'),
      makeBlock('The easiest lever is guest count. Every additional guest adds food, drinks, seating, and transportation costs. Start with your non-negotiable guest list, price that out, then add upgrades one by one until the total feels right. Our wedding calculator lets you do exactly this in under 10 minutes.'),
    ],
  },

  {
    _id: 'blog-article-cost-es',
    _type: 'blogArticle',
    language: 'es',
    translationGroup: 'punta-cana-wedding-cost',
    slug: { _type: 'slug', current: 'cuanto-cuesta-una-boda-en-punta-cana' },
    title: '¿Cuánto Cuesta una Boda en Punta Cana?',
    excerpt: '¿Te preguntas cuánto cuesta realmente una boda de destino en Punta Cana? Desglosamos cada concepto para que puedas planificar con confianza y sin sorpresas.',
    publishedAt: '2025-10-01',
    readingTime: 7,
    author: 'El Equipo de Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('La Respuesta Rápida'),
      makeBlock('Una boda en Punta Cana generalmente oscila entre $8,000 y $35,000 USD, dependiendo del número de invitados, la selección del menú, el paquete de decoración y extras como fotografía o entretenimiento. La buena noticia: como casi todo está agrupado y con precio definido por adelantado, hay muy pocas sorpresas una vez que decides.'),
      makeHeading('Desglose del Presupuesto'),
      makeBlock('Las tarifas de lugar y coordinación suelen ser fijas: cubren el espacio del evento, el personal y un coordinador dedicado desde tu primer correo hasta el último brindis. En Cabeza de Toro, esta base está incluida en todos los paquetes. Además, los alimentos y bebidas son normalmente el mayor variable: espera entre $80 y $180 por invitado según el nivel del menú y la duración del bar abierto.'),
      makeHeading('Decoración, Fotografía y Extras'),
      makeBlock('Los paquetes de decoración comienzan alrededor de $1,500 para una configuración esencial romántica y alcanzan los $6,000 para un arco floral completo, dosel y centros de mesa personalizados. Los paquetes de fotografía van desde $1,200 por una sesión de 4 horas hasta $3,500+ para cobertura de día completo con segundo fotógrafo y video. El entretenimiento — DJ, música en vivo o bailarines de fuego — agrega entre $800 y $2,500.'),
      makeHeading('Cómo Controlar tu Presupuesto'),
      makeBlock('El factor más fácil de controlar es el número de invitados. Cada invitado adicional suma costos de comida, bebidas, asientos y transporte. Comienza con tu lista de invitados imprescindibles, calcula ese costo, luego agrega mejoras una por una hasta que el total te parezca correcto. Nuestra calculadora de bodas te permite hacer exactamente esto en menos de 10 minutos.'),
    ],
  },

  {
    _id: 'blog-article-cost-fr',
    _type: 'blogArticle',
    language: 'fr',
    translationGroup: 'punta-cana-wedding-cost',
    slug: { _type: 'slug', current: 'combien-coute-un-mariage-a-punta-cana' },
    title: 'Combien Coûte un Mariage à Punta Cana ?',
    excerpt: 'Vous vous demandez combien coûte vraiment un mariage de destination à Punta Cana ? Nous détaillons chaque poste de dépense pour que vous puissiez planifier sereinement.',
    publishedAt: '2025-10-01',
    readingTime: 7,
    author: "L'équipe Punta Cana",
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('La réponse courte'),
      makeBlock("Un mariage à Punta Cana coûte généralement entre 8 000 et 35 000 USD, selon le nombre d'invités, le menu choisi, le package décoration et les extras comme la photographie ou l'animation. La bonne nouvelle : comme presque tout est inclus dans un forfait avec des prix fixes à l'avance, les mauvaises surprises sont rares."),
      makeHeading('Décomposition du budget'),
      makeBlock("Les frais de lieu et de coordination sont généralement fixes — ils couvrent l'espace de réception, le personnel et un coordinateur dédié de votre premier email au dernier toast. À Cabeza de Toro, cette base est incluse dans chaque formule. La restauration et les boissons représentent ensuite la part variable la plus importante : comptez entre 80 et 180 USD par invité selon le niveau du menu et la durée du bar ouvert."),
      makeHeading('Décoration, photographie et extras'),
      makeBlock("Les packages décoration débutent à environ 1 500 USD pour une ambiance romantique essentielle et peuvent atteindre 6 000 USD pour une arche florale complète, un baldaquin et des centres de table personnalisés. Les forfaits photo vont de 1 200 USD pour une séance de 4 heures à plus de 3 500 USD pour une couverture complète de la journée avec un deuxième photographe et un film souvenir. L'animation — DJ, musique live ou danseurs de feu — ajoute entre 800 et 2 500 USD."),
      makeHeading('Comment maîtriser votre budget'),
      makeBlock("Le levier le plus efficace est le nombre d'invités. Chaque invité supplémentaire entraîne des coûts en nourriture, boissons, places assises et transport. Commencez par votre liste d'invités incontournables, calculez ce coût, puis ajoutez des améliorations une par une jusqu'à ce que le total vous convienne. Notre calculateur de mariage vous permet de faire exactement cela en moins de 10 minutes."),
    ],
  },

  {
    _id: 'blog-article-cost-de',
    _type: 'blogArticle',
    language: 'de',
    translationGroup: 'punta-cana-wedding-cost',
    slug: { _type: 'slug', current: 'was-kostet-eine-hochzeit-in-punta-cana' },
    title: 'Was Kostet eine Hochzeit in Punta Cana?',
    excerpt: 'Was kostet eine Destinationshochzeit in Punta Cana wirklich? Wir schlüsseln jeden Posten auf, damit Sie sicher und ohne böse Überraschungen planen können.',
    publishedAt: '2025-10-01',
    readingTime: 7,
    author: 'Das Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('Die kurze Antwort'),
      makeBlock('Eine Hochzeit in Punta Cana kostet typischerweise zwischen 8.000 und 35.000 USD, abhängig von der Gästezahl, der Menüauswahl, dem Dekorationspaket und Extras wie Fotografie oder Unterhaltung. Die gute Nachricht: Da fast alles gebündelt und vorab bepreist ist, gibt es kaum unerwartete Kosten.'),
      makeHeading('Budget-Aufschlüsselung'),
      makeBlock('Veranstaltungsort und Koordinationsgebühren sind in der Regel fest — sie decken den Eventbereich, Personal und einen dedizierten Koordinator von Ihrer ersten E-Mail bis zum letzten Anstoß ab. In Cabeza de Toro ist diese Grundlage in jedem Paket enthalten. Speisen und Getränke sind anschließend die größte variable Kostenposition: Rechnen Sie mit 80–180 USD pro Gast, je nach Menüniveau und Dauer der offenen Bar.'),
      makeHeading('Dekoration, Fotografie und Extras'),
      makeBlock('Dekorationspakete beginnen bei etwa 1.500 USD für ein romantisches Basis-Setup und reichen bis zu 6.000 USD für einen vollständigen Blumenbogen, Baldachin und individuelle Tischdekorationen. Fotografie-Pakete kosten 1.200–3.500+ USD. Entertainment — DJ, Live-Musik oder Feuertänzer — schlägt mit 800–2.500 USD zu Buche.'),
      makeHeading('Wie Sie Ihr Budget im Griff behalten'),
      makeBlock('Der einfachste Stellhebel ist die Gästezahl. Jeder zusätzliche Gast erhöht die Kosten für Essen, Getränke, Bestuhlung und Transport. Beginnen Sie mit Ihrer unverzichtbaren Gästeliste, kalkulieren Sie diese Kosten und fügen Sie dann schrittweise Upgrades hinzu. Unser Hochzeitsrechner ermöglicht genau das in unter 10 Minuten.'),
    ],
  },

  {
    _id: 'blog-article-cost-pt',
    _type: 'blogArticle',
    language: 'pt',
    translationGroup: 'punta-cana-wedding-cost',
    slug: { _type: 'slug', current: 'quanto-custa-um-casamento-em-punta-cana' },
    title: 'Quanto Custa um Casamento em Punta Cana?',
    excerpt: 'Quer saber quanto custa de verdade um casamento de destino em Punta Cana? Detalhamos cada item para que você possa planejar com confiança e sem surpresas.',
    publishedAt: '2025-10-01',
    readingTime: 7,
    author: 'A Equipe Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('A Resposta Rápida'),
      makeBlock('Um casamento em Punta Cana geralmente varia entre $8.000 e $35.000 USD, dependendo do número de convidados, seleção do menu, pacote de decoração e extras como fotografia ou entretenimento. A boa notícia: como quase tudo é agrupado e precificado antecipadamente, há muito poucas surpresas depois que você decide.'),
      makeHeading('Detalhamento do Orçamento'),
      makeBlock('As taxas de local e coordenação geralmente são fixas — cobrem o espaço do evento, equipe e um coordenador dedicado do seu primeiro e-mail até o último brinde. Em Cabeza de Toro, essa base está incluída em todos os pacotes. Além disso, alimentos e bebidas são normalmente a maior variável: espere $80–$180 por convidado, dependendo do nível do menu e da duração do open bar.'),
      makeHeading('Decoração, Fotografia e Extras'),
      makeBlock('Pacotes de decoração começam em torno de $1.500 para uma configuração essencial romântica e chegam a $6.000 para um arco floral completo, dossel e centros de mesa personalizados. Pacotes de fotografia variam de $1.200 para uma sessão de 4 horas até $3.500+ para cobertura de dia inteiro. Entretenimento — DJ, música ao vivo ou dançarinos de fogo — adiciona $800–$2.500.'),
      makeHeading('Como Controlar Seu Orçamento'),
      makeBlock('O controle mais fácil é o número de convidados. Cada convidado adicional aumenta os custos com comida, bebidas, assentos e transporte. Comece com sua lista de convidados indispensáveis, calcule esse custo e depois adicione melhorias uma a uma. Nossa calculadora de casamentos permite fazer exatamente isso em menos de 10 minutos.'),
    ],
  },

  // ── Group 2: perfect-venue-punta-cana ─────────────────────────────────────

  {
    _id: 'blog-article-venue-en',
    _type: 'blogArticle',
    language: 'en',
    translationGroup: 'perfect-venue-punta-cana',
    slug: { _type: 'slug', current: 'the-perfect-beachfront-venue-punta-cana' },
    title: 'The Perfect Beachfront Venue for Your Punta Cana Wedding',
    excerpt: 'Cabeza de Toro Beach offers everything a couple could want: soft white sand, turquoise water, and a dedicated team that has hosted over 500 weddings. Here is why it works so well.',
    publishedAt: '2025-10-15',
    readingTime: 5,
    author: 'The Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Why the Venue Matters More Than Anything'),
      makeBlock('Your venue sets the tone for every photograph, every memory, and every guest\'s first impression. Cabeza de Toro Beach sits on the calmer southeast shore of Punta Cana — protected from Atlantic swells, which means glassy water and steady breezes rather than crashing waves and wind-blown hair.'),
      makeHeading('What the Space Looks Like'),
      makeBlock('The ceremony area faces directly west, giving couples a natural golden-hour backdrop without any additional lighting setup. The reception terrace transitions seamlessly from the sand to a covered pavilion — useful when an afternoon shower passes through, which is rare but always possible in the Caribbean. Capacity is up to 200 guests comfortably.'),
      makeHeading('A Dedicated Team On-Site'),
      makeBlock('Unlike hotels that rotate staff between dozens of events, our coordination team works exclusively on weddings at this venue. That means the person who answers your first email will be standing on the beach on your wedding day. It is a small detail with an enormous impact on how smooth everything runs.'),
      makeHeading('How to See It Before You Book'),
      makeBlock('We offer virtual venue tours via video call and, for couples visiting the Dominican Republic in advance, in-person walkthroughs with a coordinator. Most couples who visit leave with their date locked in.'),
    ],
  },

  {
    _id: 'blog-article-venue-es',
    _type: 'blogArticle',
    language: 'es',
    translationGroup: 'perfect-venue-punta-cana',
    slug: { _type: 'slug', current: 'el-venue-perfecto-en-punta-cana' },
    title: 'El Lugar Perfecto Frente al Mar para tu Boda en Punta Cana',
    excerpt: 'La Playa Cabeza de Toro ofrece todo lo que una pareja podría desear: arena blanca, agua turquesa y un equipo dedicado que ha organizado más de 500 bodas.',
    publishedAt: '2025-10-15',
    readingTime: 5,
    author: 'El Equipo de Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Por Qué el Lugar Importa Más que Nada'),
      makeBlock('Tu lugar de celebración establece el tono de cada fotografía, cada recuerdo y la primera impresión de cada invitado. La Playa Cabeza de Toro se encuentra en la costa sureste más tranquila de Punta Cana — protegida de las olas del Atlántico, lo que significa agua tranquila y brisas suaves en lugar de olas y viento.'),
      makeHeading('Cómo es el Espacio'),
      makeBlock('El área de ceremonia mira directamente hacia el oeste, brindando a las parejas un fondo natural de hora dorada sin necesidad de iluminación adicional. La terraza de recepción pasa sin problemas de la arena a un pabellón cubierto — útil cuando pasa una llovizna de tarde, que es rara pero siempre posible en el Caribe. La capacidad es de hasta 200 invitados cómodamente.'),
      makeHeading('Un Equipo Dedicado en el Lugar'),
      makeBlock('A diferencia de los hoteles que rotan personal entre decenas de eventos, nuestro equipo de coordinación trabaja exclusivamente en bodas en este lugar. Eso significa que la persona que responde tu primer correo estará en la playa el día de tu boda. Es un pequeño detalle con un impacto enorme en qué tan bien corre todo.'),
      makeHeading('Cómo Verlo Antes de Reservar'),
      makeBlock('Ofrecemos recorridos virtuales por videollamada y, para parejas que visitan la República Dominicana con anticipación, recorridos en persona con un coordinador. La mayoría de las parejas que visitan se van con su fecha confirmada.'),
    ],
  },

  {
    _id: 'blog-article-venue-it',
    _type: 'blogArticle',
    language: 'it',
    translationGroup: 'perfect-venue-punta-cana',
    slug: { _type: 'slug', current: 'la-location-perfetta-per-il-matrimonio-a-punta-cana' },
    title: 'La Location Perfetta per il Tuo Matrimonio a Punta Cana',
    excerpt: 'La Spiaggia di Cabeza de Toro offre tutto ciò che una coppia potrebbe desiderare: sabbia bianca, acqua turchese e un team dedicato che ha celebrato oltre 500 matrimoni.',
    publishedAt: '2025-10-15',
    readingTime: 5,
    author: 'Il Team di Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Perché la Location Conta Più di Tutto'),
      makeBlock('La tua location definisce il tono di ogni fotografia, ogni ricordo e la prima impressione di ogni ospite. La Spiaggia di Cabeza de Toro si trova sulla costa sud-orientale più tranquilla di Punta Cana — protetta dalle onde dell\'Atlantico, il che significa acqua cristallina e brezze leggere anziché onde e capelli al vento.'),
      makeHeading('Come Si Presenta lo Spazio'),
      makeBlock('L\'area cerimonia è orientata direttamente a ovest, offrendo alle coppie uno sfondo naturale all\'ora dorata senza necessità di illuminazione aggiuntiva. La terrazza per il ricevimento si collega senza soluzione di continuità dalla sabbia a un padiglione coperto. La capacità è fino a 200 ospiti comodamente.'),
      makeHeading('Un Team Dedicato in Loco'),
      makeBlock('A differenza degli hotel che ruotano il personale tra decine di eventi, il nostro team di coordinamento lavora esclusivamente per matrimoni in questa location. Ciò significa che la persona che risponde alla tua prima email sarà sulla spiaggia il giorno del tuo matrimonio.'),
      makeHeading('Come Vederla Prima di Prenotare'),
      makeBlock('Offriamo tour virtuali via videochiamata e, per le coppie che visitano la Repubblica Dominicana in anticipo, sopralluoghi in persona con un coordinatore. La maggior parte delle coppie che la visitano repart con la data confermata.'),
    ],
  },

  {
    _id: 'blog-article-venue-ru',
    _type: 'blogArticle',
    language: 'ru',
    translationGroup: 'perfect-venue-punta-cana',
    slug: { _type: 'slug', current: 'idealnoe-mesto-dlya-svadby-v-punta-kane' },
    title: 'Идеальное Место для Свадьбы в Пунта-Кане',
    excerpt: 'Пляж Кабеса-де-Торо предлагает всё, что только может пожелать пара: белый песок, бирюзовая вода и преданная команда, организовавшая более 500 свадеб.',
    publishedAt: '2025-10-15',
    readingTime: 5,
    author: 'Команда Пунта-Каны',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Почему Место Важнее Всего'),
      makeBlock('Место проведения задаёт тон каждой фотографии, каждому воспоминанию и первому впечатлению каждого гостя. Пляж Кабеса-де-Торо расположен на спокойном юго-восточном побережье Пунта-Каны — защищённом от волн Атлантики. Это означает зеркальную воду и лёгкий бриз вместо прибоя и ветра.'),
      makeHeading('Как Выглядит Пространство'),
      makeBlock('Зона церемонии выходит прямо на запад, создавая естественный фон золотого часа без дополнительного освещения. Терраса для приёма плавно переходит от песка к крытому павильону. Вместимость — до 200 гостей.'),
      makeHeading('Преданная Команда На Месте'),
      makeBlock('В отличие от отелей, где персонал перемещается между десятками мероприятий, наша команда координаторов работает исключительно со свадьбами на этой площадке. Это означает, что человек, который ответит на ваше первое письмо, будет стоять на пляже в день вашей свадьбы.'),
      makeHeading('Как Увидеть Всё до Бронирования'),
      makeBlock('Мы предлагаем виртуальные туры по видеозвонку, а для пар, приезжающих в Доминиканскую Республику заранее — личные экскурсии с координатором. Большинство пар, которые посещают это место, уезжают с подтверждённой датой.'),
    ],
  },

  // ── Group 3: destination-wedding-tips ─────────────────────────────────────

  {
    _id: 'blog-article-tips-en',
    _type: 'blogArticle',
    language: 'en',
    translationGroup: 'destination-wedding-tips',
    slug: { _type: 'slug', current: '8-tips-for-planning-a-destination-wedding' },
    title: '8 Essential Tips for Planning a Destination Wedding',
    excerpt: 'Planning a wedding abroad is exciting and a little overwhelming. These eight tips from couples who have done it — and the teams that helped them — will save you time, money, and stress.',
    publishedAt: '2025-11-01',
    readingTime: 6,
    author: 'The Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('1. Book Your Date at Least 12 Months Out'),
      makeBlock('Peak season in Punta Cana runs November through April. Saturdays in those months fill up a year or more in advance. If your dream date falls in that window, start planning early. Shoulder-season dates (May, June, October) offer more flexibility and often lower pricing.'),
      makeHeading('2. Send Save-the-Dates Early'),
      makeBlock('Your guests need time to book flights and accommodations. Send save-the-dates 9–12 months in advance for a destination wedding. Include the hotel block information so everyone stays close together — this dramatically improves the group dynamic and keeps logistics simple.'),
      makeHeading('3. Visit the Venue Before You Commit'),
      makeBlock('Photos and virtual tours are helpful, but standing on the beach at golden hour is different. If at all possible, visit Punta Cana before signing anything. Many couples build a short engagement trip around a venue walkthrough and leave with complete confidence in their decision.'),
      makeHeading('4. Understand What Is Included'),
      makeBlock('Read every line of your package. Know exactly what is included in the venue fee, what is itemised separately, and what is completely unavailable (so you can plan accordingly). Transparent, itemised pricing eliminates the stress of hidden costs.'),
      makeHeading('5. Work With a Local Coordinator'),
      makeBlock('A coordinator based in Punta Cana knows the vendors, the permits, the weather patterns, and the logistics in a way no remote planner can replicate. They have relationships with photographers, florists, and entertainment acts — which often translates to better availability and pricing for you.'),
      makeHeading('6. Build a Realistic Guest Count'),
      makeBlock('Invite the people who will actually travel. Destination weddings naturally filter the guest list down to those who genuinely want to be there — which creates an intimate, connected atmosphere. A guest count of 30–80 is common and ideal for the Punta Cana setting.'),
      makeHeading('7. Plan Activities for the Full Weekend'),
      makeBlock('Since guests are flying in, they deserve more than just the ceremony and reception. A welcome dinner the night before, a beach excursion the morning after, or a Saona Island day trip turns a wedding into a celebration that lasts the whole weekend.'),
      makeHeading('8. Get Everything in Writing'),
      makeBlock('Deposits, payment schedules, cancellation policies, what happens in case of weather — confirm all of it in writing before you pay anything. Reputable venues will have clear contracts; hesitate if something is only communicated verbally.'),
    ],
  },

  {
    _id: 'blog-article-tips-fr',
    _type: 'blogArticle',
    language: 'fr',
    translationGroup: 'destination-wedding-tips',
    slug: { _type: 'slug', current: '8-conseils-pour-planifier-un-mariage-a-letranger' },
    title: '8 Conseils Essentiels pour Planifier un Mariage à l\'Étranger',
    excerpt: 'Planifier un mariage à l\'étranger est excitant et un peu intimidant. Ces huit conseils de couples qui l\'ont vécu — et des équipes qui les ont aidés — vous feront gagner du temps, de l\'argent et de la sérénité.',
    publishedAt: '2025-11-01',
    readingTime: 6,
    author: "L'équipe Punta Cana",
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('1. Réservez votre date au moins 12 mois à l\'avance'),
      makeBlock('La haute saison à Punta Cana s\'étend de novembre à avril. Les samedis de cette période se réservent un an ou plus à l\'avance. Si votre date de rêve tombe dans cette fenêtre, commencez à planifier tôt. Les dates de basse saison (mai, juin, octobre) offrent plus de flexibilité et souvent des tarifs plus avantageux.'),
      makeHeading('2. Envoyez les faire-part tôt'),
      makeBlock('Vos invités ont besoin de temps pour réserver billets d\'avion et hébergements. Envoyez les save-the-dates 9 à 12 mois à l\'avance pour un mariage à l\'étranger. Incluez les informations sur le bloc hôtelier pour que tout le monde reste proche — cela améliore considérablement l\'ambiance de groupe.'),
      makeHeading('3. Visitez le lieu avant de vous engager'),
      makeBlock('Les photos et visites virtuelles sont utiles, mais se tenir sur la plage à l\'heure dorée est une tout autre expérience. Si possible, visitez Punta Cana avant de signer quoi que ce soit. Beaucoup de couples organisent un court voyage de fiançailles autour d\'une visite du lieu.'),
      makeHeading('4. Comprenez ce qui est inclus'),
      makeBlock('Lisez chaque ligne de votre forfait. Sachez exactement ce qui est inclus dans les frais de lieu, ce qui est facturé séparément et ce qui n\'est pas disponible. Une tarification transparente et détaillée élimine le stress des coûts cachés.'),
      makeHeading('5. Travaillez avec un coordinateur local'),
      makeBlock('Un coordinateur basé à Punta Cana connaît les prestataires, les permis, les conditions météo et la logistique d\'une manière qu\'aucun planificateur à distance ne peut reproduire. Leurs relations avec photographes, fleuristes et artistes se traduisent souvent par une meilleure disponibilité et de meilleurs tarifs pour vous.'),
      makeHeading('6. Établissez un nombre d\'invités réaliste'),
      makeBlock('Invitez les personnes qui voyageront vraiment. Les mariages de destination filtrent naturellement la liste d\'invités vers ceux qui souhaitent vraiment être présents, créant une atmosphère intime. Un nombre de 30 à 80 invités est courant et idéal pour le cadre de Punta Cana.'),
      makeHeading('7. Prévoyez des activités pour tout le week-end'),
      makeBlock('Puisque vos invités prennent l\'avion, ils méritent plus que la cérémonie et la réception. Un dîner de bienvenue la veille, une excursion à la plage le lendemain matin ou une excursion à l\'île Saona transforme un mariage en une célébration qui dure tout le week-end.'),
      makeHeading('8. Obtenez tout par écrit'),
      makeBlock('Acomptes, calendrier de paiement, politiques d\'annulation, que se passe-t-il en cas d\'intempéries — confirmez tout par écrit avant de payer quoi que ce soit. Les lieux réputés disposent de contrats clairs.'),
    ],
  },

  {
    _id: 'blog-article-tips-de',
    _type: 'blogArticle',
    language: 'de',
    translationGroup: 'destination-wedding-tips',
    slug: { _type: 'slug', current: '8-tipps-fuer-die-planung-einer-auslandshochzeit' },
    title: '8 Unverzichtbare Tipps für die Planung einer Auslandshochzeit',
    excerpt: 'Eine Hochzeit im Ausland zu planen ist aufregend und ein wenig überwältigend. Diese acht Tipps von Paaren, die es getan haben, sparen Ihnen Zeit, Geld und Nerven.',
    publishedAt: '2025-11-01',
    readingTime: 6,
    author: 'Das Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('1. Datum mindestens 12 Monate im Voraus buchen'),
      makeBlock('Die Hochsaison in Punta Cana läuft von November bis April. Samstage in dieser Zeit sind ein Jahr oder mehr im Voraus ausgebucht. Wenn Ihr Traumdatum in dieses Fenster fällt, beginnen Sie früh zu planen. Nebensaisondaten (Mai, Juni, Oktober) bieten mehr Flexibilität und oft günstigere Preise.'),
      makeHeading('2. Save-the-Dates frühzeitig verschicken'),
      makeBlock('Ihre Gäste brauchen Zeit, um Flüge und Unterkünfte zu buchen. Verschicken Sie Save-the-Dates 9–12 Monate im Voraus für eine Auslandshochzeit. Fügen Sie die Hotelblock-Informationen hinzu, damit alle nah beieinander bleiben.'),
      makeHeading('3. Besichtigen Sie den Ort vor der Buchung'),
      makeBlock('Fotos und virtuelle Touren sind hilfreich, aber bei Sonnenuntergang am Strand zu stehen ist eine andere Erfahrung. Besuchen Sie wenn möglich Punta Cana, bevor Sie etwas unterschreiben. Viele Paare bauen einen kurzen Verlobungsurlaub um eine Besichtigung des Veranstaltungsorts.'),
      makeHeading('4. Verstehen Sie, was inbegriffen ist'),
      makeBlock('Lesen Sie jede Zeile Ihres Pakets. Wissen Sie genau, was in den Veranstaltungsortgebühren enthalten ist, was einzeln berechnet wird und was nicht verfügbar ist. Transparente Preisgestaltung eliminiert den Stress versteckter Kosten.'),
      makeHeading('5. Mit einem lokalen Koordinator arbeiten'),
      makeBlock('Ein in Punta Cana ansässiger Koordinator kennt die Anbieter, Genehmigungen, Wettermuster und die Logistik auf eine Weise, die kein externer Planer replizieren kann. Ihre Beziehungen zu Fotografen, Floristen und Künstlern führen oft zu besserer Verfügbarkeit und besseren Preisen für Sie.'),
      makeHeading('6. Eine realistische Gästezahl planen'),
      makeBlock('Laden Sie Menschen ein, die tatsächlich reisen werden. Auslandshochzeiten filtern die Gästeliste natürlich auf diejenigen, die wirklich dabei sein möchten, was eine intime Atmosphäre schafft. Eine Gästezahl von 30–80 ist üblich und ideal für Punta Cana.'),
      makeHeading('7. Aktivitäten für das gesamte Wochenende planen'),
      makeBlock('Da Gäste anreisen, verdienen sie mehr als nur Zeremonie und Empfang. Ein Willkommensdinner am Vorabend, ein Strandausflug am nächsten Morgen oder ein Tagesausflug zur Isla Saona verwandelt eine Hochzeit in eine Feier, die das gesamte Wochenende dauert.'),
      makeHeading('8. Alles schriftlich festhalten'),
      makeBlock('Anzahlungen, Zahlungspläne, Stornierungsbedingungen, was bei Schlechtwetter passiert — bestätigen Sie alles schriftlich, bevor Sie etwas bezahlen. Seriöse Veranstaltungsorte haben klare Verträge.'),
    ],
  },

  {
    _id: 'blog-article-tips-zh',
    _type: 'blogArticle',
    language: 'zh',
    translationGroup: 'destination-wedding-tips',
    slug: { _type: 'slug', current: '8-ge-gui-hua-mu-di-hun-li-de-jian-yi' },
    title: '规划目的地婚礼的8个必备建议',
    excerpt: '在海外举办婚礼既令人兴奋，又略显复杂。这8条建议来自亲身经历的新人和专业团队，帮您节省时间、金钱与精力。',
    publishedAt: '2025-11-01',
    readingTime: 6,
    author: '蓬塔卡纳团队',
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('1. 至少提前12个月预订日期'),
      makeBlock('蓬塔卡纳的旺季为11月至4月。这段时间的周六往往提前一年或更早就被预订一空。如果您的理想日期在此期间，请尽早开始规划。淡季日期（5月、6月、10月）通常更灵活，价格也更优惠。'),
      makeHeading('2. 提前发送预告通知'),
      makeBlock('宾客需要时间预订机票和住宿。目的地婚礼应提前9至12个月发送预告通知，并附上酒店预留信息，让所有人住在一起，这将大大提升团队氛围和物流便利性。'),
      makeHeading('3. 签约前亲自参观场地'),
      makeBlock('照片和虚拟游览固然有帮助，但在黄金时段亲身站在沙滩上是完全不同的体验。如果可能，在签署任何合同前，先亲赴蓬塔卡纳参观。许多情侣将订婚旅行与场地考察结合在一起，回去后便充满信心地做出了决定。'),
      makeHeading('4. 了解套餐包含的内容'),
      makeBlock('仔细阅读套餐的每一条款。明确场地费用包含哪些服务，哪些单独计费，哪些不可用。透明的逐项定价能消除隐藏费用带来的压力。'),
      makeHeading('5. 与当地协调人合作'),
      makeBlock('驻蓬塔卡纳的协调人了解当地供应商、许可证、天气规律和物流，这是任何远程策划者都无法复制的。他们与摄影师、花艺师和演艺团队的合作关系，往往能为您争取到更好的档期和价格。'),
      makeHeading('6. 制定合理的宾客名单'),
      makeBlock('只邀请真正会来的人。目的地婚礼自然会筛选出真心希望参与的宾客，营造出亲密的氛围。30至80人的规模在蓬塔卡纳最为常见，也最为理想。'),
      makeHeading('7. 为整个周末规划活动'),
      makeBlock('既然宾客专程前来，他们值得享受不止婚礼仪式和宴会的体验。前夜欢迎晚宴、次日清晨的海滩游览或萨奥纳岛一日游，能将婚礼升华为贯穿整个周末的盛大庆典。'),
      makeHeading('8. 一切以书面为准'),
      makeBlock('订金、付款计划、取消政策以及恶劣天气应对方案——在支付任何款项前，务必以书面形式确认所有内容。有信誉的场地都会提供清晰的合同。'),
    ],
  },

  {
    _id: 'blog-article-tips-ar',
    _type: 'blogArticle',
    language: 'ar',
    translationGroup: 'destination-wedding-tips',
    slug: { _type: 'slug', current: '8-najah-litakhtat-hiflatik' },
    title: '٨ نصائح أساسية لتخطيط حفل زفافك في الخارج',
    excerpt: 'التخطيط لحفل زفاف في الخارج أمر مثير للاهتمام وقد يبدو مربكاً أحياناً. هذه النصائح الثماني من أزواج مروا بهذه التجربة ستوفر عليك الوقت والمال والتوتر.',
    publishedAt: '2025-11-01',
    readingTime: 6,
    author: 'فريق بونتا كانا',
    category: { _type: 'reference', _ref: 'blog-category-planning' },
    body: [
      makeHeading('١. احجز موعدك قبل ١٢ شهراً على الأقل'),
      makeBlock('يمتد موسم الذروة في بونتا كانا من نوفمبر إلى أبريل. تُحجز أيام السبت في هذه الفترة قبل عام أو أكثر. إذا كان تاريخ حلمك يقع في هذه الفترة، ابدأ التخطيط مبكراً. تتيح التواريخ خارج الموسم (مايو، يونيو، أكتوبر) مرونة أكبر وأسعاراً أفضل في الغالب.'),
      makeHeading('٢. أرسل الدعوات الأولية مبكراً'),
      makeBlock('يحتاج ضيوفك إلى وقت لحجز الرحلات والإقامة. أرسل الدعوات الأولية قبل ٩ إلى ١٢ شهراً لحفلات الزفاف في الوجهات السياحية. أرفق معلومات الفندق المخصص لكي يبقى الجميع قريبين من بعضهم، مما يُحسّن الأجواء الاجتماعية ويبسّط اللوجستيات.'),
      makeHeading('٣. زر المكان قبل التعاقد'),
      makeBlock('الصور والجولات الافتراضية مفيدة، لكن الوقوف على الشاطئ وقت الغروب تجربة مختلفة تماماً. إن أمكن، زر بونتا كانا قبل التوقيع على أي شيء. كثير من الأزواج يجمعون رحلة خطوبتهم مع جولة في المكان ويعودون وهم واثقون تماماً من قرارهم.'),
      makeHeading('٤. افهم ما هو مدرج في الباقة'),
      makeBlock('اقرأ كل بند في باقتك. تأكد مما يشمله رسم المكان بالضبط، وما يُحتسب بشكل منفصل، وما هو غير متاح. التسعير الشفاف التفصيلي يُزيل ضغط التكاليف المخفية.'),
      makeHeading('٥. تعاون مع منسق محلي'),
      makeBlock('المنسق المقيم في بونتا كانا يعرف الموردين والتصاريح وأنماط الطقس واللوجستيات بطريقة لا يستطيع أي منسق عن بُعد محاكاتها. علاقاته مع المصورين وخبراء الزهور وفرق الترفيه تُترجم في الغالب إلى توافر أفضل وأسعار أنسب لك.'),
      makeHeading('٦. حدد عدداً واقعياً من الضيوف'),
      makeBlock('ادعُ من سيحضر فعلاً. تُرشّح حفلات الزفاف في الوجهات السياحية بطبيعتها قائمة الضيوف لتشمل من يرغب حقاً في الحضور، مما يُضفي أجواءً حميمة ومترابطة. عدد الضيوف من ٣٠ إلى ٨٠ شخصاً هو الأكثر شيوعاً والأنسب لبيئة بونتا كانا.'),
      makeHeading('٧. خطط لأنشطة طوال عطلة نهاية الأسبوع'),
      makeBlock('بما أن ضيوفك سيُسافرون خصيصاً، فهم يستحقون أكثر من مجرد الحفل وحفلة الاستقبال. عشاء الترحيب ليلة ما قبل الحفل، ورحلة الشاطئ في صباح اليوم التالي، أو جولة يوم كامل إلى جزيرة سافونا، تحوّل الزفاف إلى احتفال يمتد طوال عطلة نهاية الأسبوع.'),
      makeHeading('٨. احرص على توثيق كل شيء كتابياً'),
      makeBlock('العربون وجدول الدفعات وسياسة الإلغاء وما يحدث في حالة سوء الأحوال الجوية — تأكد من توثيق كل ذلك كتابياً قبل دفع أي مبلغ. الأماكن ذات السمعة الحسنة لديها عقود واضحة.'),
    ],
  },

  // ── Group 4: best-time-to-marry-punta-cana ────────────────────────────────

  {
    _id: 'blog-article-time-en',
    _type: 'blogArticle',
    language: 'en',
    translationGroup: 'best-time-to-marry-punta-cana',
    slug: { _type: 'slug', current: 'best-time-of-year-to-get-married-punta-cana' },
    title: 'The Best Time of Year to Get Married in Punta Cana',
    excerpt: 'Punta Cana is beautiful year-round, but some months are better than others for an outdoor wedding. Here is how to pick your date with confidence.',
    publishedAt: '2025-11-15',
    readingTime: 5,
    author: 'The Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('High Season: November to April'),
      makeBlock('This is the dry season in the Dominican Republic — the period of lowest rainfall, lowest humidity, and the most comfortable temperatures (24–28°C / 75–82°F). Sunsets are spectacular, evenings are breezy, and the risk of rain during your ceremony is very low. The tradeoff: higher demand means venues and vendors book up quickly and peak pricing applies.'),
      makeHeading('Shoulder Season: May and October'),
      makeBlock('May and October sit just outside the rainy season. Temperatures are slightly warmer and afternoon showers are more common, but mornings are typically beautiful and clear. Pricing is noticeably lower and venues have more availability. Many couples who get married in May or October love the lush, vibrant greenery that the brief rains bring.'),
      makeHeading('Rainy Season: June to September'),
      makeBlock('The Caribbean rainy season brings heavier and more frequent showers, though they are usually short — an hour of rain followed by sunshine. Hurricane season officially runs June through November, though Punta Cana sits south of the typical hurricane track and sees significantly fewer direct impacts than other Caribbean destinations. Venues accommodate this with covered pavilion options.'),
      makeHeading('Our Recommendation'),
      makeBlock('For most couples, January through March offers the best combination of weather, availability, and experience. For those flexible on dates, October and early November offer excellent value without significantly higher weather risk. Avoid July and August if possible — they are the hottest and rainiest months.'),
    ],
  },

  {
    _id: 'blog-article-time-pt',
    _type: 'blogArticle',
    language: 'pt',
    translationGroup: 'best-time-to-marry-punta-cana',
    slug: { _type: 'slug', current: 'melhor-epoca-para-casar-em-punta-cana' },
    title: 'A Melhor Época do Ano para Casar em Punta Cana',
    excerpt: 'Punta Cana é linda durante todo o ano, mas alguns meses são melhores que outros para uma cerimônia ao ar livre. Veja como escolher sua data com confiança.',
    publishedAt: '2025-11-15',
    readingTime: 5,
    author: 'A Equipe Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Alta Temporada: Novembro a Abril'),
      makeBlock('Esta é a estação seca na República Dominicana — o período de menor precipitação, menor umidade e temperaturas mais agradáveis (24–28°C). Os pôr do sol são espetaculares, as noites têm brisa e o risco de chuva durante a cerimônia é muito baixo. A contrapartida: alta demanda significa que locais e fornecedores se esgotam rapidamente e os preços de pico se aplicam.'),
      makeHeading('Temporada de Transição: Maio e Outubro'),
      makeBlock('Maio e outubro ficam logo fora da estação chuvosa. As temperaturas são ligeiramente mais quentes e as chuvas da tarde são mais comuns, mas as manhãs geralmente são lindas e claras. Os preços são visivelmente mais baixos e os locais têm mais disponibilidade. Muitos casais que se casam nesses meses adoram a exuberante vegetação verde que as chuvas breves trazem.'),
      makeHeading('Estação Chuvosa: Junho a Setembro'),
      makeBlock('A estação chuvosa caribenha traz chuvas mais intensas e frequentes, embora geralmente curtas. A temporada de furacões dura oficialmente de junho a novembro, mas Punta Cana fica ao sul da rota típica dos furacões e sofre muito menos impacto direto do que outros destinos caribenhos.'),
      makeHeading('Nossa Recomendação'),
      makeBlock('Para a maioria dos casais, de janeiro a março oferece a melhor combinação de clima, disponibilidade e experiência. Para quem tem flexibilidade de datas, outubro e início de novembro oferecem excelente custo-benefício. Evite julho e agosto, se possível — são os meses mais quentes e chuvosos.'),
    ],
  },

  {
    _id: 'blog-article-time-it',
    _type: 'blogArticle',
    language: 'it',
    translationGroup: 'best-time-to-marry-punta-cana',
    slug: { _type: 'slug', current: 'il-periodo-migliore-per-sposarsi-a-punta-cana' },
    title: 'Il Periodo Migliore dell\'Anno per Sposarsi a Punta Cana',
    excerpt: 'Punta Cana è meravigliosa tutto l\'anno, ma alcuni mesi sono migliori di altri per un matrimonio all\'aperto. Ecco come scegliere la data con sicurezza.',
    publishedAt: '2025-11-15',
    readingTime: 5,
    author: 'Il Team di Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Alta stagione: da novembre ad aprile'),
      makeBlock('Questo è il periodo secco nella Repubblica Dominicana — il periodo con meno piogge, umidità più bassa e temperature più confortevoli (24–28°C). I tramonti sono spettacolari, le serate sono ventilate e il rischio di pioggia durante la cerimonia è molto basso. La contropartita: l\'alta domanda significa che le location si prenotano rapidamente e si applicano prezzi di picco.'),
      makeHeading('Stagione di transizione: maggio e ottobre'),
      makeBlock('Maggio e ottobre si trovano appena fuori dalla stagione delle piogge. Le temperature sono leggermente più calde e i temporali pomeridiani sono più comuni, ma le mattine sono tipicamente belle e serene. I prezzi sono notevolmente più bassi e le location hanno maggiore disponibilità.'),
      makeHeading('Stagione delle piogge: da giugno a settembre'),
      makeBlock('La stagione delle piogge caraibica porta acquazzoni più intensi e frequenti, anche se solitamente brevi. La stagione degli uragani va ufficialmente da giugno a novembre, ma Punta Cana si trova a sud della tipica rotta degli uragani e subisce molti meno impatti diretti rispetto ad altre destinazioni caraibiche.'),
      makeHeading('La nostra raccomandazione'),
      makeBlock('Per la maggior parte delle coppie, da gennaio a marzo offre la migliore combinazione di clima, disponibilità ed esperienza. Per chi ha flessibilità sulle date, ottobre e inizio novembre offrono un eccellente rapporto qualità-prezzo. Se possibile, evitate luglio e agosto — sono i mesi più caldi e piovosi.'),
    ],
  },

  {
    _id: 'blog-article-time-ru',
    _type: 'blogArticle',
    language: 'ru',
    translationGroup: 'best-time-to-marry-punta-cana',
    slug: { _type: 'slug', current: 'luchshee-vremya-dlya-svadby-v-punta-kane' },
    title: 'Лучшее Время Года для Свадьбы в Пунта-Кане',
    excerpt: 'Пунта-Кана прекрасна круглый год, но одни месяцы подходят для свадьбы на открытом воздухе лучше, чем другие. Рассказываем, как выбрать дату с уверенностью.',
    publishedAt: '2025-11-15',
    readingTime: 5,
    author: 'Команда Пунта-Каны',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Высокий сезон: с ноября по апрель'),
      makeBlock('Это сухой сезон в Доминиканской Республике — период с минимальным количеством осадков, низкой влажностью и комфортными температурами (24–28°C). Закаты здесь великолепны, вечера свежи, а риск дождя во время церемонии очень мал. Обратная сторона: высокий спрос означает, что площадки и поставщики быстро заняты, а цены — на пике.'),
      makeHeading('Межсезонье: май и октябрь'),
      makeBlock('Май и октябрь — период прямо перед дождливым сезоном и после него. Температуры чуть выше, послеполудневные ливни более вероятны, но утра обычно ясные и солнечные. Цены заметно ниже, и площадки доступнее. Многие пары, выбравшие эти месяцы, в восторге от пышной зелени, которую приносят короткие дожди.'),
      makeHeading('Дождливый сезон: с июня по сентябрь'),
      makeBlock('Карибский дождливый сезон приносит более сильные и частые ливни, хотя они обычно короткие. Сезон ураганов официально длится с июня по ноябрь, однако Пунта-Кана расположена к югу от типичного урагановского пути и значительно реже испытывает их прямое воздействие.'),
      makeHeading('Наша рекомендация'),
      makeBlock('Для большинства пар с января по март — лучшее сочетание погоды, доступности и впечатлений. Для тех, кто гибок в выборе дат, октябрь и начало ноября предлагают отличное соотношение цены и качества. По возможности избегайте июля и августа — это самые жаркие и дождливые месяцы.'),
    ],
  },

  {
    _id: 'blog-article-time-zh',
    _type: 'blogArticle',
    language: 'zh',
    translationGroup: 'best-time-to-marry-punta-cana',
    slug: { _type: 'slug', current: 'zai-punta-cana-jiehun-de-zui-jia-shijian' },
    title: '在蓬塔卡纳举办婚礼的最佳时间',
    excerpt: '蓬塔卡纳全年皆美，但对于户外婚礼而言，有些月份比其他月份更为理想。了解如何自信地选择您的日期。',
    publishedAt: '2025-11-15',
    readingTime: 5,
    author: '蓬塔卡纳团队',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('旺季：11月至4月'),
      makeBlock('这是多米尼加共和国的旱季——降雨量最少、湿度最低、气温最舒适（24–28°C）的时期。日落景色壮观，傍晚凉风习习，婚礼仪式期间下雨的风险极低。不足之处在于：需求旺盛意味着场地和供应商预订迅速，且价格处于峰值。'),
      makeHeading('淡旺季过渡期：5月和10月'),
      makeBlock('5月和10月正好处于雨季前后。气温略高，午后阵雨更为常见，但早晨通常晴朗美好。价格明显较低，场地空档更多。许多在这两个月举办婚礼的伴侣，都对短暂降雨带来的葱郁绿意赞不绝口。'),
      makeHeading('雨季：6月至9月'),
      makeBlock('加勒比雨季带来更多、更强的降雨，但通常时间较短。飓风季节官方为6月至11月，但蓬塔卡纳位于典型飓风路径以南，受直接影响的概率远低于其他加勒比目的地。'),
      makeHeading('我们的建议'),
      makeBlock('对于大多数伴侣而言，1月至3月是天气、档期与体验综合最佳的时段。对日期有弹性的伴侣，10月及11月初性价比极高。如非必要，请避开7月和8月——这两个月是全年最热、雨水最多的时候。'),
    ],
  },

  {
    _id: 'blog-article-time-ar',
    _type: 'blogArticle',
    language: 'ar',
    translationGroup: 'best-time-to-marry-punta-cana',
    slug: { _type: 'slug', current: 'afdal-waqt-lizzawaj-fi-punta-cana' },
    title: 'أفضل وقت في العام للزواج في بونتا كانا',
    excerpt: 'بونتا كانا جميلة على مدار العام، لكن بعض الأشهر أنسب من غيرها لحفل زفاف في الهواء الطلق. إليك كيفية اختيار تاريخك بثقة.',
    publishedAt: '2025-11-15',
    readingTime: 5,
    author: 'فريق بونتا كانا',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('موسم الذروة: من نوفمبر إلى أبريل'),
      makeBlock('هذا هو الموسم الجاف في جمهورية الدومينيكان — فترة أقل هطول للأمطار وأدنى رطوبة وأكثر درجات الحرارة راحة (٢٤–٢٨ درجة مئوية). غروب الشمس بديع، والأمسيات منعشة، وخطر سقوط الأمطار أثناء مراسم الزفاف منخفض جداً. الجانب السلبي: الطلب المرتفع يعني أن أماكن الاحتفال والموردين يُحجزون بسرعة، مع تطبيق أسعار الذروة.'),
      makeHeading('موسم الانتقال: مايو وأكتوبر'),
      makeBlock('يقع مايو وأكتوبر خارج موسم الأمطار مباشرةً. درجات الحرارة أعلى قليلاً والأمطار بعد الظهر أكثر شيوعاً، لكن الصباح عادةً ما يكون جميلاً وصافياً. الأسعار أقل بشكل ملحوظ وأماكن الاحتفال أكثر توافراً. كثير من الأزواج الذين تزوجوا في هذين الشهرين يُحبون النضارة الخضراء التي تُضفيها الأمطار الخفيفة.'),
      makeHeading('موسم الأمطار: من يونيو إلى سبتمبر'),
      makeBlock('يصطحب موسم الأمطار الكاريبي أمطاراً أكثر وأشد، وإن كانت عادةً قصيرة. يمتد موسم الأعاصير رسمياً من يونيو إلى نوفمبر، غير أن بونتا كانا تقع جنوب المسار المعتاد للأعاصير، مما يجعلها تتأثر بها بشكل مباشر أقل بكثير مقارنةً بغيرها من الوجهات الكاريبية.'),
      makeHeading('توصيتنا'),
      makeBlock('بالنسبة لمعظم الأزواج، تُقدم الفترة من يناير إلى مارس أفضل مزيج من حيث الطقس والتوافر والتجربة. أما من يتمتعون بمرونة في اختيار التواريخ، فإن أكتوبر وأوائل نوفمبر يُقدمان قيمة ممتازة. تجنّبوا يوليو وأغسطس إن أمكن — فهما أكثر الأشهر حرارةً وأمطاراً.'),
    ],
  },

  // ── Group 5: real-wedding-sarah-marco ─────────────────────────────────────

  {
    _id: 'blog-article-real-en',
    _type: 'blogArticle',
    language: 'en',
    translationGroup: 'real-wedding-sarah-marco',
    slug: { _type: 'slug', current: 'real-wedding-sarah-and-marco-cabeza-de-toro' },
    title: 'Real Wedding: Sarah & Marco at Cabeza de Toro',
    excerpt: 'Sarah from Toronto and Marco from Milan planned their entire Punta Cana wedding in under two weeks. Here is how it came together — and what they wish they had known sooner.',
    publishedAt: '2025-12-01',
    readingTime: 6,
    author: 'The Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-real-weddings' },
    body: [
      makeHeading('How It Started'),
      makeBlock('Sarah and Marco had been together for six years when they decided they did not want a traditional wedding. "We wanted our closest people, incredible food, and to wake up on a beach the next morning," Sarah told us. "Punta Cana checked every box." They found us through a friend\'s Instagram post, booked a video call, and had a wedding date confirmed within four days.'),
      makeHeading('The Planning Process'),
      makeBlock('With 45 guests flying in from Canada, Italy, and the United States, logistics were the main concern. The coordination team handled all hotel block recommendations, airport transfer coordination, and vendor scheduling. Sarah and Marco used the online calculator to configure their wedding — ceremony setup, Caribbean menu with open bar, a four-piece salsa band, and a full-day photography package. Total planning time: eleven days.'),
      makeHeading('The Day'),
      makeBlock('The ceremony took place at 5:30pm, timed precisely for golden hour. The arch was draped in white orchids and tropical greenery. Marco teared up when Sarah appeared at the end of the natural aisle formed by their guests. The reception ran until midnight with dancing, a surprise fire dancer act, and a late-night dessert station that featured local Dominican sweets.'),
      makeHeading('What They Would Tell Other Couples'),
      makeBlock('"Trust the team," Marco said. "We were nervous about not being there to oversee everything in person, but every single thing we asked for was done — and a few things we didn\'t even think to ask for." Sarah added: "Do the salsa band. It was the moment of the night."'),
    ],
  },

  {
    _id: 'blog-article-real-es',
    _type: 'blogArticle',
    language: 'es',
    translationGroup: 'real-wedding-sarah-marco',
    slug: { _type: 'slug', current: 'boda-real-sarah-y-marco-en-cabeza-de-toro' },
    title: 'Boda Real: Sarah y Marco en Cabeza de Toro',
    excerpt: 'Sarah de Toronto y Marco de Milán planificaron toda su boda en Punta Cana en menos de dos semanas. Así fue como todo se concretó — y lo que desearían haber sabido antes.',
    publishedAt: '2025-12-01',
    readingTime: 6,
    author: 'El Equipo de Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-real-weddings' },
    body: [
      makeHeading('Cómo Comenzó Todo'),
      makeBlock('Sarah y Marco llevaban seis años juntos cuando decidieron que no querían una boda tradicional. "Queríamos a nuestras personas más cercanas, comida increíble y despertar en una playa a la mañana siguiente", nos contó Sarah. "Punta Cana cumplió con todos los requisitos." Nos encontraron a través de una publicación de Instagram de un amigo, reservaron una videollamada y confirmaron la fecha de boda en cuatro días.'),
      makeHeading('El Proceso de Planificación'),
      makeBlock('Con 45 invitados llegando desde Canadá, Italia y Estados Unidos, la logística era la principal preocupación. El equipo de coordinación se encargó de todas las recomendaciones de bloque hotelero, coordinación de traslados y programación de proveedores. Sarah y Marco usaron la calculadora en línea para configurar su boda. Tiempo total de planificación: once días.'),
      makeHeading('El Gran Día'),
      makeBlock('La ceremonia tuvo lugar a las 5:30 pm, cronometrada precisamente para la hora dorada. El arco estaba adornado con orquídeas blancas y vegetación tropical. Marco se emocionó cuando Sarah apareció al final del pasillo natural formado por sus invitados. La recepción duró hasta la medianoche con baile, un espectáculo sorpresa de bailarina de fuego y una estación de postres a última hora.'),
      makeHeading('Lo que Le Dirían a Otras Parejas'),
      makeBlock('"Confía en el equipo", dijo Marco. "Estábamos nerviosos por no estar ahí para supervisar todo en persona, pero cada cosa que pedimos se hizo — y algunas que ni siquiera se nos ocurrió pedir." Sarah agregó: "Pongan la banda de salsa. Fue el momento de la noche."'),
    ],
  },

  {
    _id: 'blog-article-real-de',
    _type: 'blogArticle',
    language: 'de',
    translationGroup: 'real-wedding-sarah-marco',
    slug: { _type: 'slug', current: 'echte-hochzeit-sarah-und-marco-in-punta-cana' },
    title: 'Echte Hochzeit: Sarah & Marco in Punta Cana',
    excerpt: 'Sarah aus Toronto und Marco aus Mailand planten ihre gesamte Punta-Cana-Hochzeit in weniger als zwei Wochen. So lief alles ab — und was sie gerne früher gewusst hätten.',
    publishedAt: '2025-12-01',
    readingTime: 6,
    author: 'Das Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-real-weddings' },
    body: [
      makeHeading('Wie alles begann'),
      makeBlock('Sarah und Marco waren sechs Jahre zusammen, als sie entschieden, dass sie keine traditionelle Hochzeit wollten. "Wir wollten unsere engsten Menschen, unglaubliches Essen und am nächsten Morgen an einem Strand aufwachen", erzählte uns Sarah. "Punta Cana erfüllte alle Kriterien." Sie fanden uns durch einen Instagram-Post einer Freundin, buchten einen Videoanruf und hatten innerhalb von vier Tagen ein Hochzeitsdatum bestätigt.'),
      makeHeading('Der Planungsprozess'),
      makeBlock('Mit 45 Gästen aus Kanada, Italien und den USA waren Logistik die Hauptsorge. Das Koordinationsteam kümmerte sich um alle Hotelblock-Empfehlungen, Flughafentransfer-Koordination und Anbieterplanung. Sarah und Marco nutzten den Online-Rechner, um ihre Hochzeit zu konfigurieren. Gesamte Planungszeit: elf Tage.'),
      makeHeading('Der Tag'),
      makeBlock('Die Zeremonie fand um 17:30 Uhr statt, genau zum goldenen Stundenlicht. Der Bogen war mit weißen Orchideen und tropischem Grün geschmückt. Marco bekam feuchte Augen, als Sarah am Ende des natürlichen Ganges erschien, den ihre Gäste bildeten. Der Empfang lief bis Mitternacht mit Tanzen, einer Überraschungs-Feuertänzerin und einer Spätnacht-Dessertstation.'),
      makeHeading('Was sie anderen Paaren sagen würden'),
      makeBlock('"Vertraut dem Team", sagte Marco. "Wir waren nervös, nicht vor Ort zu sein, um alles zu überwachen, aber jede einzelne Sache, die wir wünschten, wurde umgesetzt." Sarah fügte hinzu: "Bucht die Salsa-Band. Das war der Moment des Abends."'),
    ],
  },

  {
    _id: 'blog-article-real-pt',
    _type: 'blogArticle',
    language: 'pt',
    translationGroup: 'real-wedding-sarah-marco',
    slug: { _type: 'slug', current: 'casamento-real-sarah-e-marco-punta-cana' },
    title: 'Casamento Real: Sarah e Marco em Punta Cana',
    excerpt: 'Sarah de Toronto e Marco de Milão planejaram todo o casamento em Punta Cana em menos de duas semanas. Veja como tudo se concretizou — e o que gostariam de ter sabido antes.',
    publishedAt: '2025-12-01',
    readingTime: 6,
    author: 'A Equipe Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-real-weddings' },
    body: [
      makeHeading('Como Tudo Começou'),
      makeBlock('Sarah e Marco estavam juntos há seis anos quando decidiram que não queriam um casamento tradicional. "Queríamos nossas pessoas mais próximas, comida incrível e acordar numa praia no dia seguinte", nos contou Sarah. "Punta Cana atendeu todos os requisitos." Eles nos encontraram por uma publicação no Instagram de uma amiga, agendaram uma videochamada e tiveram a data do casamento confirmada em quatro dias.'),
      makeHeading('O Processo de Planejamento'),
      makeBlock('Com 45 convidados chegando do Canadá, Itália e Estados Unidos, a logística era a principal preocupação. A equipe de coordenação cuidou de todas as recomendações de bloco hoteleiro, coordenação de traslados e agendamento de fornecedores. Sarah e Marco usaram a calculadora online para configurar o casamento. Tempo total de planejamento: onze dias.'),
      makeHeading('O Grande Dia'),
      makeBlock('A cerimônia aconteceu às 17h30, cronometrada precisamente para a hora dourada. O arco estava enfeitado com orquídeas brancas e vegetação tropical. Marco ficou emocionado quando Sarah apareceu no final do corredor natural formado pelos convidados. A recepção durou até a meia-noite com dança, uma dançarina de fogo surpresa e uma estação de sobremesas no final da noite.'),
      makeHeading('O que Diriam a Outros Casais'),
      makeBlock('"Confie na equipe", disse Marco. "Estávamos nervosos por não estarmos lá para supervisionar tudo pessoalmente, mas cada coisa que pedimos foi feita." Sarah acrescentou: "Coloque a banda de salsa. Foi o momento da noite."'),
    ],
  },

  // ── Group 6: punta-cana-honeymoon-guide ───────────────────────────────────

  {
    _id: 'blog-article-honeymoon-en',
    _type: 'blogArticle',
    language: 'en',
    translationGroup: 'punta-cana-honeymoon-guide',
    slug: { _type: 'slug', current: 'punta-cana-honeymoon-guide' },
    title: 'Punta Cana Honeymoon Guide: Making the Most of Your First Days as Newlyweds',
    excerpt: 'Many couples turn their Punta Cana wedding into a full honeymoon experience. Here is how to design the perfect first week together — from private beach time to island adventures.',
    publishedAt: '2025-12-15',
    readingTime: 5,
    author: 'The Punta Cana Team',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Stay an Extra Few Days'),
      makeBlock('Most wedding guests arrive the day before and leave the day after. As the couple, extending your stay by three to five days transforms a wedding trip into a genuine honeymoon. The post-wedding days are some of the most relaxed you will ever experience — the ceremony pressure is gone, the family dynamics have dispersed, and it is just the two of you.'),
      makeHeading('Saona Island Day Trip'),
      makeBlock('Saona Island is an hour and a half by catamaran from Punta Cana and one of the Caribbean\'s most photographed beaches. The journey itself is part of the experience — open bar on the boat, stops at a natural pool with starfish, and arrival at a beach that looks photoshopped. Book a private charter rather than a group tour for a more intimate experience.'),
      makeHeading('Romantic Dining Options'),
      makeBlock('Arrange a private beach dinner through your coordinator — table for two on the sand at sunset, dedicated server, custom menu. It costs more than a restaurant, but the memory is incomparable. Several excellent restaurants are also within a short drive: fresh seafood, traditional Dominican dishes, and international cuisine all within 20 minutes.'),
      makeHeading('Spa and Wellness'),
      makeBlock('Most major hotels in the Punta Cana area have full-service spas. A couples massage the morning after your wedding is one of the most popular add-ons couples book through us. Plan it for 10am — early enough to feel fresh, late enough to sleep in after your celebration.'),
    ],
  },

  {
    _id: 'blog-article-honeymoon-es',
    _type: 'blogArticle',
    language: 'es',
    translationGroup: 'punta-cana-honeymoon-guide',
    slug: { _type: 'slug', current: 'guia-de-luna-de-miel-en-punta-cana' },
    title: 'Guía de Luna de Miel en Punta Cana: Aprovecha al Máximo tus Primeros Días como Recién Casados',
    excerpt: 'Muchas parejas convierten su boda en Punta Cana en una experiencia de luna de miel completa. Aquí te decimos cómo diseñar la primera semana perfecta juntos.',
    publishedAt: '2025-12-15',
    readingTime: 5,
    author: 'El Equipo de Punta Cana',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Quédate Unos Días Más'),
      makeBlock('La mayoría de los invitados llegan el día antes y se van al día siguiente. Como pareja, extender tu estadía de tres a cinco días transforma un viaje de boda en una verdadera luna de miel. Los días posteriores a la boda son algunos de los más relajados que experimentarás — la presión de la ceremonia ya pasó, las dinámicas familiares se han dispersado, y son sólo ustedes dos.'),
      makeHeading('Excursión de un Día a Isla Saona'),
      makeBlock('La Isla Saona está a hora y media en catamarán desde Punta Cana y es una de las playas más fotografiadas del Caribe. El viaje en sí es parte de la experiencia — barra libre en el barco, paradas en una piscina natural con estrellas de mar y llegada a una playa que parece de Photoshop. Reserva un charter privado en lugar de una excursión grupal para una experiencia más íntima.'),
      makeHeading('Opciones de Cena Romántica'),
      makeBlock('Organiza una cena privada en la playa a través de tu coordinador — mesa para dos en la arena al atardecer, mesero dedicado, menú personalizado. Es más costoso que un restaurante, pero el recuerdo no tiene comparación. También hay varios excelentes restaurantes a corta distancia.'),
      makeHeading('Spa y Bienestar'),
      makeBlock('La mayoría de los grandes hoteles en el área de Punta Cana tienen spas de servicio completo. Un masaje en pareja la mañana después de tu boda es uno de los complementos más populares. Planearlo a las 10am es ideal — temprano para sentirse fresco, tarde para dormir después de la celebración.'),
    ],
  },

  {
    _id: 'blog-article-honeymoon-fr',
    _type: 'blogArticle',
    language: 'fr',
    translationGroup: 'punta-cana-honeymoon-guide',
    slug: { _type: 'slug', current: 'guide-lune-de-miel-punta-cana' },
    title: 'Guide Lune de Miel à Punta Cana : Profitez au Maximum de Vos Premiers Jours en Tant que Mariés',
    excerpt: 'De nombreux couples transforment leur mariage à Punta Cana en une véritable expérience de lune de miel. Voici comment concevoir la première semaine parfaite ensemble.',
    publishedAt: '2025-12-15',
    readingTime: 5,
    author: "L'équipe Punta Cana",
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('Restez quelques jours de plus'),
      makeBlock("La plupart des invités arrivent la veille et repartent le lendemain. En tant que couple, prolonger votre séjour de trois à cinq jours transforme un voyage de mariage en une véritable lune de miel. Les jours qui suivent le mariage sont parmi les plus décontractés que vous vivrez — la pression de la cérémonie est passée, la dynamique familiale s'est dissipée, et il ne reste plus que vous deux."),
      makeHeading("Excursion d'une journée à l'île Saona"),
      makeBlock("L'île Saona se trouve à une heure et demie en catamaran de Punta Cana et est l'une des plages les plus photographiées des Caraïbes. Le voyage lui-même fait partie de l'expérience — bar ouvert sur le bateau, arrêts dans une piscine naturelle avec des étoiles de mer, et arrivée sur une plage qui semble retouchée. Réservez un charter privé plutôt qu'une excursion en groupe pour une expérience plus intime."),
      makeHeading('Options de dîner romantique'),
      makeBlock("Organisez un dîner privé sur la plage via votre coordinateur — table pour deux sur le sable au coucher du soleil, serveur dédié, menu personnalisé. Cela coûte plus cher qu'un restaurant, mais le souvenir est incomparable."),
      makeHeading('Spa et bien-être'),
      makeBlock("La plupart des grands hôtels de la région de Punta Cana disposent de spas complets. Un massage en couple le lendemain matin de votre mariage est l'un des suppléments les plus populaires. Prévoyez-le à 10h — assez tôt pour être frais, assez tard pour faire la grasse matinée après votre célébration."),
    ],
  },

  {
    _id: 'blog-article-honeymoon-ar',
    _type: 'blogArticle',
    language: 'ar',
    translationGroup: 'punta-cana-honeymoon-guide',
    slug: { _type: 'slug', current: 'dalil-shahr-al-asal-fi-punta-cana' },
    title: 'دليل شهر العسل في بونتا كانا: استمتعا بأفضل أيامكما الأولى كزوجين',
    excerpt: 'يحوّل كثير من الأزواج حفل زفافهم في بونتا كانا إلى تجربة شهر عسل متكاملة. إليك كيفية تصميم الأسبوع الأول المثالي معاً.',
    publishedAt: '2025-12-15',
    readingTime: 5,
    author: 'فريق بونتا كانا',
    category: { _type: 'reference', _ref: 'blog-category-punta-cana' },
    body: [
      makeHeading('أطيلا إقامتكما بضعة أيام إضافية'),
      makeBlock('معظم الضيوف يصلون قبل يوم ويغادرون في اليوم التالي. أما أنتما كزوجين، فإن تمديد إقامتكما من ثلاثة إلى خمسة أيام يحوّل رحلة الزفاف إلى شهر عسل حقيقي. الأيام التي تلي حفل الزفاف هي من أكثر الأيام هدوءاً وراحة في حياتكما — ضغط المراسم قد مضى، الديناميكيات العائلية تفرّقت، ولم يتبقَّ سوى أنتما.'),
      makeHeading('رحلة يوم كامل إلى جزيرة سافونا'),
      makeBlock('تبعد جزيرة سافونا ساعة ونصف بالقارب الشراعي عن بونتا كانا، وهي واحدة من أكثر الشواطئ تصويراً في منطقة الكاريبي. الرحلة ذاتها جزء من التجربة — بار مفتوح على متن القارب، توقفات عند بركة طبيعية تعيش فيها نجوم البحر، ثم الوصول إلى شاطئ يبدو كأنه من صفحات المجلات. احجزا رحلة خاصة بدلاً من جولة جماعية للحصول على تجربة أكثر حميمية.'),
      makeHeading('خيارات العشاء الرومانسي'),
      makeBlock('يمكنكما ترتيب عشاء خاص على الشاطئ عبر منسّقكما — طاولة لاثنين على الرمال عند الغروب، نادل خاص، قائمة طعام مخصصة. التكلفة أعلى من المطعم، لكن الذكرى لا تُقدّر بثمن.'),
      makeHeading('السبا والعافية'),
      makeBlock('تضم معظم الفنادق الكبرى في منطقة بونتا كانا مراكز سبا متكاملة. تدليك الأزواج في صباح اليوم التالي لحفل الزفاف من أكثر الإضافات التي يحجزها الأزواج لدينا. الساعة العاشرة صباحاً هي الوقت المثالي — مبكرة بما يكفي لتشعرا بالانتعاش، ومتأخرة بما يكفي للنوم باكراً بعد احتفالكما.'),
    ],
  },
]

// ─── Wedding Stories ──────────────────────────────────────────────────────────

const weddingStories = [
  {
    _id: 'story-sarah-marco',
    _type: 'weddingStory',
    coupleName: { _type: 'localizedString', en: 'Sarah & Marco', es: 'Sarah y Marco' },
    slug: { _type: 'slug', current: 'sarah-and-marco' },
    publishedAt: '2025-10-15',
    weddingDate: '2025-10-04',
    featured: true,
    guestCount: 82,
    budgetRange: { _type: 'localizedString', en: 'From $14,000', es: 'Desde $14,000' },
    excerpt: {
      _type: 'localizedText',
      en: 'Sarah and Marco flew in from Toronto with 82 guests and turned Cabeza de Toro into their Caribbean dream — barefoot ceremony, sunset dinner, and dancing until midnight.',
      es: 'Sarah y Marco volaron desde Toronto con 82 invitados y convirtieron Cabeza de Toro en su sueño caribeño — ceremonia descalzos, cena al atardecer y baile hasta la medianoche.',
    },
    testimonial: {
      _type: 'localizedText',
      en: 'We could not believe how smoothly everything ran. From the moment we submitted our calculator, the team took care of every detail. Our guests are still talking about it.',
      es: 'No podíamos creer lo fluido que salió todo. Desde el momento en que enviamos nuestra calculadora, el equipo se encargó de cada detalle. Nuestros invitados todavía hablan de eso.',
    },
    body: {
      _type: 'localizedBlock',
      en: [
        makeHeading('The Beginning'),
        makeBlock('Sarah and Marco had dreamed of a destination wedding for years, but the logistics always felt overwhelming. When they discovered Punta Cana Wedding Packages, everything changed. Within an afternoon they had built their full wedding package online and knew exactly what it would cost.'),
        makeHeading('The Ceremony'),
        makeBlock('The ceremony took place at golden hour directly on the beach at Cabeza de Toro. Sarah walked barefoot across the warm sand while Marco waited at a simple arch of white flowers and tropical greenery. The ocean breeze carried the scent of hibiscus through the 82-seat arrangement of rattan chairs.'),
        makeHeading('The Reception'),
        makeBlock('Dinner was served as the sky turned rose and amber. The menu featured fresh ceviche, grilled lobster, and a Dominican-style rice station that guests raved about. The DJ kept the dance floor full well past midnight, and the couple took a moonlit walk on the beach before the final song.'),
      ],
      es: [
        makeHeading('El Comienzo'),
        makeBlock('Sarah y Marco habían soñado con una boda de destino durante años, pero la logística siempre parecía abrumadora. Cuando descubrieron Paquetes de Bodas en Punta Cana, todo cambió. En una tarde habían diseñado su paquete completo en línea y sabían exactamente cuánto costaría.'),
        makeHeading('La Ceremonia'),
        makeBlock('La ceremonia tuvo lugar en la hora dorada directamente en la playa de Cabeza de Toro. Sarah caminó descalza sobre la cálida arena mientras Marco la esperaba en un sencillo arco de flores blancas y vegetación tropical. La brisa del océano llevaba el aroma de hibisco a través de los 82 asientos de sillas de ratán.'),
        makeHeading('La Recepción'),
        makeBlock('La cena se sirvió mientras el cielo se tornaba rosa y ámbar. El menú incluía ceviche fresco, langosta a la parrilla y una estación de arroz al estilo dominicano que los invitados adoraron. El DJ mantuvo la pista de baile llena hasta bien pasada la medianoche, y la pareja dio un paseo nocturno por la playa antes de la última canción.'),
      ],
    },
  },

  {
    _id: 'story-emma-james',
    _type: 'weddingStory',
    coupleName: { _type: 'localizedString', en: 'Emma & James', es: 'Emma y James' },
    slug: { _type: 'slug', current: 'emma-and-james' },
    publishedAt: '2025-08-20',
    weddingDate: '2025-07-19',
    featured: false,
    guestCount: 45,
    budgetRange: { _type: 'localizedString', en: 'From $9,500', es: 'Desde $9,500' },
    excerpt: {
      _type: 'localizedText',
      en: 'Emma and James kept it intimate — 45 people, a garden ceremony, and a dinner that felt like the best party they had ever thrown.',
      es: 'Emma y James lo mantuvieron íntimo — 45 personas, una ceremonia en el jardín y una cena que se sintió como la mejor fiesta que habían organizado.',
    },
    testimonial: {
      _type: 'localizedText',
      en: 'Every single thing we selected from the calculator was exactly as described. No surprises, no hidden costs. Just a beautiful day.',
      es: 'Absolutamente todo lo que seleccionamos en la calculadora fue exactamente como se describió. Sin sorpresas, sin costos ocultos. Solo un día hermoso.',
    },
    body: {
      _type: 'localizedBlock',
      en: [
        makeHeading('Keeping It Intimate'),
        makeBlock('Emma and James wanted something small and meaningful. They chose a garden setting at Cabeza de Toro, with just 45 of their closest friends and family. The team helped them curate every detail to feel personal rather than large-scale.'),
        makeHeading('Garden Ceremony'),
        makeBlock('The ceremony was held under a canopy of bougainvillea, with simple wooden benches and a string quartet playing as guests arrived. Emma wore a flowing linen dress; James wore a linen suit in soft ivory. The vows were personal, handwritten, and brought more than a few guests to tears.'),
        makeHeading('Dinner Under the Stars'),
        makeBlock('Dinner was long, relaxed, and full of laughter. Four courses, a craft cocktail bar, and a custom wedding cake made by a local Dominican baker. By 11 pm the dancing had spilled onto the lawn, and the night felt like it would never end.'),
      ],
      es: [
        makeHeading('Manteniéndolo Íntimo'),
        makeBlock('Emma y James querían algo pequeño y significativo. Eligieron un entorno de jardín en Cabeza de Toro, con solo 45 de sus amigos y familiares más cercanos. El equipo les ayudó a seleccionar cada detalle para que se sintiera personal en lugar de a gran escala.'),
        makeHeading('Ceremonia en el Jardín'),
        makeBlock('La ceremonia se realizó bajo un dosel de buganvillas, con sencillos bancos de madera y un cuarteto de cuerdas tocando mientras llegaban los invitados. Emma llevaba un vestido de lino fluyente; James llevaba un traje de lino en marfil suave. Los votos fueron personales, escritos a mano, y dejaron a más de un invitado con lágrimas en los ojos.'),
        makeHeading('Cena Bajo las Estrellas'),
        makeBlock('La cena fue larga, relajada y llena de risas. Cuatro platos, un bar de cócteles artesanales y un pastel de boda personalizado hecho por un pastelero dominicano local. A las 11 pm el baile se había extendido al jardín, y la noche parecía que nunca terminaría.'),
      ],
    },
  },

  {
    _id: 'story-lucia-rafael',
    _type: 'weddingStory',
    coupleName: { _type: 'localizedString', en: 'Lucía & Rafael', es: 'Lucía y Rafael' },
    slug: { _type: 'slug', current: 'lucia-and-rafael' },
    publishedAt: '2025-06-10',
    weddingDate: '2025-04-26',
    featured: false,
    guestCount: 120,
    budgetRange: { _type: 'localizedString', en: 'From $21,000', es: 'Desde $21,000' },
    excerpt: {
      _type: 'localizedText',
      en: 'A full celebration with 120 guests flown in from Mexico City — three days of events, a white-and-gold ceremony on the water, and a reception that ended at sunrise.',
      es: 'Una celebración completa con 120 invitados llegados desde Ciudad de México — tres días de eventos, una ceremonia blanca y dorada a orillas del agua y una recepción que terminó al amanecer.',
    },
    testimonial: {
      _type: 'localizedText',
      en: 'We had tried to plan this ourselves for two years and kept hitting walls. The team here made everything possible in a matter of weeks. I cannot recommend them enough.',
      es: 'Habíamos intentado planificar esto por nuestra cuenta durante dos años y seguíamos chocando con obstáculos. El equipo aquí hizo todo posible en cuestión de semanas. No puedo recomendarlos lo suficiente.',
    },
    body: {
      _type: 'localizedBlock',
      en: [
        makeHeading('Three Days, One Dream'),
        makeBlock('Lucía and Rafael arrived from Mexico City with a clear vision: a three-day celebration that their guests would never forget. Day one was a welcome dinner on the terrace. Day two was the main ceremony and reception. Day three was a beach party and farewell brunch.'),
        makeHeading('The Ceremony'),
        makeBlock('120 guests gathered at the water\'s edge for a ceremony that blended Mexican and Dominican traditions. The arch was wrapped in white orchids and tropical leaves. A live mariachi trio surprised guests as they arrived, transitioning to a Dominican merengue band for the reception.'),
        makeHeading('The Sunrise Ending'),
        makeBlock('The reception was supposed to end at midnight. It did not. The energy was so high that the team extended the DJ set, and the last guests finally said goodbye as the first light of morning appeared over the Caribbean. Lucía says it was the most alive she has ever felt.'),
      ],
      es: [
        makeHeading('Tres Días, Un Sueño'),
        makeBlock('Lucía y Rafael llegaron desde Ciudad de México con una visión clara: una celebración de tres días que sus invitados nunca olvidarían. El primer día fue una cena de bienvenida en la terraza. El segundo día fue la ceremonia principal y la recepción. El tercer día fue una fiesta en la playa y un brunch de despedida.'),
        makeHeading('La Ceremonia'),
        makeBlock('120 invitados se reunieron a la orilla del agua para una ceremonia que combinó tradiciones mexicanas y dominicanas. El arco estaba envuelto en orquídeas blancas y hojas tropicales. Un trío de mariachis en vivo sorprendió a los invitados al llegar, y luego una banda de merengue dominicana tomó el escenario para la recepción.'),
        makeHeading('El Final al Amanecer'),
        makeBlock('Se suponía que la recepción terminaría a medianoche. No fue así. La energía era tan alta que el equipo extendió la sesión del DJ, y los últimos invitados finalmente se despidieron cuando la primera luz de la mañana apareció sobre el Caribe. Lucía dice que fue el momento en que más viva se ha sentido.'),
      ],
    },
  },
]

// ─── Page SEO ─────────────────────────────────────────────────────────────────

const defaultJsonLdEn = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WeddingVenue',
  name: 'Punta Cana Wedding Packages',
  description: 'Design your dream destination wedding in Punta Cana, Dominican Republic.',
  url: 'https://puntacanaweddingpackages.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cabeza de Toro',
    addressRegion: 'La Altagracia',
    addressCountry: 'DO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-829-555-1234',
    contactType: 'customer service',
    availableLanguage: ['en', 'es'],
  },
  sameAs: [],
}, null, 2)

const defaultJsonLdEs = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WeddingVenue',
  name: 'Paquetes de Bodas en Punta Cana',
  description: 'Diseña la boda de tus sueños en Punta Cana, República Dominicana.',
  url: 'https://puntacanaweddingpackages.com/es',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cabeza de Toro',
    addressRegion: 'La Altagracia',
    addressCountry: 'DO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-829-555-1234',
    contactType: 'customer service',
    availableLanguage: ['en', 'es'],
  },
  sameAs: [],
}, null, 2)

function makeSeoFields(
  enTitle: string,
  enDesc: string,
  esTitle: string,
  esDesc: string,
  enKeywords: string[],
  esKeywords: string[],
) {
  return {
    seo: {
      _type: 'seo',
      meta: {
        en: { title: enTitle, description: enDesc, keywords: enKeywords },
        es: { title: esTitle, description: esDesc, keywords: esKeywords },
      },
      openGraph: {
        en: { title: enTitle, description: enDesc },
        es: { title: esTitle, description: esDesc },
        image: null,
      },
      structuredData: {
        en: defaultJsonLdEn,
        es: defaultJsonLdEs,
      },
      noIndex: false,
      noFollow: false,
    },
  }
}

const pageSeoDocuments = [
  {
    _id: 'page-seo-home',
    _type: 'pageSeo',
    pageName: 'home',
    ...makeSeoFields(
      'Punta Cana Wedding Packages — Design Your Dream Wedding',
      'Build your perfect destination wedding in Punta Cana, Dominican Republic. Transparent pricing, real choices, zero stress.',
      'Paquetes de Bodas en Punta Cana — Diseña Tu Boda Perfecta',
      'Crea tu boda de destino perfecta en Punta Cana, República Dominicana. Precios transparentes, opciones reales, sin estrés.',
      ['Punta Cana wedding', 'destination wedding', 'wedding packages', 'Cabeza de Toro', 'Caribbean wedding', 'beach wedding', 'Dominican Republic wedding'],
      ['boda en Punta Cana', 'boda de destino', 'paquetes de boda', 'Cabeza de Toro', 'boda en el Caribe', 'boda en la playa', 'boda en República Dominicana'],
    ),
  },
  {
    _id: 'page-seo-about',
    _type: 'pageSeo',
    pageName: 'about',
    ...makeSeoFields(
      'About Us | Punta Cana Wedding Packages',
      'Meet the passionate team behind Punta Cana Wedding Packages — dedicated to making your Caribbean wedding unforgettable.',
      'Sobre Nosotros | Paquetes de Bodas en Punta Cana',
      'Conoce al equipo apasionado detrás de Paquetes de Bodas en Punta Cana — dedicado a hacer tu boda en el Caribe inolvidable.',
      ['about Punta Cana weddings', 'wedding team', 'Cabeza de Toro venue', 'wedding coordinators'],
      ['sobre bodas en Punta Cana', 'equipo de bodas', 'lugar Cabeza de Toro', 'coordinadores de boda'],
    ),
  },
  {
    _id: 'page-seo-how-it-works',
    _type: 'pageSeo',
    pageName: 'how-it-works',
    ...makeSeoFields(
      'How It Works | Punta Cana Wedding Packages',
      'See how easy it is to plan your Punta Cana destination wedding. Build your package, see live pricing, and submit in minutes.',
      'Cómo Funciona | Paquetes de Bodas en Punta Cana',
      'Descubre lo fácil que es planificar tu boda de destino en Punta Cana. Arma tu paquete, ve precios en tiempo real y envía en minutos.',
      ['how to plan a destination wedding', 'wedding planning process', 'Punta Cana wedding steps', 'transparent wedding pricing'],
      ['cómo planificar una boda de destino', 'proceso de planificación de bodas', 'pasos para boda en Punta Cana', 'precios transparentes de boda'],
    ),
  },
  {
    _id: 'page-seo-contact',
    _type: 'pageSeo',
    pageName: 'contact',
    ...makeSeoFields(
      'Contact Us | Punta Cana Wedding Packages',
      'Get in touch with our wedding planning team. We respond within 24 hours via WhatsApp, email, or video call.',
      'Contáctanos | Paquetes de Bodas en Punta Cana',
      'Contáctate con nuestro equipo de planificación de bodas. Respondemos en 24 horas por WhatsApp, correo o videollamada.',
      ['contact wedding planner Punta Cana', 'wedding inquiry', 'WhatsApp wedding consultation'],
      ['contactar organizador de bodas Punta Cana', 'consulta de boda', 'consulta de boda por WhatsApp'],
    ),
  },
  {
    _id: 'page-seo-blog',
    _type: 'pageSeo',
    pageName: 'blog',
    ...makeSeoFields(
      'Wedding Blog | Punta Cana Wedding Packages',
      'Tips, inspiration, and real wedding stories for couples planning a destination wedding in Punta Cana.',
      'Blog de Bodas | Paquetes de Bodas en Punta Cana',
      'Consejos, inspiración e historias de bodas reales para parejas que planifican una boda de destino en Punta Cana.',
      ['Punta Cana wedding blog', 'destination wedding tips', 'wedding inspiration', 'real weddings Dominican Republic'],
      ['blog de bodas Punta Cana', 'consejos para boda de destino', 'inspiración de bodas', 'bodas reales República Dominicana'],
    ),
  },
  {
    _id: 'page-seo-stories',
    _type: 'pageSeo',
    pageName: 'stories',
    ...makeSeoFields(
      'Real Wedding Stories | Punta Cana Wedding Packages',
      'Inspiration from couples who celebrated their dream wedding in Punta Cana, Dominican Republic.',
      'Historias de Bodas Reales | Paquetes de Bodas en Punta Cana',
      'Inspiración de parejas que celebraron la boda de sus sueños en Punta Cana, República Dominicana.',
      ['Punta Cana wedding stories', 'real weddings Dominican Republic', 'wedding inspiration Caribbean', 'destination wedding testimonials'],
      ['historias de bodas Punta Cana', 'bodas reales República Dominicana', 'inspiración bodas Caribe', 'testimonios boda de destino'],
    ),
  },
  {
    _id: 'page-seo-privacy-policy',
    _type: 'pageSeo',
    pageName: 'privacy-policy',
    ...makeSeoFields(
      'Privacy Policy | Punta Cana Wedding Packages',
      'How Punta Cana Wedding Packages collects, uses, and protects your personal information.',
      'Política de Privacidad | Paquetes de Bodas en Punta Cana',
      'Cómo Paquetes de Bodas en Punta Cana recopila, usa y protege tu información personal.',
      [],
      [],
    ),
  },
  {
    _id: 'page-seo-terms-of-service',
    _type: 'pageSeo',
    pageName: 'terms-of-service',
    ...makeSeoFields(
      'Terms of Service | Punta Cana Wedding Packages',
      'Terms and conditions governing the use of Punta Cana Wedding Packages planning services.',
      'Términos de Servicio | Paquetes de Bodas en Punta Cana',
      'Términos y condiciones que rigen el uso de los servicios de planificación de Paquetes de Bodas en Punta Cana.',
      [],
      [],
    ),
  },
]

// ── Wedding Calculator Pricing Data ──────────────────────────────────────────

const calculatorConfigDoc = {
  _id: 'calculatorConfig',
  _type: 'calculatorConfig',
  venueCost: 4500,
  coordinationCost: 0,
  defaultSeatsPerTable: 10,
  minimumAdvanceMonths: 6,
}

const menuOptions = [
  {
    _id: 'menu-classic',
    _type: 'menuOption',
    name: { _type: 'localizedString', en: 'Classic Menu', es: 'Menú Clásico' },
    description: { _type: 'localizedText', en: 'A timeless selection of international and Caribbean dishes served buffet-style.', es: 'Una selección atemporal de platos internacionales y caribeños servidos en formato buffet.' },
    style: 'buffet',
    costPerPerson: 30,
    order: 1,
  },
  {
    _id: 'menu-tropical',
    _type: 'menuOption',
    name: { _type: 'localizedString', en: 'Tropical Menu', es: 'Menú Tropical' },
    description: { _type: 'localizedText', en: 'Fresh Dominican seafood and tropical ingredients elevated into elegant plated courses.', es: 'Mariscos dominicanos frescos e ingredientes tropicales elevados a elegantes platos servidos.' },
    style: 'plated',
    costPerPerson: 40,
    order: 2,
  },
  {
    _id: 'menu-premium',
    _type: 'menuOption',
    name: { _type: 'localizedString', en: 'Premium Menu', es: 'Menú Premium' },
    description: { _type: 'localizedText', en: 'A gourmet five-course dinner featuring premium proteins and locally-sourced ingredients.', es: 'Una cena gourmet de cinco tiempos con proteínas premium e ingredientes de origen local.' },
    style: 'plated',
    costPerPerson: 55,
    order: 3,
  },
  {
    _id: 'menu-family',
    _type: 'menuOption',
    name: { _type: 'localizedString', en: 'Family Style', es: 'Estilo Familiar' },
    description: { _type: 'localizedText', en: 'Abundant sharing platters brought to each table — warm, communal, and relaxed.', es: 'Abundantes bandejas compartidas servidas en cada mesa — cálido, comunitario y relajado.' },
    style: 'family',
    costPerPerson: 35,
    order: 4,
  },
]

const barPackages = [
  {
    _id: 'bar-basic',
    _type: 'barPackage',
    name: { _type: 'localizedString', en: 'Basic Bar', es: 'Barra Básica' },
    description: { _type: 'localizedText', en: 'Beer, house wine, rum, and soft drinks. Everything your guests need for a great celebration.', es: 'Cerveza, vino de la casa, ron y refrescos. Todo lo que tus invitados necesitan para una gran celebración.' },
    tier: 'basic',
    costPerPersonPerHour: 18,
    availableHours: [3, 5, 8],
    addOns: [
      { _key: 'champagne-toast', name: { _type: 'localizedString', en: 'Champagne Toast', es: 'Brindis con Champán' }, cost: 500, isPerPerson: false },
      { _key: 'coffee-station', name: { _type: 'localizedString', en: 'Coffee Station', es: 'Estación de Café' }, cost: 200, isPerPerson: false },
    ],
    order: 1,
  },
  {
    _id: 'bar-premium',
    _type: 'barPackage',
    name: { _type: 'localizedString', en: 'Premium Bar', es: 'Barra Premium' },
    description: { _type: 'localizedText', en: 'Premium spirits, cocktails, imported wine, and beer. Crafted drinks for a refined celebration.', es: 'Licores premium, cócteles, vino importado y cerveza. Bebidas elaboradas para una celebración refinada.' },
    tier: 'premium',
    costPerPersonPerHour: 28,
    availableHours: [3, 5, 8],
    addOns: [
      { _key: 'champagne-toast', name: { _type: 'localizedString', en: 'Champagne Toast', es: 'Brindis con Champán' }, cost: 500, isPerPerson: false },
      { _key: 'signature-cocktails', name: { _type: 'localizedString', en: 'Signature Cocktails', es: 'Cócteles de Firma' }, cost: 15, isPerPerson: true },
      { _key: 'wine-pairing', name: { _type: 'localizedString', en: 'Wine Pairing Service', es: 'Maridaje de Vinos' }, cost: 20, isPerPerson: true },
      { _key: 'coffee-station', name: { _type: 'localizedString', en: 'Coffee Station', es: 'Estación de Café' }, cost: 200, isPerPerson: false },
    ],
    order: 2,
  },
  {
    _id: 'bar-topshelf',
    _type: 'barPackage',
    name: { _type: 'localizedString', en: 'Top Shelf Bar', es: 'Barra Top Shelf' },
    description: { _type: 'localizedText', en: 'Unlimited top-shelf spirits, premium champagne, curated cocktails, and sommelier wine service.', es: 'Licores top-shelf ilimitados, champán premium, cócteles curados y servicio de vinos con sommelier.' },
    tier: 'topShelf',
    costPerPersonPerHour: 40,
    availableHours: [5, 8],
    addOns: [
      { _key: 'champagne-tower', name: { _type: 'localizedString', en: 'Champagne Tower', es: 'Torre de Champán' }, cost: 800, isPerPerson: false },
      { _key: 'signature-cocktails', name: { _type: 'localizedString', en: 'Signature Cocktails', es: 'Cócteles de Firma' }, cost: 15, isPerPerson: true },
      { _key: 'digestif', name: { _type: 'localizedString', en: 'After-Dinner Digestif Service', es: 'Servicio de Digestivos' }, cost: 8, isPerPerson: true },
      { _key: 'coffee-station', name: { _type: 'localizedString', en: 'Coffee & Espresso Station', es: 'Estación de Café y Espresso' }, cost: 200, isPerPerson: false },
    ],
    order: 3,
  },
]

const furnitureOptions = [
  {
    _id: 'furniture-standard',
    _type: 'furnitureOption',
    name: { _type: 'localizedString', en: 'Standard', es: 'Estándar' },
    description: { _type: 'localizedText', en: 'Standard round tables with white folding chairs and classic white linens.', es: 'Mesas redondas estándar con sillas plegables blancas y manteles clásicos blancos.' },
    tableType: 'standardRound',
    chairType: 'standard',
    seatsPerTable: 10,
    costPerTable: 15,
    order: 1,
  },
  {
    _id: 'furniture-premium',
    _type: 'furnitureOption',
    name: { _type: 'localizedString', en: 'Premium', es: 'Premium' },
    description: { _type: 'localizedText', en: 'Premium round tables with elegant cross-back chairs and premium linen overlays.', es: 'Mesas redondas premium con elegantes sillas cross-back y sobremantel premium.' },
    tableType: 'premiumRound',
    chairType: 'crossback',
    seatsPerTable: 10,
    costPerTable: 35,
    order: 2,
  },
  {
    _id: 'furniture-luxury',
    _type: 'furnitureOption',
    name: { _type: 'localizedString', en: 'Luxury Chiavari', es: 'Chiavari de Lujo' },
    description: { _type: 'localizedText', en: 'Long banquet tables with gold Chiavari chairs and designer linen in your choice of color.', es: 'Mesas banquete largas con sillas Chiavari doradas y mantería de diseñador en el color de tu elección.' },
    tableType: 'banquet',
    chairType: 'chiavari',
    seatsPerTable: 10,
    costPerTable: 55,
    order: 3,
  },
]

const decorPackages = [
  {
    _id: 'decor-classic',
    _type: 'decorPackage',
    name: { _type: 'localizedString', en: 'Classic', es: 'Clásico' },
    description: { _type: 'localizedText', en: 'Simple, elegant florals with basic centerpieces and a clean ceremony setup.', es: 'Arreglos florales simples y elegantes con centros de mesa básicos y una configuración limpia para la ceremonia.' },
    baseCost: 3000,
    addOns: [
      { _key: 'aisle-florals', name: { _type: 'localizedString', en: 'Aisle Florals', es: 'Flores en el Pasillo' }, cost: 500, isPerTable: false },
      { _key: 'sweetheart-table', name: { _type: 'localizedString', en: 'Sweetheart Table Design', es: 'Diseño Mesa de Novios' }, cost: 500, isPerTable: false },
      { _key: 'candles-lighting', name: { _type: 'localizedString', en: 'Candles & Lighting Upgrade', es: 'Mejora de Velas e Iluminación' }, cost: 500, isPerTable: false },
    ],
    order: 1,
  },
  {
    _id: 'decor-elegant',
    _type: 'decorPackage',
    name: { _type: 'localizedString', en: 'Elegant', es: 'Elegante' },
    description: { _type: 'localizedText', en: 'Upgraded florals with premium centerpieces, enhanced lighting, and ceremony arch included.', es: 'Flores mejoradas con centros de mesa premium, iluminación realzada y arco de ceremonia incluido.' },
    baseCost: 6000,
    addOns: [
      { _key: 'extra-centerpieces', name: { _type: 'localizedString', en: 'Centerpiece Upgrade (per table)', es: 'Mejora de Centro de Mesa (por mesa)' }, cost: 100, isPerTable: true },
      { _key: 'sweetheart-table', name: { _type: 'localizedString', en: 'Sweetheart Table Design', es: 'Diseño Mesa de Novios' }, cost: 500, isPerTable: false },
      { _key: 'lounge-setup', name: { _type: 'localizedString', en: 'Lounge Area Florals', es: 'Flores en Área Lounge' }, cost: 300, isPerTable: false },
    ],
    order: 2,
  },
  {
    _id: 'decor-premium',
    _type: 'decorPackage',
    name: { _type: 'localizedString', en: 'Premium Luxury', es: 'Lujo Premium' },
    description: { _type: 'localizedText', en: 'Lavish floral arrangements, elaborate centerpieces, full lighting design, and complete venue transformation.', es: 'Exuberantes arreglos florales, centros de mesa elaborados, diseño completo de iluminación y transformación total del lugar.' },
    baseCost: 10000,
    addOns: [
      { _key: 'extra-centerpieces', name: { _type: 'localizedString', en: 'Centerpiece Upgrade (per table)', es: 'Mejora de Centro de Mesa (por mesa)' }, cost: 100, isPerTable: true },
      { _key: 'ceremony-arch', name: { _type: 'localizedString', en: 'Custom Ceremony Arch', es: 'Arco de Ceremonia Personalizado' }, cost: 800, isPerTable: false },
      { _key: 'lounge-setup', name: { _type: 'localizedString', en: 'Lounge Area Florals', es: 'Flores en Área Lounge' }, cost: 300, isPerTable: false },
    ],
    order: 3,
  },
]

const photoPackages = [
  {
    _id: 'photo-standard',
    _type: 'photoPackage',
    name: { _type: 'localizedString', en: 'Standard Coverage', es: 'Cobertura Estándar' },
    description: { _type: 'localizedText', en: '1 photographer, 8 hours of coverage, digital gallery with 400+ edited photos.', es: '1 fotógrafo, 8 horas de cobertura, galería digital con más de 400 fotos editadas.' },
    hours: 8,
    cost: 2500,
    addOns: [
      { _key: 'drone', name: { _type: 'localizedString', en: 'Drone Footage', es: 'Tomas con Drone' }, cost: 800 },
      { _key: 'album', name: { _type: 'localizedString', en: 'Premium Photo Album', es: 'Álbum de Fotos Premium' }, cost: 300 },
      { _key: 'rush', name: { _type: 'localizedString', en: 'Rush Gallery Delivery', es: 'Entrega Rápida de Galería' }, cost: 200 },
    ],
    order: 1,
  },
  {
    _id: 'photo-premium',
    _type: 'photoPackage',
    name: { _type: 'localizedString', en: 'Premium Coverage', es: 'Cobertura Premium' },
    description: { _type: 'localizedText', en: '2 photographers, 10 hours of coverage, engagement session included, 600+ edited photos.', es: '2 fotógrafos, 10 horas de cobertura, sesión de compromiso incluida, más de 600 fotos editadas.' },
    hours: 10,
    cost: 4000,
    addOns: [
      { _key: 'drone', name: { _type: 'localizedString', en: 'Drone Footage', es: 'Tomas con Drone' }, cost: 800 },
      { _key: 'album', name: { _type: 'localizedString', en: 'Premium Photo Album', es: 'Álbum de Fotos Premium' }, cost: 300 },
      { _key: 'prints', name: { _type: 'localizedString', en: 'Fine Art Print Set (20 prints)', es: 'Set de Impresiones de Arte (20 impresiones)' }, cost: 400 },
    ],
    order: 2,
  },
  {
    _id: 'photo-luxury',
    _type: 'photoPackage',
    name: { _type: 'localizedString', en: 'Luxury Coverage', es: 'Cobertura de Lujo' },
    description: { _type: 'localizedText', en: '2 photographers, 12 hours of coverage, pre-wedding session, drone, 800+ edited photos, luxury album.', es: '2 fotógrafos, 12 horas de cobertura, sesión pre-boda, drone, más de 800 fotos editadas, álbum de lujo.' },
    hours: 12,
    cost: 6000,
    addOns: [
      { _key: 'drone', name: { _type: 'localizedString', en: 'Second Drone Operator', es: 'Segundo Operador de Drone' }, cost: 600 },
      { _key: 'prints', name: { _type: 'localizedString', en: 'Fine Art Print Set (20 prints)', es: 'Set de Impresiones de Arte (20 impresiones)' }, cost: 400 },
      { _key: 'canvas', name: { _type: 'localizedString', en: 'Canvas Wall Art (60×90 cm)', es: 'Arte en Lienzo para Pared (60×90 cm)' }, cost: 250 },
    ],
    order: 3,
  },
]

const videoPackages = [
  {
    _id: 'video-standard',
    _type: 'videoPackage',
    name: { _type: 'localizedString', en: 'Standard Video', es: 'Video Estándar' },
    description: { _type: 'localizedText', en: '1 videographer, 8 hours of coverage, cinematic highlights reel (5–7 min).', es: '1 videógrafo, 8 horas de cobertura, video de momentos destacados (5–7 min).' },
    hours: 8,
    cost: 2500,
    addOns: [
      { _key: 'drone', name: { _type: 'localizedString', en: 'Drone Footage', es: 'Tomas con Drone' }, cost: 600 },
      { _key: 'social-cut', name: { _type: 'localizedString', en: 'Social Media Content Package', es: 'Paquete de Contenido para Redes Sociales' }, cost: 300 },
    ],
    order: 1,
  },
  {
    _id: 'video-premium',
    _type: 'videoPackage',
    name: { _type: 'localizedString', en: 'Premium Cinematic', es: 'Cinematográfico Premium' },
    description: { _type: 'localizedText', en: '2 videographers, 12 hours of coverage, cinematic film (10–15 min) + raw footage.', es: '2 videógrafos, 12 horas de cobertura, película cinematográfica (10–15 min) + metraje sin editar.' },
    hours: 12,
    cost: 4500,
    addOns: [
      { _key: 'drone', name: { _type: 'localizedString', en: 'Drone Footage', es: 'Tomas con Drone' }, cost: 600 },
      { _key: 'same-day-edit', name: { _type: 'localizedString', en: 'Same-Day Highlight Reel', es: 'Video Destacado el Mismo Día' }, cost: 500 },
      { _key: 'social-cut', name: { _type: 'localizedString', en: 'Social Media Content Package', es: 'Paquete de Contenido para Redes Sociales' }, cost: 300 },
    ],
    order: 2,
  },
  {
    _id: 'video-luxury',
    _type: 'videoPackage',
    name: { _type: 'localizedString', en: 'Luxury Drone Film', es: 'Película Drone de Lujo' },
    description: { _type: 'localizedText', en: '2 videographers + dedicated drone operator, 12 hours, full-length documentary + cinematic highlights.', es: '2 videógrafos + operador de drone dedicado, 12 horas, documental completo + destacados cinematográficos.' },
    hours: 12,
    cost: 6500,
    addOns: [
      { _key: 'same-day-edit', name: { _type: 'localizedString', en: 'Same-Day Highlight Reel', es: 'Video Destacado el Mismo Día' }, cost: 500 },
      { _key: 'social-cut', name: { _type: 'localizedString', en: 'Social Media Content Package', es: 'Paquete de Contenido para Redes Sociales' }, cost: 300 },
      { _key: 'ceremony-only', name: { _type: 'localizedString', en: 'Ceremony-Only Trim (discount)', es: 'Solo Ceremonia (descuento)' }, cost: -1000 },
    ],
    order: 3,
  },
]

const transportationZones = [
  {
    _id: 'transport-zone-punta-cana',
    _type: 'transportationZone',
    name: { _type: 'localizedString', en: 'Punta Cana (General)', es: 'Punta Cana (General)' },
    description: { _type: 'localizedText', en: 'Hotels in the main Punta Cana tourist corridor.', es: 'Hoteles en el corredor turístico principal de Punta Cana.' },
    vehicleCapacity: 15,
    ratePerVehicle: 120,
    order: 1,
  },
  {
    _id: 'transport-zone-bavaro',
    _type: 'transportationZone',
    name: { _type: 'localizedString', en: 'Bávaro Beach Area', es: 'Zona de Playa Bávaro' },
    description: { _type: 'localizedText', en: 'Hotels along the Bávaro beach strip, slightly closer to the venue.', es: 'Hoteles a lo largo de la franja de playa Bávaro, algo más cerca del venue.' },
    vehicleCapacity: 15,
    ratePerVehicle: 100,
    order: 2,
  },
  {
    _id: 'transport-zone-cap-cana',
    _type: 'transportationZone',
    name: { _type: 'localizedString', en: 'Cap Cana', es: 'Cap Cana' },
    description: { _type: 'localizedText', en: 'Luxury resort area south of Punta Cana, longer transfer required.', es: 'Área de resorts de lujo al sur de Punta Cana, traslado más largo requerido.' },
    vehicleCapacity: 15,
    ratePerVehicle: 160,
    order: 3,
  },
  {
    _id: 'transport-zone-santo-domingo',
    _type: 'transportationZone',
    name: { _type: 'localizedString', en: 'Santo Domingo / Remote', es: 'Santo Domingo / Remoto' },
    description: { _type: 'localizedText', en: 'Long-distance transfer from Santo Domingo or remote areas.', es: 'Traslado de larga distancia desde Santo Domingo o áreas remotas.' },
    vehicleCapacity: 15,
    ratePerVehicle: 300,
    order: 4,
  },
]

const entertainmentOptions = [
  {
    _id: 'ent-dj-5h',
    _type: 'entertainmentOption',
    name: { _type: 'localizedString', en: 'DJ (5 hours)', es: 'DJ (5 horas)' },
    description: { _type: 'localizedText', en: 'Professional DJ with full sound system, lighting, and MC service for 5 hours.', es: 'DJ profesional con sistema de sonido completo, iluminación y servicio de MC por 5 horas.' },
    cost: 1200,
    order: 1,
  },
  {
    _id: 'ent-dj-7h',
    _type: 'entertainmentOption',
    name: { _type: 'localizedString', en: 'DJ (7 hours)', es: 'DJ (7 horas)' },
    description: { _type: 'localizedText', en: 'Professional DJ with full sound system, lighting, and MC service for 7 hours.', es: 'DJ profesional con sistema de sonido completo, iluminación y servicio de MC por 7 horas.' },
    cost: 1600,
    order: 2,
  },
  {
    _id: 'ent-live-band',
    _type: 'entertainmentOption',
    name: { _type: 'localizedString', en: 'Live Band (3 hours)', es: 'Banda en Vivo (3 horas)' },
    description: { _type: 'localizedText', en: 'A 4-piece live band playing tropical, Latin, and pop favorites for 3 hours.', es: 'Banda de 4 piezas tocando favoritos tropicales, latinos y pop durante 3 horas.' },
    cost: 2500,
    order: 3,
  },
  {
    _id: 'ent-violinist',
    _type: 'entertainmentOption',
    name: { _type: 'localizedString', en: 'Violinist (ceremony + cocktail hour)', es: 'Violinista (ceremonia + cóctel)' },
    description: { _type: 'localizedText', en: 'A solo violinist performing classical and romantic pieces during ceremony and cocktail hour.', es: 'Un violinista solista interpretando piezas clásicas y románticas durante la ceremonia y el cóctel.' },
    cost: 400,
    order: 4,
  },
  {
    _id: 'ent-saxophonist',
    _type: 'entertainmentOption',
    name: { _type: 'localizedString', en: 'Saxophonist (cocktail hour)', es: 'Saxofonista (hora del cóctel)' },
    description: { _type: 'localizedText', en: 'A smooth jazz saxophonist performing during your cocktail hour.', es: 'Un saxofonista de smooth jazz tocando durante tu hora del cóctel.' },
    cost: 250,
    order: 5,
  },
  {
    _id: 'ent-mariachi',
    _type: 'entertainmentOption',
    name: { _type: 'localizedString', en: 'Mariachi (1 hour)', es: 'Mariachi (1 hora)' },
    description: { _type: 'localizedText', en: 'A full mariachi ensemble for 1 hour of festive, unforgettable entertainment.', es: 'Un conjunto mariachi completo por 1 hora de entretenimiento festivo e inolvidable.' },
    cost: 300,
    order: 6,
  },
  {
    _id: 'ent-mc',
    _type: 'entertainmentOption',
    name: { _type: 'localizedString', en: 'MC / Host Service', es: 'Servicio de MC / Animador' },
    description: { _type: 'localizedText', en: 'A bilingual MC to guide guests through the reception timeline with warmth and energy.', es: 'Un MC bilingüe para guiar a los invitados a través del programa de la recepción con calidez y energía.' },
    cost: 200,
    order: 7,
  },
  {
    _id: 'ent-photo-booth',
    _type: 'entertainmentOption',
    name: { _type: 'localizedString', en: 'Photo Booth (4 hours)', es: 'Cabina de Fotos (4 horas)' },
    description: { _type: 'localizedText', en: 'A fun photo booth with props and instant prints for 4 hours — guests love it.', es: 'Una divertida cabina de fotos con accesorios e impresiones instantáneas por 4 horas — los invitados la adoran.' },
    cost: 800,
    order: 8,
  },
]

const extraOptions = [
  {
    _id: 'extra-welcome-dinner',
    _type: 'extraOption',
    name: { _type: 'localizedString', en: 'Welcome Dinner (day before)', es: 'Cena de Bienvenida (día anterior)' },
    description: { _type: 'localizedText', en: 'An intimate dinner the night before the wedding to welcome arriving guests.', es: 'Una cena íntima la noche anterior a la boda para dar la bienvenida a los invitados que llegan.' },
    cost: 45,
    isPerPerson: true,
    order: 1,
  },
  {
    _id: 'extra-farewell-brunch',
    _type: 'extraOption',
    name: { _type: 'localizedString', en: 'Farewell Brunch (day after)', es: 'Brunch de Despedida (día después)' },
    description: { _type: 'localizedText', en: 'A relaxed morning brunch the day after the wedding before guests depart.', es: 'Un brunch matutino relajado al día siguiente de la boda antes de que los invitados partan.' },
    cost: 35,
    isPerPerson: true,
    order: 2,
  },
  {
    _id: 'extra-saona-trip',
    _type: 'extraOption',
    name: { _type: 'localizedString', en: 'Private Saona Island Trip (half-day)', es: 'Excursión Privada a la Isla Saona (medio día)' },
    description: { _type: 'localizedText', en: 'A private catamaran excursion to the legendary Saona Island — stunning beaches, snorkeling, and open bar.', es: 'Una excursión privada en catamarán a la legendaria Isla Saona — playas impresionantes, snorkel y barra libre.' },
    cost: 85,
    isPerPerson: true,
    order: 3,
  },
  {
    _id: 'extra-catamaran',
    _type: 'extraOption',
    name: { _type: 'localizedString', en: 'Private Catamaran Party (evening)', es: 'Fiesta Privada en Catamarán (noche)' },
    description: { _type: 'localizedText', en: 'Sunset sailing on a private catamaran with open bar, music, and Caribbean views.', es: 'Navegación al atardecer en catamarán privado con barra libre, música y vistas al Caribe.' },
    cost: 120,
    isPerPerson: true,
    order: 4,
  },
  {
    _id: 'extra-buggy',
    _type: 'extraOption',
    name: { _type: 'localizedString', en: 'Buggy Excursion (group tour)', es: 'Excursión en Buggy (tour grupal)' },
    description: { _type: 'localizedText', en: 'An off-road buggy adventure through the Punta Cana countryside — exciting and unforgettable.', es: 'Una aventura todo terreno en buggy por el campo de Punta Cana — emocionante e inolvidable.' },
    cost: 50,
    isPerPerson: true,
    order: 5,
  },
  {
    _id: 'extra-spa',
    _type: 'extraOption',
    name: { _type: 'localizedString', en: 'Spa Treatment at Hotel', es: 'Tratamiento de Spa en el Hotel' },
    description: { _type: 'localizedText', en: 'A relaxing spa session for guests at their hotel — a perfect gift before or after the wedding.', es: 'Una relajante sesión de spa para los invitados en su hotel — el regalo perfecto antes o después de la boda.' },
    cost: 35,
    isPerPerson: true,
    order: 6,
  },
]

async function seed() {
  console.log(`Seeding → ${projectId} / ${dataset}`)

  const [gl, hp, ap, hiw, pp, tos, cp] = await Promise.all([
    client.createOrReplace(generalLayout),
    client.createOrReplace(homePage),
    client.createOrReplace(aboutPage),
    client.createOrReplace(howItWorksPage),
    client.createOrReplace(privacyPolicy),
    client.createOrReplace(termsOfService),
    client.createOrReplace(contactPage),
  ])

  console.log(`✓ generalLayout seeded (id: ${gl._id})`)
  console.log(`✓ homePage seeded (id: ${hp._id})`)
  console.log(`✓ aboutPage seeded (id: ${ap._id})`)
  console.log(`✓ howItWorksPage seeded (id: ${hiw._id})`)
  console.log(`✓ privacyPolicy seeded (id: ${pp._id})`)
  console.log(`✓ termsOfService seeded (id: ${tos._id})`)
  console.log(`✓ contactPage seeded (id: ${cp._id})`)

  // Blog categories first
  const seededCategories = await Promise.all(
    blogCategories.map((cat) => client.createOrReplace(cat)),
  )
  seededCategories.forEach((cat) => console.log(`✓ blogCategory seeded: ${cat.title} (id: ${cat._id})`))

  // Blog articles
  const seededArticles = await Promise.all(
    blogArticles.map((article) => client.createOrReplace(article)),
  )
  seededArticles.forEach((a) =>
    console.log(`✓ blogArticle seeded: [${(a as { language?: string }).language?.toUpperCase()}] ${(a as { title?: string }).title} (id: ${a._id})`),
  )

  console.log(`\n✓ Blog seed complete: ${seededCategories.length} categories, ${seededArticles.length} articles`)

  // Page SEO
  const seededSeo = await Promise.all(
    pageSeoDocuments.map((doc) => client.createOrReplace(doc)),
  )
  seededSeo.forEach((doc) =>
    console.log(`✓ pageSeo seeded: ${(doc as { pageName?: string }).pageName} (id: ${doc._id})`),
  )
  console.log(`\n✓ SEO seed complete: ${seededSeo.length} pages`)

  // Wedding stories
  const seededStories = await Promise.all(
    weddingStories.map((story) => client.createOrReplace(story)),
  )
  seededStories.forEach((s) =>
    console.log(`✓ weddingStory seeded: ${(s as { coupleName?: { en?: string } }).coupleName?.en} (id: ${s._id})`),
  )
  console.log(`\n✓ Stories seed complete: ${seededStories.length} stories`)

  // Calculator config (singleton)
  const calcConfig = await client.createOrReplace(calculatorConfigDoc)
  console.log(`✓ calculatorConfig seeded (id: ${calcConfig._id})`)

  // Calculator pricing collections
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allPricingDocs: any[] = [
    ...menuOptions,
    ...barPackages,
    ...furnitureOptions,
    ...decorPackages,
    ...photoPackages,
    ...videoPackages,
    ...transportationZones,
    ...entertainmentOptions,
    ...extraOptions,
  ]
  const seededPricing = await Promise.all(
    allPricingDocs.map((doc) => client.createOrReplace(doc)),
  )
  seededPricing.forEach((doc) =>
    console.log(`✓ ${(doc as { _type?: string })._type} seeded: ${doc._id}`),
  )
  console.log(`\n✓ Calculator pricing seed complete: ${seededPricing.length} documents`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
