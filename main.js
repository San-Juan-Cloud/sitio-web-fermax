/* ============================================================================
   FERMAX — comportamiento del sitio
   ============================================================================
   Este archivo tiene, en orden:
     1) Datos de "Proyectos ejecutados" (array OBRAS) — EDITAR ACÁ los textos,
        fotos y specs de cada obra. Las fotos de las tarjetas están en
        CARD_GRID_PHOTOS (una por obra, en el mismo orden que OBRAS).
     2) Menú mobile (hamburguesa)
     3) Acordeón de Servicios
     4) Grilla de Obras + Lightbox (galería con detalle)
     5) Cobertura (resaltar zona en el mapa al pasar el mouse)
     6) Formulario de Contacto (validación simple, sin backend)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================================
     1) DATOS DE OBRAS — para agregar/quitar/editar un proyecto, tocar acá.
     Cada obra necesita: name, location, type, meters, story, specs[], photos[]
     ========================================================================== */
  const OBRAS = [
    {
      name: "Energy 360",
      location: "Ruta 40 esq. Saavedra Norte, San Juan",
      type: "Planta industrial",
      meters: 1480,
      story: "La planta operaba con un cerco convencional de alambre que había sido cortado tres veces en doce meses. Las pérdidas por robo de cobre y equipos superaban los costos de una instalación completa. Se relevó el perímetro, se diseñó un sistema de 8 hilos a 10.000 V con zonas independientes y se integró al sistema de alarma existente. Desde la puesta en marcha, cero incidentes.",
      specs: [
        { label: "Hilos", value: "8 hilos a 10.000 V" },
        { label: "Energizador", value: "Harvest 15J — doble fuente" },
        { label: "Integración", value: "Panel DSC Power Series" },
        { label: "Tiempo de obra", value: "12 días" },
        { label: "Año", value: "2022" },
      ],
      photos: [
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=750&fit=crop&auto=format",
      ],
    },
    {
      name: "Barrio Estilo Sur",
      location: "Rivadavia, San Juan",
      type: "Barrio privado",
      meters: 2140,
      story: "El barrio de 48 lotes no tenía ningún sistema de seguridad perimetral. Los vecinos venían padeciendo ingresos no autorizados por el sector de reserva verde. Se diseñó un cerco de alto voltaje con 12 zonas independientes, alarma comunitaria con sirenas internas y GSM, y un sistema de CCTV con 16 cámaras en los accesos. La administración monitorea todo desde un dashboard web.",
      specs: [
        { label: "Hilos", value: "10 hilos a 9.000 V" },
        { label: "Energizador", value: "Nemik Pro 30J — redundante" },
        { label: "Integración", value: "Alarma comunitaria + CCTV 16 cámaras" },
        { label: "Tiempo de obra", value: "21 días" },
        { label: "Año", value: "2023" },
      ],
      photos: [
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1200&h=750&fit=crop&auto=format",
      ],
    },
    {
      name: "Pulmho Truck",
      location: "Ruta Nacional 40, San Juan",
      type: "Playa de camiones",
      meters: 920,
      story: "Con camiones de alto valor estacionados de noche, la playa era un blanco frecuente para el robo de combustible y accesorios. La superficie grande y sin iluminación hacía que las cámaras convencionales no alcanzaran. Se instaló cerco eléctrico en el perímetro completo, detectores de vibración en los portones y un sistema de cámaras con IA que diferencia personas de animales.",
      specs: [
        { label: "Hilos", value: "6 hilos a 8.000 V" },
        { label: "Energizador", value: "DSC LE-15A" },
        { label: "Integración", value: "IA — Hikvision DeepInMind" },
        { label: "Tiempo de obra", value: "8 días" },
        { label: "Año", value: "2023" },
      ],
      photos: [
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=750&fit=crop&auto=format",
      ],
    },
    {
      name: "Swiss Medical",
      location: "San Juan capital",
      type: "Centro médico",
      meters: 480,
      story: "El perímetro del centro médico necesitaba seguridad efectiva sin afectar la imagen institucional ni interferir con las normas hospitalarias. Se diseñó un cerco de baja altura con 4 hilos y energizador de bajo pulso, señalética homologada y un sistema de acceso por tarjeta RFID para el personal. Toda la instalación fue coordinada con el área de facilities para no interrumpir la operación.",
      specs: [
        { label: "Hilos", value: "4 hilos a 6.000 V — pulso bajo" },
        { label: "Energizador", value: "Harvest 5J — conforme norma" },
        { label: "Integración", value: "Control de acceso RFID" },
        { label: "Tiempo de obra", value: "5 días" },
        { label: "Año", value: "2024" },
      ],
      photos: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&h=750&fit=crop&auto=format",
      ],
    },
    {
      name: "Auditorio Juan Victoria",
      location: "San Juan capital",
      type: "Espacio público cultural",
      meters: 640,
      story: "El auditorio requería un sistema de seguridad que funcionara tanto en días de función como en los períodos sin actividad, y que se pudiera desactivar parcialmente para el ingreso de público. Se instaló un sistema contra incendios con detección por aspiración, automatización del telón cortafuegos y un cerco perimetral sectorizado que se inhabilita por zona desde la consola del portero.",
      specs: [
        { label: "Hilos", value: "6 hilos por sector — 4 sectores" },
        { label: "Energizador", value: "Nemik Pro 10J — sectorial" },
        { label: "Integración", value: "Contra incendios + automatización" },
        { label: "Tiempo de obra", value: "18 días" },
        { label: "Año", value: "2022" },
      ],
      photos: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop&auto=format",
      ],
    },
    {
      name: "Fenicia Neumáticos",
      location: "Av. Uñac y calle 6, San Juan",
      type: "Comercio automotriz",
      meters: 310,
      story: "El local sufrió un ingreso nocturno por el lateral trasero que colinda con un baldío. La solución fue un cerco de 6 hilos en el perímetro trasero y lateral, integrado con la alarma existente y con una cámara en la esquina más comprometida. El sistema se activa automáticamente al cierre del local y envía una alerta al celular del dueño si hay una activación.",
      specs: [
        { label: "Hilos", value: "6 hilos a 8.000 V" },
        { label: "Energizador", value: "DSC LE-8A" },
        { label: "Integración", value: "Alarma existente + cámara IP" },
        { label: "Tiempo de obra", value: "3 días" },
        { label: "Año", value: "2024" },
      ],
      photos: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&h=750&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=750&fit=crop&auto=format",
      ],
    },
  ];

  // Foto de portada de cada tarjeta de la grilla (mismo orden que OBRAS)
  const CARD_GRID_PHOTOS = [
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=900&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format",
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
  const accordionItems = document.querySelectorAll("#accordion .accordion__item");
  accordionItems.forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    trigger.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");
      accordionItems.forEach((i) => i.classList.remove("is-open"));
      if (!wasOpen) item.classList.add("is-open");
    });
  });

  /* ==========================================================================
     4) OBRAS — arma la grilla de tarjetas y el lightbox
     ========================================================================== */
  const obrasGrid = document.getElementById("obrasGrid");

  OBRAS.forEach((obra, i) => {
    const card = document.createElement("div");
    card.className = "obra-card" + (i === 0 ? " obra-card--tall" : "");
    card.innerHTML = `
      <img src="${CARD_GRID_PHOTOS[i]}" alt="${obra.name}">
      <div class="obra-card__scrim"></div>
      <div class="obra-card__meters">
        <strong>${obra.meters.toLocaleString("es-AR")}</strong>
        <span>m de perímetro</span>
      </div>
      <div class="obra-card__info">
        <p class="name">${obra.name}</p>
        <p class="loc">${obra.location}</p>
        <p class="mobile-meta">${obra.meters.toLocaleString("es-AR")} m · ${obra.type}</p>
      </div>
    `;
    card.addEventListener("click", () => openLightbox(i));
    obrasGrid.appendChild(card);
  });

  // --- Lightbox ---
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPhoto = document.getElementById("lightboxPhoto");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxThumbs = document.getElementById("lightboxThumbs");
  const lightboxType = document.getElementById("lightboxType");
  const lightboxName = document.getElementById("lightboxName");
  const lightboxStory = document.getElementById("lightboxStory");
  const lightboxMeters = document.getElementById("lightboxMeters");
  const lightboxSpecs = document.getElementById("lightboxSpecs");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxPrevPhoto = document.getElementById("lightboxPrevPhoto");
  const lightboxNextPhoto = document.getElementById("lightboxNextPhoto");
  const lightboxPrevProject = document.getElementById("lightboxPrevProject");
  const lightboxNextProject = document.getElementById("lightboxNextProject");

  let projectIdx = 0;
  let photoIdx = 0;

  function openLightbox(index) {
    projectIdx = index;
    photoIdx = 0;
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
    lightboxPhoto.alt = obra.name;
    lightboxCaption.textContent = `${obra.name} — foto ${photoIdx + 1} de ${obra.photos.length}`;

    lightboxThumbs.innerHTML = "";
    obra.photos.forEach((photo, j) => {
      const btn = document.createElement("button");
      if (j === photoIdx) btn.classList.add("is-active");
      btn.innerHTML = `<img src="${photo}" alt="">`;
      btn.addEventListener("click", () => { photoIdx = j; renderLightbox(); });
      lightboxThumbs.appendChild(btn);
    });

    lightboxType.textContent = `${obra.type} · ${obra.location}`;
    lightboxName.textContent = obra.name;
    lightboxStory.textContent = obra.story;
    lightboxMeters.innerHTML = `${obra.meters.toLocaleString("es-AR")}<small>m</small>`;

    lightboxSpecs.innerHTML = "";
    obra.specs.forEach((spec) => {
      const row = document.createElement("div");
      row.className = "lightbox__spec-row";
      row.innerHTML = `<span class="label">${spec.label}</span><span class="value">${spec.value}</span>`;
      lightboxSpecs.appendChild(row);
    });

    lightboxCounter.textContent = `Obra ${projectIdx + 1} de ${OBRAS.length}`;
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
  const zoneMapEls = document.querySelectorAll(".zone-halo, .zone-points, .zone-label");

  function setActiveZone(zoneId) {
    zoneCards.forEach((card) => {
      const isActive = card.dataset.zone === zoneId;
      const isDimmed = zoneId !== null && !isActive;
      card.classList.toggle("is-active", isActive);
      card.classList.toggle("is-dimmed", isDimmed);
    });
    zoneMapEls.forEach((el) => {
      // El mapa completo (Cuyo/Rosario/BsAs) se atenúa salvo la zona activa;
      // "national" no tiene marca en el mapa, así que no afecta nada ahí.
      if (zoneId === null || zoneId === "national") {
        el.style.opacity = 1;
      } else {
        el.style.opacity = el.dataset.zone === zoneId ? 1 : 0.25;
      }
    });
  }

  zoneCards.forEach((card) => {
    card.addEventListener("mouseenter", () => setActiveZone(card.dataset.zone));
    card.addEventListener("mouseleave", () => setActiveZone(null));
  });

  /* ==========================================================================
     6) FORMULARIO DE CONTACTO
     ========================================================================== */
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

    // ------------------------------------------------------------------------
    // Acá no hay backend: el formulario solo valida y muestra el mensaje de
    // éxito. Para que las consultas lleguen de verdad hay que conectarlo a
    // algo (por ejemplo un endpoint propio, o armar un link de WhatsApp con
    // los datos cargados). Avisale a Juan si querés que esto quede funcional.
    // ------------------------------------------------------------------------

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

});
