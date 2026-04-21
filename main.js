/* =========================================================
   EcoClima Barcelona — Main JS
   - i18n (ES / EN)
   - A/B/C copy variants (hero/CTA)
   - Sticky header + scroll state
   - Mobile menu
   - Reveal-on-scroll animations
   - Contact form validation + submission
   - Chatbot (rule-based conversational assistant)
   ========================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------
     1. A/B/C COPY VARIANTS
     Change `ACTIVE_AB` to 'A' | 'B' | 'C' to switch hero copy.
     You can also pass ?ab=B in the URL to override at runtime.
  ----------------------------------------------------------- */
  var ACTIVE_AB = 'A'; // default = price + urgency
  var urlAB = new URLSearchParams(location.search).get('ab');
  if (urlAB && ['A', 'B', 'C'].indexOf(urlAB.toUpperCase()) !== -1) {
    ACTIVE_AB = urlAB.toUpperCase();
  }
  document.documentElement.setAttribute('data-ab', ACTIVE_AB);

  var AB_COPY = {
    es: {
      A: { // price + urgency
        'hero.badge':    '⚡ Oferta válida solo esta semana',
        'hero.title':    'Aire acondicionado en Barcelona <span class="text-gradient">desde 390€</span>',
        'hero.subtitle': 'Instalación profesional en 48h. Presupuesto gratis en 24h. Garantía oficial 2 años.',
        'hero.cta1':     'Calcular mi precio',
        'hero.cta2':     '<span aria-hidden="true">💬</span> WhatsApp'
      },
      B: { // trust
        'hero.badge':    '⭐ +1.200 clientes satisfechos en Barcelona',
        'hero.title':    'Técnicos oficiales con <span class="text-gradient">10 años</span> de experiencia',
        'hero.subtitle': 'Instalación certificada, garantía oficial y soporte real. Sin sorpresas.',
        'hero.cta1':     'Solicitar presupuesto',
        'hero.cta2':     '<span aria-hidden="true">💬</span> WhatsApp'
      },
      C: { // eco
        'hero.badge':    '🌿 Climatización eco-eficiente',
        'hero.title':    'Reduce tu factura hasta un <span class="text-gradient">45%</span> con aire eco',
        'hero.subtitle': 'Equipos A+++, refrigerantes limpios y consumo inteligente para tu hogar.',
        'hero.cta1':     'Calcular mi ahorro',
        'hero.cta2':     '<span aria-hidden="true">🌿</span> Quiero ahorrar'
      }
    },
    en: {
      A: {
        'hero.badge':    '⚡ Offer valid this week only',
        'hero.title':    'Air conditioning in Barcelona <span class="text-gradient">from €390</span>',
        'hero.subtitle': 'Professional installation in 48h. Free quote in 24h. 2-year warranty.',
        'hero.cta1':     'Calculate my price',
        'hero.cta2':     '<span aria-hidden="true">💬</span> WhatsApp'
      },
      B: {
        'hero.badge':    '⭐ +1,200 happy clients in Barcelona',
        'hero.title':    'Certified technicians with <span class="text-gradient">10 years</span> of experience',
        'hero.subtitle': 'Certified installation, official warranty and real support. No surprises.',
        'hero.cta1':     'Request a quote',
        'hero.cta2':     '<span aria-hidden="true">💬</span> WhatsApp'
      },
      C: {
        'hero.badge':    '🌿 Eco-efficient climate control',
        'hero.title':    'Cut your bill up to <span class="text-gradient">45%</span> with eco AC',
        'hero.subtitle': 'A+++ units, clean refrigerants and smart consumption for your home.',
        'hero.cta1':     'Calculate my savings',
        'hero.cta2':     '<span aria-hidden="true">🌿</span> I want to save'
      }
    }
  };

  /* -----------------------------------------------------------
     2. I18N DICTIONARIES
  ----------------------------------------------------------- */
  var DICT = {
    es: {
      'meta.title':       'EcoClima Barcelona | Instalación y mantenimiento de aire acondicionado',
      'meta.description': 'Instalación, reparación y mantenimiento de aire acondicionado en Barcelona. Presupuesto gratis en 24h. Eficiencia energética y garantía 2 años.',

      'nav.benefits': 'Ventajas',
      'nav.services': 'Servicios',
      'nav.process':  'Cómo trabajamos',
      'nav.calculator': 'Calculadora',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contacto',
      'header.call': '<span aria-hidden="true">📞</span> 637 575 000',

      'hero.trust1': '+1.200 instalaciones',
      'hero.trust2': 'Garantía 2 años',
      'hero.trust3': 'Técnicos certificados',
      'hero.card.title': 'Ahorro energético real',
      'hero.card.stat1': 'en consumo eléctrico',
      'hero.card.stat2': 'clase energética',
      'hero.card.stat3': 'respuesta garantizada',
      'hero.card.eco':   '🌿 Eco-friendly',

      'ventajas.eyebrow': 'Ventajas',
      'ventajas.title':   '¿Por qué elegir EcoClima?',
      'ventajas.lead':    'Tecnología eficiente, precios claros y técnicos oficiales. Sin sorpresas.',
      'ventajas.1.title': 'Instalación en 48h',
      'ventajas.1.text':  'Respuesta y montaje rápidos sin comprometer la calidad del trabajo.',
      'ventajas.2.title': 'Garantía 2 años',
      'ventajas.2.text':  'Cubrimos instalación y equipo con garantía oficial del fabricante.',
      'ventajas.3.title': 'Eficiencia A+++',
      'ventajas.3.text':  'Equipos de última generación que reducen tu factura hasta un 45%.',
      'ventajas.4.title': 'Precio cerrado',
      'ventajas.4.text':  'Presupuesto detallado, sin costes ocultos ni sorpresas al final.',

      'cta1.title': '¿Necesitas presupuesto hoy?',
      'cta1.text':  'Respondemos en menos de 1 hora en horario laboral.',
      'cta1.btn':   'Hablar ahora',

      'servicios.eyebrow': 'Servicios',
      'servicios.title':   'Soluciones completas de climatización',
      'servicios.lead':    'Desde la primera visita hasta el mantenimiento anual.',
      'servicios.more':    'Ver precios →',
      'servicios.1.title': 'Instalación',
      'servicios.1.text':  'Split, multi-split y conductos. Equipos Daikin, Mitsubishi, LG.',
      'servicios.2.title': 'Mantenimiento',
      'servicios.2.text':  'Revisión anual, limpieza de filtros y optimización energética.',
      'servicios.3.title': 'Reparación urgente',
      'servicios.3.text':  'Diagnóstico gratuito y reparación en el día siempre que sea posible.',

      'proceso.eyebrow': 'Proceso',
      'proceso.title':   'Cómo trabajamos',
      'proceso.lead':    'Simple, rápido y transparente. 4 pasos.',
      'proceso.1.title': 'Contacto',
      'proceso.1.text':  'Nos escribes por WhatsApp, formulario o teléfono.',
      'proceso.2.title': 'Visita técnica',
      'proceso.2.text':  'Gratis y sin compromiso en 24h hábiles.',
      'proceso.3.title': 'Presupuesto',
      'proceso.3.text':  'Precio cerrado, con materiales y garantía incluidos.',
      'proceso.4.title': 'Instalación',
      'proceso.4.text':  'Montaje limpio y puesta en marcha en el mismo día.',

      'calc.eyebrow':  'Calculadora',
      'calc.title':    'Calcula tu presupuesto al instante',
      'calc.lead':     'Responde 4 preguntas y recibe un precio estimado en segundos.',
      'calc.service':  'Tipo de servicio',
      'calc.service.install':      'Instalación',
      'calc.service.maintenance':  'Mantenimiento',
      'calc.service.repair':       'Reparación',
      'calc.housing':  'Tipo de vivienda',
      'calc.housing.flat':        'Piso',
      'calc.housing.penthouse':   'Ático',
      'calc.housing.house':       'Casa / chalet',
      'calc.housing.business':    'Local comercial',
      'calc.units':    'Número de equipos',
      'calc.access':   'Accesibilidad',
      'calc.access.easy':     'Fácil (planta baja / terraza)',
      'calc.access.medium':   'Media (balcón / patio)',
      'calc.access.hard':     'Difícil (fachada / andamio)',
      'calc.result':   'Precio estimado:',
      'calc.request':  'Solicitar este precio',
      'calc.note':     '* Precio orientativo, confirmado tras visita gratuita.',

      'test.eyebrow': 'Opiniones',
      'test.title':   'Clientes que ya confían en nosotros',
      'test.lead':    'basado en +320 reseñas en Google',
      'test.1.text':  '"Llegaron a la hora, trabajaron limpio y me ahorran un 40% en la factura. Recomendados 100%."',
      'test.2.text':  '"Presupuesto claro, sin letra pequeña. Instalación impecable en un día."',
      'test.3.text':  '"Muy profesionales. Resolvieron una avería que otros no supieron arreglar."',

      'faq.eyebrow': 'FAQ',
      'faq.title':   'Preguntas frecuentes',
      'faq.1.q': '¿Cuánto cuesta una instalación de aire acondicionado?',
      'faq.1.a': 'Desde 390€ para un split 1x1 incluyendo materiales estándar. Usa la calculadora para un precio personalizado.',
      'faq.2.q': '¿Cuánto tarda la instalación?',
      'faq.2.a': 'Entre 3 y 6 horas para un equipo estándar. Casos complejos se programan con antelación.',
      'faq.3.q': '¿Dónde trabajáis?',
      'faq.3.a': 'En toda Barcelona ciudad y área metropolitana: Badalona, L\'Hospitalet, Sant Cugat, Cornellà y más.',
      'faq.4.q': '¿Qué garantía ofrecéis?',
      'faq.4.a': '2 años de garantía en instalación y la garantía oficial del fabricante del equipo.',
      'faq.5.q': '¿Aceptáis pago fraccionado?',
      'faq.5.a': 'Sí, financiación hasta 24 meses sin intereses con aprobación previa.',

      'ctaFinal.title': 'Solicita tu presupuesto gratis hoy',
      'ctaFinal.text':  'Sin compromiso · Respuesta en 24h · Garantía 2 años',

      'areas.title': 'Trabajamos en toda Barcelona',

      'contacto.eyebrow': 'Contacto',
      'contacto.title':   'Contáctanos',
      'contacto.lead':    'Elige el canal que prefieras, respondemos enseguida.',
      'contacto.phone':   'Lun–Sáb · 08:00–20:00',
      'contacto.wa':      'Respuesta en minutos',
      'contacto.mail':    'Respuesta en 24h',

      'trust.guarantee': 'Garantía 2 años',
      'trust.rating':    '4,9 en Google',
      'trust.eco':       'Eco-friendly',

      'form.name':    'Nombre',
      'form.phone':   'Teléfono',
      'form.message': 'Mensaje',
      'form.consent': 'Acepto la política de privacidad.',
      'form.submit':  'Enviar solicitud',
      'form.success': '✓ ¡Gracias! Te contactaremos en las próximas horas.',
      'form.error':   'Revisa los campos requeridos.',

      'footer.tagline':  'Climatización eco-eficiente en Barcelona desde 2015.',
      'footer.services': 'Servicios',
      'footer.company':  'Empresa',
      'footer.contact':  'Contacto',
      'footer.rights':   'Todos los derechos reservados.',
      'footer.map.title':'📍 Nos encontramos en Barcelona',
      'footer.map.text': 'Cobertura en toda la ciudad y área metropolitana. Visita gratuita a domicilio.',
      'footer.map.cta':  'Abrir en Google Maps ↗',

      'chatbot.open':     'Chat',
      'chatbot.title':    'EcoBot',
      'chatbot.subtitle': 'Normalmente responde en 1 min',
      'chatbot.welcome':  '¡Hola! 👋 Soy EcoBot. ¿En qué puedo ayudarte hoy?',
      'chatbot.q.price':  'Quiero un presupuesto',
      'chatbot.q.time':   '¿Cuánto tarda?',
      'chatbot.q.area':   '¿Dónde trabajáis?',
      'chatbot.q.human':  'Hablar con persona',
      'chatbot.a.price':  'Puedes usar nuestra calculadora para un precio al instante, o enviarme el m² y el número de equipos y te contesto enseguida.',
      'chatbot.a.time':   'Normalmente instalamos en 48h hábiles. Mantenimiento y reparación suelen ser el mismo día.',
      'chatbot.a.area':   'Trabajamos en toda Barcelona y área metropolitana (Badalona, L\'Hospitalet, Sant Cugat, Cornellà, etc.).',
      'chatbot.a.human':  'Te paso con un técnico por WhatsApp: https://wa.me/34637575000',
      'chatbot.a.default':'¡Buena pregunta! Déjame tu teléfono y un técnico te llamará, o escríbenos por WhatsApp: https://wa.me/34637575000'
    },

    en: {
      'meta.title':       'EcoClima Barcelona | AC Installation & Maintenance',
      'meta.description': 'AC installation, repair and maintenance in Barcelona. Free quote in 24h. Energy-efficient units and 2-year warranty.',

      'nav.benefits': 'Benefits',
      'nav.services': 'Services',
      'nav.process':  'How we work',
      'nav.calculator': 'Calculator',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'header.call': '<span aria-hidden="true">📞</span> 637 575 000',

      'hero.trust1': '+1,200 installations',
      'hero.trust2': '2-year warranty',
      'hero.trust3': 'Certified technicians',
      'hero.card.title': 'Real energy savings',
      'hero.card.stat1': 'in electricity use',
      'hero.card.stat2': 'energy class',
      'hero.card.stat3': 'guaranteed response',
      'hero.card.eco':   '🌿 Eco-friendly',

      'ventajas.eyebrow': 'Benefits',
      'ventajas.title':   'Why choose EcoClima?',
      'ventajas.lead':    'Efficient tech, clear prices and certified technicians. No surprises.',
      'ventajas.1.title': 'Install in 48h',
      'ventajas.1.text':  'Fast response and installation without compromising quality.',
      'ventajas.2.title': '2-year warranty',
      'ventajas.2.text':  'We cover installation and equipment with the official manufacturer warranty.',
      'ventajas.3.title': 'A+++ efficiency',
      'ventajas.3.text':  'Latest-gen units that cut your bill by up to 45%.',
      'ventajas.4.title': 'Fixed price',
      'ventajas.4.text':  'Detailed quote with no hidden costs or last-minute surprises.',

      'cta1.title': 'Need a quote today?',
      'cta1.text':  'We reply in under 1 hour during business hours.',
      'cta1.btn':   'Chat now',

      'servicios.eyebrow': 'Services',
      'servicios.title':   'End-to-end climate solutions',
      'servicios.lead':    'From first visit to annual maintenance.',
      'servicios.more':    'See prices →',
      'servicios.1.title': 'Installation',
      'servicios.1.text':  'Split, multi-split and ducted. Daikin, Mitsubishi, LG.',
      'servicios.2.title': 'Maintenance',
      'servicios.2.text':  'Annual check-up, filter cleaning and energy tuning.',
      'servicios.3.title': 'Urgent repair',
      'servicios.3.text':  'Free diagnosis and same-day repair whenever possible.',

      'proceso.eyebrow': 'Process',
      'proceso.title':   'How we work',
      'proceso.lead':    'Simple, fast and transparent. 4 steps.',
      'proceso.1.title': 'Contact',
      'proceso.1.text':  'Reach out via WhatsApp, form or phone.',
      'proceso.2.title': 'Technical visit',
      'proceso.2.text':  'Free and without obligation, within 24 business hours.',
      'proceso.3.title': 'Quote',
      'proceso.3.text':  'Fixed price, materials and warranty included.',
      'proceso.4.title': 'Installation',
      'proceso.4.text':  'Clean installation and commissioning on the same day.',

      'calc.eyebrow':  'Calculator',
      'calc.title':    'Get an instant quote',
      'calc.lead':     'Answer 4 questions and get an estimate in seconds.',
      'calc.service':  'Service type',
      'calc.service.install':      'Installation',
      'calc.service.maintenance':  'Maintenance',
      'calc.service.repair':       'Repair',
      'calc.housing':  'Property type',
      'calc.housing.flat':        'Flat',
      'calc.housing.penthouse':   'Penthouse',
      'calc.housing.house':       'House / villa',
      'calc.housing.business':    'Commercial space',
      'calc.units':    'Number of units',
      'calc.access':   'Accessibility',
      'calc.access.easy':     'Easy (ground floor / terrace)',
      'calc.access.medium':   'Medium (balcony / patio)',
      'calc.access.hard':     'Hard (facade / scaffolding)',
      'calc.result':   'Estimated price:',
      'calc.request':  'Request this price',
      'calc.note':     '* Indicative price, confirmed after free visit.',

      'test.eyebrow': 'Reviews',
      'test.title':   'Clients who trust us',
      'test.lead':    'based on +320 Google reviews',
      'test.1.text':  '"On time, clean work and my bill dropped 40%. Highly recommended."',
      'test.2.text':  '"Clear quote, no small print. Flawless install in one day."',
      'test.3.text':  '"Very professional. They fixed a fault others could not."',

      'faq.eyebrow': 'FAQ',
      'faq.title':   'Frequently asked questions',
      'faq.1.q': 'How much does an AC installation cost?',
      'faq.1.a': 'From €390 for a 1x1 split with standard materials. Use the calculator for a custom price.',
      'faq.2.q': 'How long does the install take?',
      'faq.2.a': 'Between 3 and 6 hours for a standard unit. Complex cases are scheduled in advance.',
      'faq.3.q': 'Where do you work?',
      'faq.3.a': 'All of Barcelona and metro area: Badalona, L\'Hospitalet, Sant Cugat, Cornellà and more.',
      'faq.4.q': 'What warranty do you offer?',
      'faq.4.a': '2-year warranty on installation plus the manufacturer\'s official warranty.',
      'faq.5.q': 'Do you offer financing?',
      'faq.5.a': 'Yes, up to 24 months interest-free with prior approval.',

      'ctaFinal.title': 'Request your free quote today',
      'ctaFinal.text':  'No obligation · 24h response · 2-year warranty',

      'areas.title': 'We work all over Barcelona',

      'contacto.eyebrow': 'Contact',
      'contacto.title':   'Contact us',
      'contacto.lead':    'Pick the channel you prefer — we reply fast.',
      'contacto.phone':   'Mon–Sat · 08:00–20:00',
      'contacto.wa':      'Response in minutes',
      'contacto.mail':    '24h response',

      'trust.guarantee': '2-year warranty',
      'trust.rating':    '4.9 on Google',
      'trust.eco':       'Eco-friendly',

      'form.name':    'Name',
      'form.phone':   'Phone',
      'form.message': 'Message',
      'form.consent': 'I accept the privacy policy.',
      'form.submit':  'Send request',
      'form.success': '✓ Thanks! We will contact you shortly.',
      'form.error':   'Please check the required fields.',

      'footer.tagline':  'Eco-efficient climate control in Barcelona since 2015.',
      'footer.services': 'Services',
      'footer.company':  'Company',
      'footer.contact':  'Contact',
      'footer.rights':   'All rights reserved.',
      'footer.map.title':'📍 Find us in Barcelona',
      'footer.map.text': 'Coverage across the city and metro area. Free on-site visit.',
      'footer.map.cta':  'Open in Google Maps ↗',

      'chatbot.open':     'Chat',
      'chatbot.title':    'EcoBot',
      'chatbot.subtitle': 'Usually replies in 1 min',
      'chatbot.welcome':  'Hi! 👋 I am EcoBot. How can I help you today?',
      'chatbot.q.price':  'I want a quote',
      'chatbot.q.time':   'How long does it take?',
      'chatbot.q.area':   'Where do you work?',
      'chatbot.q.human':  'Talk to a human',
      'chatbot.a.price':  'Use our calculator for an instant price, or send me your m² and number of units and I will reply right away.',
      'chatbot.a.time':   'We usually install in 48 business hours. Maintenance and repairs are often same-day.',
      'chatbot.a.area':   'All of Barcelona and metro area (Badalona, L\'Hospitalet, Sant Cugat, Cornellà, etc.).',
      'chatbot.a.human':  'I will put you through to a technician on WhatsApp: https://wa.me/34637575000',
      'chatbot.a.default':'Great question! Leave your phone and a technician will call you, or message us on WhatsApp: https://wa.me/34637575000'
    }
  };

  /* -----------------------------------------------------------
     3. I18N APPLY
  ----------------------------------------------------------- */
  function t(key, lang) {
    lang = lang || document.documentElement.getAttribute('data-lang') || 'es';
    var abBlock = (AB_COPY[lang] && AB_COPY[lang][ACTIVE_AB]) || {};
    if (abBlock[key] != null) return abBlock[key];
    return (DICT[lang] && DICT[lang][key]) != null ? DICT[lang][key] : '';
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key, lang);
      if (!val) return;

      if (el.tagName === 'META') {
        el.setAttribute('content', val);
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', val.replace(/<[^>]+>/g, ''));
      } else if (el.tagName === 'TITLE') {
        el.textContent = val;
      } else {
        // Allow minimal HTML (<span>, <strong>) inside translated strings
        el.innerHTML = val;
      }
    });

    // Doc title & meta description
    var title = t('meta.title', lang);
    if (title) document.title = title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description', lang));

    // Lang switch UI state
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    try { localStorage.setItem('eco_lang', lang); } catch (e) { /* noop */ }
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('eco_lang'); } catch (e) { /* noop */ }
    var browser = (navigator.language || 'es').slice(0, 2).toLowerCase();
    var initial = saved || (DICT[browser] ? browser : 'es');
    applyLang(initial);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-lang'));
      });
    });
  }

  /* -----------------------------------------------------------
     4. STICKY HEADER + MOBILE MENU
  ----------------------------------------------------------- */
  function initHeader() {
    var header = document.getElementById('header');
    var burger = document.getElementById('burger');
    var nav    = document.getElementById('nav');

    function onScroll() {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });
      nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          nav.classList.remove('is-open');
          burger.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* -----------------------------------------------------------
     5. REVEAL ON SCROLL (IntersectionObserver)
  ----------------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !targets.length) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* -----------------------------------------------------------
     6. CONTACT FORM
  ----------------------------------------------------------- */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lang = document.documentElement.getAttribute('data-lang') || 'es';
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = t('form.error', lang);
        status.className = 'form-status is-error';
        return;
      }

      var payload = {
        name:    form.name.value.trim(),
        phone:   form.phone.value.trim(),
        message: form.message.value.trim()
      };

      // Analytics + conversion
      if (window.EcoAnalytics) {
        window.EcoAnalytics.trackForm('contact', {
          has_message: payload.message.length > 0
        });
      }

      /* Demo behaviour: no backend wired.
         Replace this block with a real fetch() to your endpoint:
         fetch('/api/lead', { method: 'POST', body: JSON.stringify(payload) })
      */
      status.textContent = t('form.success', lang);
      status.className = 'form-status is-success';
      form.reset();
    });
  }

  /* -----------------------------------------------------------
     7. CHATBOT (rule-based)
  ----------------------------------------------------------- */
  function initChatbot() {
    var root   = document.getElementById('chatbot');
    var toggle = document.getElementById('chatbotToggle');
    var win    = document.getElementById('chatbotWindow');
    var close  = document.getElementById('chatbotClose');
    var msgs   = document.getElementById('chatbotMessages');
    var quick  = document.getElementById('chatbotQuick');
    var form   = document.getElementById('chatbotForm');
    var input  = document.getElementById('chatbotInput');
    if (!root || !toggle || !win) return;

    var opened = false;

    function addMsg(text, who) {
      var el = document.createElement('div');
      el.className = 'chat-msg chat-msg--' + (who || 'bot');
      // Convert URLs to links
      el.innerHTML = text.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">$1</a>'
      );
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function renderQuicks() {
      var lang = document.documentElement.getAttribute('data-lang') || 'es';
      quick.innerHTML = '';
      [
        { k: 'price', l: t('chatbot.q.price', lang) },
        { k: 'time',  l: t('chatbot.q.time',  lang) },
        { k: 'area',  l: t('chatbot.q.area',  lang) },
        { k: 'human', l: t('chatbot.q.human', lang) }
      ].forEach(function (q) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chat-quick';
        b.textContent = q.l;
        b.addEventListener('click', function () { respond(q.k, q.l); });
        quick.appendChild(b);
      });
    }

    function reply(key) {
      var lang = document.documentElement.getAttribute('data-lang') || 'es';
      setTimeout(function () { addMsg(t('chatbot.a.' + key, lang), 'bot'); }, 450);
    }

    function matchIntent(text) {
      var s = (text || '').toLowerCase();
      if (/(precio|presupuest|coste|cuánto|cuanto|cost|price|quote)/.test(s)) return 'price';
      if (/(tarda|tiempo|cuándo|cuando|how long|when|rápido)/.test(s))        return 'time';
      if (/(zona|dónde|donde|barrio|barcelona|área|area|where)/.test(s))      return 'area';
      if (/(persona|humano|técnico|tecnico|human|agent|operator)/.test(s))    return 'human';
      return 'default';
    }

    function respond(key, userText) {
      addMsg(userText, 'user');
      reply(key);
      if (window.EcoAnalytics) window.EcoAnalytics.trackChatbot('message_' + key);
    }

    function open() {
      if (opened) return;
      opened = true;
      win.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      if (!msgs.children.length) {
        var lang = document.documentElement.getAttribute('data-lang') || 'es';
        addMsg(t('chatbot.welcome', lang), 'bot');
        renderQuicks();
      }
      if (window.EcoAnalytics) window.EcoAnalytics.trackChatbot('open');
    }
    function closeWin() {
      opened = false;
      win.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () { opened ? closeWin() : open(); });
    if (close) close.addEventListener('click', closeWin);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = input.value.trim();
      if (!val) return;
      input.value = '';
      respond(matchIntent(val), val);
    });

    // Re-render quick replies when language changes
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (opened) renderQuicks();
      });
    });
  }

  /* -----------------------------------------------------------
     8. MISC
  ----------------------------------------------------------- */
  function initFooterYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------------------
     INIT
  ----------------------------------------------------------- */
  function init() {
    initLang();
    initHeader();
    initReveal();
    initForm();
    initChatbot();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
