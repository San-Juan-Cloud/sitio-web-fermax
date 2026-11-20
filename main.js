/* ============================================================================
   FERMAX — comportamiento del sitio
   ============================================================================
   Este archivo tiene, en orden:
     1) Fotos de "Proyectos ejecutados" (array OBRAS) — EDITAR ACÁ para sumar
        o sacar fotos; el carrusel arma una diapositiva por cada foto.
     2) Menú mobile (hamburguesa)
     3) Acordeón de Servicios
     4) Grilla de Obras + Lightbox (galería con detalle)
     5) Cobertura (resaltar zona en el mapa al pasar el mouse)
     6) Formulario de Contacto (validación simple, sin backend)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================================
     1) FOTOS DE OBRAS — para agregar o quitar fotos del carrusel, tocar acá:
     basta con sumar o sacar una línea de photos[]. Solo fotos reales, sin nombres.
     (Las empresas figuran en la cinta de clientes y en Referencias.)
     ========================================================================== */
  const OBRAS = [
    {
      photos: [
        "assets/fotos/obra-2.webp",
        "assets/fotos/residencial-cartel-local.webp",
        "assets/fotos/hero-luces-local.webp",
        "assets/fotos/residencial-piso-local.webp",
        "assets/fotos/obra-3.webp",
        "assets/fotos/bodegas-jaled-2.jpeg",
        "assets/fotos/obra-4.webp",
        "assets/fotos/obra-5.webp",
        "assets/fotos/obras/obra-01.webp",
        "assets/fotos/obras/obra-02.webp",
        "assets/fotos/obras/obra-03.webp",
        "assets/fotos/obras/obra-04.webp",
        "assets/fotos/obras/obra-05.webp",
        "assets/fotos/obras/obra-06.webp",
        "assets/fotos/obras/obra-07.webp",
        "assets/fotos/obras/obra-08.webp",
        "assets/fotos/obras/obra-10.webp",
        "assets/fotos/obras/obra-11.webp",
        "assets/fotos/obras/obra-12.webp",
        "assets/fotos/obras/obra-14.webp",
        "assets/fotos/obras/obra-16.webp",
      ],
    },
  ];

  /* ==========================================================================
     2) MENÚ MOBILE
     ========================================================================== */
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  burgerBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burgerBtn.setAttribute("aria-expanded", String(isOpen));
  });
  // Cerrar el menú al tocar un link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burgerBtn.setAttribute("aria-expanded", "false");
    });
  });

  /* ==========================================================================
     3) ACORDEÓN DE SERVICIOS — solo uno abierto a la vez
     ========================================================================== */
  ["#accordion", "#faq"].forEach((sel) => {
    const accordionItems = document.querySelectorAll(sel + " .accordion__item");
    accordionItems.forEach((item) => {
      const trigger = item.querySelector(".accordion__trigger");
      trigger.addEventListener("click", () => {
        const wasOpen = item.classList.contains("is-open");
        accordionItems.forEach((i) => i.classList.remove("is-open"));
        if (!wasOpen) item.classList.add("is-open");
      });
    });
  });

  /* ==========================================================================
     4) OBRAS — arma la grilla de tarjetas y el lightbox
     ========================================================================== */
  const obrasGrid = document.getElementById("obrasGrid");

  // Una diapositiva por foto; al tocarla se abre la galería en esa obra y esa foto.
  OBRAS.forEach((obra, i) => {
    obra.photos.forEach((photo, j) => {
      const card = document.createElement("div");
      card.className = "obra-card";
      card.innerHTML = `
        <img src="${photo}" alt="Instalación de cerco eléctrico FERMAX" loading="lazy" draggable="false">
      `;
      card.addEventListener("click", () => { if (!dragMoved) openLightbox(i, j); });
      obrasGrid.appendChild(card);
    });
  });

  // Arrastrar con el mouse (el dedo ya desliza solo). dragMoved evita abrir la
  // galería cuando se soltó después de arrastrar.
  let dragMoved = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let dragging = false;
  obrasGrid.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    dragging = true;
    dragMoved = false;
    dragStartX = e.clientX;
    dragStartScroll = obrasGrid.scrollLeft;
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStartX;
    if (!dragMoved && Math.abs(dx) > 5) {
      dragMoved = true;
      obrasGrid.classList.add("is-dragging");
    }
    if (dragMoved) obrasGrid.scrollLeft = dragStartScroll - dx;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    obrasGrid.classList.remove("is-dragging");
    // dejar dragMoved activo hasta después del click que sigue al soltar
    setTimeout(() => { dragMoved = false; }, 0);
  }
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  // Flechas del carrusel: avanzan una diapositiva
  const obrasPrev = document.getElementById("obrasPrev");
  const obrasNext = document.getElementById("obrasNext");
  const slideStep = () => {
    const first = obrasGrid.querySelector(".obra-card");
    return first ? first.getBoundingClientRect().width + 12 : 320;
  };
  obrasPrev.addEventListener("click", () => obrasGrid.scrollBy({ left: -slideStep(), behavior: "smooth" }));
  obrasNext.addEventListener("click", () => obrasGrid.scrollBy({ left: slideStep(), behavior: "smooth" }));
  function updateObrasArrows() {
    const max = obrasGrid.scrollWidth - obrasGrid.clientWidth - 2;
    obrasPrev.disabled = obrasGrid.scrollLeft <= 2;
    obrasNext.disabled = obrasGrid.scrollLeft >= max;
  }
  obrasGrid.addEventListener("scroll", updateObrasArrows, { passive: true });
  window.addEventListener("resize", updateObrasArrows);
  updateObrasArrows();

  // --- Lightbox ---
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPhoto = document.getElementById("lightboxPhoto");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxThumbs = document.getElementById("lightboxThumbs");
  const lightboxType = document.getElementById("lightboxType");
  const lightboxName = document.getElementById("lightboxName");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxPrevPhoto = document.getElementById("lightboxPrevPhoto");
  const lightboxNextPhoto = document.getElementById("lightboxNextPhoto");
  const lightboxPrevProject = document.getElementById("lightboxPrevProject");
  const lightboxNextProject = document.getElementById("lightboxNextProject");

  let projectIdx = 0;
  let photoIdx = 0;

  function openLightbox(index, photo = 0) {
    projectIdx = index;
    photoIdx = photo;
    renderLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }
  function renderLightbox() {
    const obra = OBRAS[projectIdx];

    lightboxPhoto.src = obra.photos[photoIdx];
    lightboxPhoto.alt = "Instalación de cerco eléctrico FERMAX";
    lightboxCaption.textContent = `Foto ${photoIdx + 1} de ${obra.photos.length}`;

    lightboxThumbs.innerHTML = "";
    obra.photos.forEach((photo, j) => {
      const btn = document.createElement("button");
      btn.setAttribute("aria-label", `Ver foto ${j + 1} de ${obra.name}`);
      if (j === photoIdx) btn.classList.add("is-active");
      btn.innerHTML = `<img src="${photo}" alt="">`;
      btn.addEventListener("click", () => { photoIdx = j; renderLightbox(); });
      lightboxThumbs.appendChild(btn);
    });

    lightboxType.textContent = obra.type ? (obra.location ? `${obra.type} · ${obra.location}` : obra.type) : "";
    lightboxName.textContent = obra.name || "";
    lightboxCounter.textContent = OBRAS.length > 1 ? `Obra ${projectIdx + 1} de ${OBRAS.length}` : "";
    lightboxPrevProject.hidden = lightboxNextProject.hidden = OBRAS.length < 2;
    // Sin nombre ni tipo, el panel de detalles queda vacío: se oculta y la foto ocupa todo
    const noDetails = !obra.name && !obra.type;
    document.querySelector(".lightbox__details").hidden = noDetails;
    document.querySelector(".lightbox__grid").classList.toggle("lightbox__grid--solo", noDetails);

    const single = obra.photos.length < 2;
    lightboxThumbs.hidden = single;
    lightboxPrevPhoto.hidden = single;
    lightboxNextPhoto.hidden = single;
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

  lightboxPrevPhoto.addEventListener("click", () => {
    const total = OBRAS[projectIdx].photos.length;
    photoIdx = (photoIdx - 1 + total) % total;
    renderLightbox();
  });
  lightboxNextPhoto.addEventListener("click", () => {
    const total = OBRAS[projectIdx].photos.length;
    photoIdx = (photoIdx + 1) % total;
    renderLightbox();
  });
  lightboxPrevProject.addEventListener("click", () => {
    projectIdx = (projectIdx - 1 + OBRAS.length) % OBRAS.length;
    photoIdx = 0;
    renderLightbox();
  });
  lightboxNextProject.addEventListener("click", () => {
    projectIdx = (projectIdx + 1) % OBRAS.length;
    photoIdx = 0;
    renderLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxPrevPhoto.click();
    if (e.key === "ArrowRight") lightboxNextPhoto.click();
  });

  /* ==========================================================================
     5) COBERTURA — resaltar zona en el mapa y en las tarjetas al pasar el mouse
     ========================================================================== */
  const zoneCards = document.querySelectorAll(".zone-card");
  const zoneMapEls = document.querySelectorAll(".zone-region, .zone-label");

  function setActiveZone(zoneId) {
    zoneCards.forEach((card) => {
      const isActive = card.dataset.zone === zoneId;
      const isDimmed = zoneId !== null && !isActive;
      card.classList.toggle("is-active", isActive);
      card.classList.toggle("is-dimmed", isDimmed);
    });
    zoneMapEls.forEach((el) => {
      el.classList.toggle("is-active", el.dataset.zone === zoneId);
      // El mapa completo (Cuyo/Rosario/BsAs) se atenúa salvo la zona activa;
      // "national" no tiene marca en el mapa, así que no afecta nada ahí.
      if (zoneId === null || zoneId === "national") {
        el.style.opacity = 1;
      } else {
        el.style.opacity = el.dataset.zone === zoneId ? 1 : 0.25;
      }
    });
  }

  let selectedZone = null;
  zoneCards.forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");
    const select = () => {
      selectedZone = selectedZone === card.dataset.zone ? null : card.dataset.zone;
      zoneCards.forEach(c => c.setAttribute("aria-pressed", String(c.dataset.zone === selectedZone)));
      setActiveZone(selectedZone);
    };
    card.addEventListener("click", select);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(); } });
    card.addEventListener("mouseenter", () => setActiveZone(card.dataset.zone));
    card.addEventListener("mouseleave", () => setActiveZone(selectedZone));
    card.addEventListener("focus", () => setActiveZone(card.dataset.zone));
    card.addEventListener("blur", () => setActiveZone(selectedZone));
  });

  /* ==========================================================================
     6) FORMULARIO DE CONTACTO
     ========================================================================== */
  const WHATSAPP_NUMBER = "5492645242923";
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const formReset = document.getElementById("formReset");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpia errores previos
    contactForm.querySelectorAll(".field").forEach((f) => f.classList.remove("has-error"));
    contactForm.querySelectorAll(".field__error").forEach((el) => (el.textContent = ""));

    const nombre = contactForm.nombre.value.trim();
    const telefono = contactForm.telefono.value.trim();
    const localidad = contactForm.localidad.value.trim();

    let hasErrors = false;
    if (!nombre) { showError("nombre", "Ingresá tu nombre completo."); hasErrors = true; }
    if (!telefono) { showError("telefono", "Ingresá un número de teléfono."); hasErrors = true; }
    if (!localidad) { showError("localidad", "Indicá tu localidad."); hasErrors = true; }
    if (hasErrors) return;

    // Sin servidor propio: la consulta se manda por WhatsApp con los datos ya
    // escritos. La persona solo toca "enviar" en WhatsApp.
    const lineas = ["Hola, quiero pedir un presupuesto."];
    lineas.push(`Nombre: ${nombre}`);
    lineas.push(`Teléfono: ${telefono}`);
    lineas.push(`Localidad: ${localidad}`);
    const email = contactForm.email.value.trim();
    const tipo = contactForm.tipo.value;
    const mensaje = contactForm.mensaje.value.trim();
    if (email) lineas.push(`Email: ${email}`);
    if (tipo) lineas.push(`Servicio: ${tipo}`);
    if (mensaje) lineas.push(`Mensaje: ${mensaje}`);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lineas.join("\n"))}`;

    document.getElementById("formWaLink").href = waUrl;
    window.open(waUrl, "_blank", "noopener");

    contactForm.hidden = true;
    formSuccess.hidden = false;
  });

  function showError(fieldName, message) {
    const input = contactForm[fieldName];
    input.closest(".field").classList.add("has-error");
    const errorEl = contactForm.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorEl) errorEl.textContent = message;
  }

  formReset.addEventListener("click", () => {
    contactForm.reset();
    contactForm.hidden = false;
    formSuccess.hidden = true;
  });

  /* ==========================================================================
     7) CINTA DE CLIENTES — duplica la lista para que el loop no tenga cortes
     (en el HTML los nombres se escriben una sola vez)
     ========================================================================== */
  const clientsTrack = document.getElementById("clientsTrack");
  Array.from(clientsTrack.children).forEach((el) => {
    const copy = el.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    clientsTrack.appendChild(copy);
  });

  /* ==========================================================================
     8) ANIMACIONES AL HACER SCROLL + CONTADORES
     Para animar algo nuevo alcanza con sumarlo a REVEAL_GROUPS: cada grupo
     aparece con un pequeño escalonado entre sus elementos.
     ========================================================================== */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const REVEAL_GROUPS = [
    { selector: ".hero__text > *", stagger: 0.12 },
    { selector: ".stats-grid__item", stagger: 0.1 },
    { selector: ".section__head" },
    { selector: ".accordion__item", stagger: 0.05 },
    { selector: ".obra-card", stagger: 0.08, variant: "zoom" },
    { selector: ".ref-card", stagger: 0.12 },
    { selector: ".ref-counter" },
    { selector: ".nosotros__col:not(.nosotros__diffs)", variant: "left" },
    { selector: ".diff-card", stagger: 0.1, variant: "right" },
    { selector: ".cobertura__map", variant: "zoom" },
    { selector: ".zone-card", stagger: 0.08 },
    { selector: ".proceso__step", stagger: 0.15 },
    { selector: ".maint-banner" },
    { selector: ".cta-final__content > *", stagger: 0.1 },
    { selector: ".contacto__form-wrap", variant: "left" },
    { selector: ".contacto__side", variant: "right" },
    { selector: ".footer__grid > *", stagger: 0.1 },
  ];

  const animate = !reduceMotion && "IntersectionObserver" in window;

  if (animate) REVEAL_GROUPS.forEach(({ selector, stagger = 0, variant }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add("reveal");
      if (variant) el.classList.add(`reveal--${variant}`);
      // El escalonado se reinicia cada 4 elementos para que nada tarde demasiado
      if (stagger) el.style.setProperty("--reveal-delay", `${(i % 4) * stagger}s`);
    });
  });

  // Contador: sube desde 0 hasta data-count, respetando data-prefix/data-suffix
  function runCounter(el) {
    const target = Number(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // arranca rápido y frena al final
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll("[data-count]");

  // Sin animaciones (reduced motion o navegador viejo) todo queda visible y
  // los contadores muestran directamente el número final del HTML
  if (animate) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
        // Terminada la entrada se sacan las clases, para no pisar los hover
        // ni el atenuado de las tarjetas de cobertura (que usan opacity/transition)
        el.addEventListener("transitionend", function cleanup(e) {
          if (e.target !== el || e.propertyName !== "opacity") return;
          el.removeEventListener("transitionend", cleanup);
          el.classList.remove("reveal", "reveal--left", "reveal--right", "reveal--zoom", "is-visible");
          el.style.removeProperty("--reveal-delay");
        });
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => {
      el.textContent = (el.dataset.prefix || "") + "0" + (el.dataset.suffix || "");
      counterObserver.observe(el);
    });
  }

});
