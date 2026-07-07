export interface TranslationItem {
  nav: {
    features: string;
    how: string;
    faq: string;
    cta: string;
    skip: string;
  };
  hero: {
    badge: string;
    title: string;
    lead: string;
    scarcity: string;
    savedThisWeek: string;
    joinedWaitlist: string;
    live: string;
    averageWeightReduction: string;
    imagesOptimized: string;
    avifOutput: string;
    altTextCoverage: string;
    originalsLost: string;
    hoursSaved: string;
  };
  form: {
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    consent: string;
    note: string;
  };
  trust: {
    noCreditCard: string;
    rollback: string;
    builtForWp: string;
  };
  strip: string[];
  features: {
    eyebrow: string;
    title: string;
    sub: string;
    items: {
      icon: string;
      title: string;
      desc: string;
    }[];
  };
  how: {
    eyebrow: string;
    title: string;
    steps: {
      number: string;
      title: string;
      desc: string;
    }[];
  };
  roi: {
    reduction: string;
    reductionDesc: string;
    hours: string;
    hoursDesc: string;
    coverage: string;
    coverageDesc: string;
    lost: string;
    lostDesc: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  ctaSection: {
    title: string;
    sub: string;
    btn: string;
  };
  footer: {
    tag: string;
    rights: string;
  };
  founder: {
    eyebrow: string;
    title: string;
    body: string;
    signature: string;
  };
  screenshots: {
    eyebrow: string;
    title: string;
    sub: string;
    captions: string[];
    placeholder: string;
  };
  msg: {
    invalidEmail: string;
    consent: string;
    sending: string;
    success: string;
    error: string;
    throttled: string;
    preview: string;
  };
}

export const translations: Record<'en' | 'es', TranslationItem> = {
  en: {
    nav: {
      features: "Features",
      how: "How it works",
      faq: "FAQ",
      cta: "Join waitlist",
      skip: "Skip to the waitlist"
    },
    hero: {
      badge: "Pre-launch · Founding access",
      title: "Optimize your WordPress images for speed and SEO — automatically.",
      lead: "Heavy images and missing alt texts are quietly killing your Google rankings. FasterFy installs in minutes, scans your library, and automatically converts, compresses, and writes AI semantic alt text for all your media. Stop doing manual work. Secure your lifetime founding discount today.",
      scarcity: "⏱️ Limited founding spots available. Lock in our lowest price forever before we launch.",
      savedThisWeek: "Saved this week",
      joinedWaitlist: "Joined the waitlist",
      live: "Live",
      averageWeightReduction: "Average weight reduction",
      imagesOptimized: "Images optimized",
      avifOutput: "AVIF output",
      altTextCoverage: "Alt text coverage",
      originalsLost: "Originals lost",
      hoursSaved: "hours saved"
    },
    form: {
      emailLabel: "Work email",
      emailPlaceholder: "you@yourcompany.com",
      submit: "Reserve my founding spot",
      consent: "I agree to receive launch updates. No spam — unsubscribe anytime.",
      note: "Founding members lock in our lowest price, forever — before we open to everyone."
    },
    trust: {
      noCreditCard: "🔒 No credit card required.",
      rollback: "↩️ Non-destructive · 1-click rollback",
      builtForWp: "⚡ Active in 2 minutes."
    },
    strip: [
      "WebP & AVIF",
      "AI Alt Text & SEO",
      "Bulk gallery processing",
      "Smart compression",
      "Auto semantic rename",
      "SVG sanitization"
    ],
    features: {
      eyebrow: "What you get",
      title: "Real work, done for you",
      sub: "Every feature is built to save time and lift performance — measurable wins, not busywork.",
      items: [
        {
          icon: "⚡",
          title: "Goodbye slow loading (WebP & AVIF)",
          desc: "Automatically convert your gallery to next-gen formats. Get your Core Web Vitals into the green instantly."
        },
        {
          icon: "🤖",
          title: "Goodbye heavy manual work (AI Alt Text)",
          desc: "Multimodal vision writes accurate, SEO-friendly alt texts and titles without you moving a finger."
        },
        {
          icon: "🗂️",
          title: "Your entire library with a single click",
          desc: "Bulk process 100 or 10,000 images securely in browser-driven background batches."
        },
        {
          icon: "✏️",
          title: "Goodbye weird filenames (Semantic Rename)",
          desc: "Automatically turn \"IMG_9482.jpg\" into descriptive, keyword-rich filenames Google loves."
        },
        {
          icon: "↩️",
          title: "Zero risks (1-click Rollback)",
          desc: "Full backup of originals. Restore any asset instantly if you change your mind."
        },
        {
          icon: "🛡️",
          title: "Security built in",
          desc: "SVG sanitization strips malicious scripts, and optional NSFW moderation protects your AI usage and brand."
        }
      ]
    },
    how: {
      eyebrow: "How it works",
      title: "Live in minutes, not days",
      steps: [
        {
          number: "01",
          title: "Install & connect",
          desc: "Activate the plugin on WordPress. No build tools, no servers to manage."
        },
        {
          number: "02",
          title: "Scan your library",
          desc: "FasterFy finds every image and shows exactly what can be optimized — retroactively."
        },
        {
          number: "03",
          title: "Optimize in bulk",
          desc: "Run a batch and watch weight drop and SEO coverage climb. Roll back anytime."
        }
      ]
    },
    roi: {
      reduction: "73%",
      reductionDesc: "Lighter images on average",
      hours: "12.4 hrs",
      hoursDesc: "Saved every week vs. manual work",
      coverage: "100%",
      coverageDesc: "Alt text coverage for SEO",
      lost: "0",
      lostDesc: "Originals ever lost"
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "Will it touch my original files?",
          answer: "Never destructively. FasterFy backs up every original before any change, and you can restore any image with one click."
        },
        {
          question: "Do I need AI to use it?",
          answer: "No. Technical optimization (WebP/AVIF, compression, SVG) works on its own. AI alt text and SEO are optional add-ons."
        },
        {
          question: "Will it work on my host?",
          answer: "Yes. Bulk processing runs in safe, browser-driven batches, so it works reliably even on shared hosting."
        },
        {
          question: "When does it launch?",
          answer: "We're in pre-launch. Join the waitlist and you'll be first to get access — plus founding-member pricing."
        },
        {
          question: "Is my data safe?",
          answer: "API keys are encrypted at rest, SVGs are sanitized, and sensitive images are never sent to AI when moderation is on."
        }
      ]
    },
    ctaSection: {
      title: "Be first when FasterFy launches",
      sub: "Join the waitlist for early access and founding-member pricing.",
      btn: "Join the waitlist"
    },
    footer: {
      tag: "AI media optimization for WordPress.",
      rights: "All rights reserved."
    },
    founder: {
      eyebrow: "From the maker",
      title: "Why I'm building FasterFy",
      body: "I got tired of paying for bloated plugins and still writing alt text by hand. FasterFy is the tool I always wanted — it does the boring media work for you, safely, and never touches your originals. I'm building it now and shipping soon. Join the waitlist and you'll help shape what comes next.",
      signature: "— The FasterFy founder"
    },
    screenshots: {
      eyebrow: "A peek inside",
      title: "A first look at the plugin",
      sub: "A look at the FasterFy dashboard. We'll add more real screens as we get closer to launch.",
      captions: [
        "Bulk-optimize your whole media library",
        "AI writes alt text, titles and descriptions",
        "One-click, non-destructive rollback"
      ],
      placeholder: "Screenshot coming soon"
    },
    msg: {
      invalidEmail: "Please enter a valid email address.",
      consent: "Please accept to continue.",
      sending: "Sending...",
      success: "You're on the list! Check your inbox to confirm.",
      error: "Something went wrong. Please try again.",
      throttled: "Too many attempts. Please try again later.",
      preview: "Static preview — the form is simulated (no data is sent or stored)."
    }
  },
  es: {
    nav: {
      features: "Funciones",
      how: "Cómo funciona",
      faq: "Preguntas",
      cta: "Unirme a la lista",
      skip: "Saltar a la lista de espera"
    },
    hero: {
      badge: "Prelanzamiento · Acceso fundador",
      title: "Optimiza la velocidad y el SEO de tus imágenes en WordPress.",
      lead: "Las imágenes pesadas y la falta de textos alt están hundiendo tu posicionamiento en Google. FasterFy un plugin que se instala en segundos, escanea tu biblioteca y convierte, comprime y redacta el alt text de forma AUTOMÁTICA.",
      scarcity: "⏱️ Plazas de fundador limitadas. Asegura el precio más bajo para siempre antes del lanzamiento.",
      savedThisWeek: "Ahorrado esta semana",
      joinedWaitlist: "En la lista de espera",
      live: "En vivo",
      averageWeightReduction: "Reducción de peso promedio",
      imagesOptimized: "Imágenes optimizadas",
      avifOutput: "salida AVIF",
      altTextCoverage: "Cobertura de alt text",
      originalsLost: "Originales perdidos",
      hoursSaved: "horas ahorradas"
    },
    form: {
      emailLabel: "Correo de trabajo",
      emailPlaceholder: "tu@tuempresa.com",
      submit: "Reservar mi lugar fundador",
      consent: "Acepto recibir novedades del lanzamiento. Sin spam — cancela cuando quieras.",
      note: "Los miembros fundadores conservan nuestro precio más bajo, para siempre — antes de abrir a todo el mundo."
    },
    trust: {
      noCreditCard: "🔒 Sin tarjeta de crédito.",
      rollback: "↩️ No destructivo · reversión en 1 clic",
      builtForWp: "⚡ Activo en 2 minutos."
    },
    strip: [
      "WebP y AVIF",
      "Alt Text con IA y SEO",
      "Procesamiento masivo",
      "Compresión inteligente",
      "Renombrado semántico automático",
      "Sanitización de SVG"
    ],
    features: {
      eyebrow: "Beneficio real",
      title: "Ahorra tiempo valioso",
      sub: "Cada función está hecha para optimizar tus recursos y hacer prácticamente todo de forma automática.",
      items: [
        {
          icon: "⚡",
          title: "Formatos de última generación",
          desc: "Convierte automáticamente tu galería a formatos de última generación. Core Web Vitals en verde al instante."
        },
        {
          icon: "🤖",
          title: "Adiós al trabajo manual pesado",
          desc: "La visión multimodal redacta alt text y títulos precisos y amigables con el SEO sin que muevas un dedo."
        },
        {
          icon: "🗂️",
          title: "Toda tu biblioteca con un solo botón",
          desc: "Procesa lotes de 100 o 10,000 imágenes de forma segura en segundo plano desde el navegador."
        },
        {
          icon: "✏️",
          title: "Adiós a los renombres raros",
          desc: "Convierte automáticamente \"IMG_9482.jpg\" en nombres descriptivos y ricos en palabras clave que a Google le encantan."
        },
        {
          icon: "↩️",
          title: "Cero riesgos (Reversión en 1 clic)",
          desc: "Respaldo total de los originales. Restaura cualquier archivo al instante si cambias de opinión."
        },
        {
          icon: "🛡️",
          title: "Seguridad incorporada",
          desc: "La sanitización de SVG elimina scripts maliciosos y la moderación opcional NSFW protege tu marca y uso de la IA."
        }
      ]
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Operativo en minutos, no en días",
      steps: [
        {
          number: "01",
          title: "Instala y conecta",
          desc: "Activa el plugin en WordPress. Sin herramientas de compilación ni servidores que administrar."
        },
        {
          number: "02",
          title: "Escanea tu biblioteca",
          desc: "FasterFy encuentra cada imagen y muestra exactamente qué se puede optimizar — de forma retroactiva."
        },
        {
          number: "03",
          title: "Optimiza en masa",
          desc: "Ejecuta un lote y mira cómo baja el peso y sube la cobertura SEO. Revierte cuando quieras."
        }
      ]
    },
    roi: {
      reduction: "73%",
      reductionDesc: "Imágenes más livianas en promedio",
      hours: "12.4 hrs",
      hoursDesc: "Ahorradas cada semana vs. trabajo manual",
      coverage: "100%",
      coverageDesc: "Cobertura de alt text para SEO",
      lost: "Cero",
      lostDesc: "Originales perdidos, nunca"
    },
    faq: {
      eyebrow: "Preguntas",
      title: "Preguntas, respondidas",
      items: [
        {
          question: "¿Toca mis archivos originales?",
          answer: "Nunca de forma destructiva. FasterFy respalda cada original antes de cualquier cambio y puedes restaurar cualquier imagen con un clic."
        },
        {
          question: "¿Necesito IA para usarlo?",
          answer: "No. La optimización técnica (WebP/AVIF, compresión, SVG) funciona por sí sola. El alt text con IA y el SEO son complementos opcionales."
        },
        {
          question: "¿Funcionará en mi hosting?",
          answer: "Sí. El procesamiento masivo se ejecuta en lotes seguros conducidos por el navegador, así que funciona de forma fiable incluso en hosting compartido."
        },
        {
          question: "¿Cuándo se lanza?",
          answer: "Estamos en prelanzamiento. Únete a la lista y serás de los primeros en obtener acceso — además del precio de miembro fundador."
        },
        {
          question: "¿Están seguros mis datos?",
          answer: "Las claves de API se cifran en reposo, los SVG se sanitizan y las imágenes sensibles nunca se envían a la IA cuando la moderación está activa."
        }
      ]
    },
    ctaSection: {
      title: "Sé el primero cuando FasterFy se lance",
      sub: "Únete a la lista para acceso anticipado y precio de miembro fundador.",
      btn: "Unirme a la lista"
    },
    footer: {
      tag: "Optimización de medios con IA para WordPress.",
      rights: "Todos los derechos reservados."
    },
    founder: {
      eyebrow: "Del creador",
      title: "Por qué estoy creando FasterFy",
      body: "Me cansé de pagar por plugins pesados y aun así escribir el alt text a mano. FasterFy es la herramienta que siempre quise: hace el trabajo aburrido de tus medios por ti, de forma segura, y nunca toca tus originales. Lo estoy construyendo ahora y sale muy pronto. Únete a la lista de espera y ayúdame a decidir lo que viene.",
      signature: "— El fundador de FasterFy"
    },
    screenshots: {
      eyebrow: "Un vistazo dentro",
      title: "Primer vistazo al plugin",
      sub: "Un vistazo al panel de FasterFy. Iremos añadiendo más pantallas reales a medida que se acerque el lanzamiento.",
      captions: [
        "Optimiza en masa toda tu biblioteca de medios",
        "La IA redacta alt text, títulos y descripciones",
        "Reversión no destructiva en un clic"
      ],
      placeholder: "Captura próximamente"
    },
    msg: {
      invalidEmail: "Introduce una dirección de correo válida.",
      consent: "Acepta para continuar.",
      sending: "Enviando...",
      success: "¡Estás en la lista! Revisa tu correo para confirmar.",
      error: "Algo salió mal. Inténtalo de nuevo.",
      throttled: "Demasiados intentos. Inténtalo más tarde.",
      preview: "Vista previa estática — el formulario es simulado (no se envía ni guarda ningún dato)."
    }
  }
};
