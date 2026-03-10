export const clientData = {
  locale: ['de', 'en', 'fr'], // Supported locales
  defaultLocale: 'de',
  branding: {
    name: "Luxury Estates Zug",
    colors: {
      useManual: true,
      palette: ["#1a1a1a", "#d4af37", "#f5f5f5", "#000000", "rgba(255,255,255,0.1)"]
    },
    typography: {
      heading: "Playfair Display",
      body: "Inter"
    }
  },
  content: {
    hero: {
      de: { title: "Exklusive Immobilien", subtitle: "Diskretion trifft auf Exzellenz" },
      en: { title: "Exclusive Properties", subtitle: "Discretion meets Excellence" },
      fr: { title: "Propriétés Exclusives", subtitle: "La discrétion rencontre l'excellence" }
    },
    about: {
      de: "Unsere Geschichte beginnt in den Alpen...",
      en: "Our story begins in the Alps...",
      fr: "Notre histoire commence dans les Alpes..."
    },
    features: ["Off-Market", "Tailored", "Discreet"],
    testimonials: [
      {
        id: "t1",
        author: "Markus F.",
        rating: 5,
        text: {
          de: "Hervorragende und absolut diskrete Abwicklung. Das Team hat uns Zugang zu exklusiven Off-Market Objekten verschafft.",
          en: "Excellent and absolutely discreet handling. The team gave us access to exclusive off-market properties.",
          fr: "Une gestion excellente et absolument discrète. L'équipe nous a donné accès à des propriétés exclusives hors marché."
        },
        date: "2025-10-15"
      },
      {
        id: "t2",
        author: "Sophie von W.",
        rating: 5,
        text: {
          de: "Die Kombination aus Diskretion und erstklassigem Netzwerk in der Zentralschweiz ist einzigartig. Sehr empfehlenswert.",
          en: "The combination of discretion and a first-class network in Central Switzerland is unique. Highly recommended.",
          fr: "La combinaison de la discrétion et d'un réseau de premier ordre en Suisse centrale est unique. Fortement recommandé."
        },
        date: "2025-11-02"
      },
      {
        id: "t3",
        author: "Dr. L. Weber",
        rating: 5,
        text: {
          de: "Wir haben unsere Traumvilla am Zugersee durch Luxury Estates gefunden. Ein Service, der weit über das Übliche hinausgeht.",
          en: "We found our dream villa on Lake Zug through Luxury Estates. A service that goes far beyond the usual.",
          fr: "Nous avons trouvé notre villa de rêve sur le lac de Zoug grâce à Luxury Estates. Un service qui va bien au-delà de l'habituel."
        },
        date: "2026-01-20"
      }
    ]
  },
  contact: {
    email: "contact@luxuryestates-zug.ch",
    phone: "+41 41 000 00 00", // Telefone fictício para representação
    whatsapp: "+41 41 000 00 00",
    waMessage: "Grüezi! I am interested in your off-market properties in Zug.",
    googleMaps: "https://goo.gl/maps/",
    instagram: "https://instagram.com/luxuryestateszug",
    linkedin: "https://linkedin.com/company/luxuryestateszug",
    facebook: "https://facebook.com/luxuryestateszug"
  }
};
