(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
      return;
    }
    document.addEventListener("DOMContentLoaded", fn);
  }



  function initHeader() {
    const header = document.getElementById("siteHeader");
    const backToTop = document.getElementById("backToTop");
    const setState = () => {
      const scrolled = window.scrollY > 42;
      header?.classList.toggle("is-scrolled", scrolled);
      backToTop?.classList.toggle("is-visible", window.scrollY > 650);
    };
    setState();
    window.addEventListener("scroll", setState, { passive: true });
    backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function initSmoothLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;
        event.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: y, behavior: "smooth" });

        const nav = document.getElementById("mainNav");
        if (nav && nav.classList.contains("show") && window.bootstrap?.Collapse) {
          window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
        }
      });
    });
  }

  function initHeroParallax() {
    const stage = document.getElementById("heroBookStage");
    if (!stage || prefersReducedMotion) return;
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty("--hero-tilt-x", `${x * 7}deg`);
      stage.style.setProperty("--hero-tilt-y", `${y * -5}deg`);
    });
    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--hero-tilt-x", "0deg");
      stage.style.setProperty("--hero-tilt-y", "0deg");
    });
  }

  function initAosAndGsap() {
    if (window.AOS) {
      window.AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 70
      });
      
    window.addEventListener("load", () => {
      AOS.refreshHard();
    });

    window.addEventListener("resize", () => {
      AOS.refresh();
    });
      
    }

    if (window.gsap && !prefersReducedMotion) {
      window.gsap.from(".hero-copy .eyebrow, .hero-copy h1, .hero-copy p, .hero-actions, .hero-stats", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.1
      });
      window.gsap.from(".hero-book-stage .book-mockup", {
        y: 36,
        opacity: 0,
        rotateY: -28,
        duration: 0.9,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.25
      });
    }
  }

  function initSwipers() {
    if (!window.Swiper) return;
    new window.Swiper(".featuredSwiper", {
      slidesPerView: 1.25,
      spaceBetween: 18,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 2400,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".featured-next",
        prevEl: ".featured-prev"
      },
      breakpoints: {
        576: { slidesPerView: 2.2 },
        768: { slidesPerView: 3.2 },
        992: { slidesPerView: 4.2 },
        1200: { slidesPerView: 5 }
      }
    });

    new window.Swiper(".gallerySwiper", {
      slidesPerView: "auto",
      spaceBetween: 20,
      loop: true,
      speed: 800,
      centeredSlides: true,
      autoplay: {
        delay: 1900,
        disableOnInteraction: false
      }
    });
  }

  function initCounters() {
    const counters = Array.from(document.querySelectorAll("[data-counter]"));
    if (!counters.length) return;

    const animateCounter = (el) => {
      const target = Number(el.dataset.counter || 0);
      const suffix = target === 98 ? "%" : "+";
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.floor(eased * target)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.45 });

    counters.forEach((counter) => observer.observe(counter));
  }

  function initBookOrbit() {
    const orbit = document.getElementById("bookOrbit");
    const items = Array.from(document.querySelectorAll("#bookRing .orbit-book"));
    if (!orbit || !items.length) return;

    let radius = 420;
    let rotation = -8;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let lastMoveTime = 0;
    let lastFrame = performance.now();
    const autoSpeed = prefersReducedMotion ? 0 : 0.018;
    const dragStrength = 0.22;

    const sizeOrbit = () => {
      const width = orbit.clientWidth || 900;
      if (width < 430) {
        radius = width * 0.45;
      } else if (width < 760) {
        radius = width * 0.42;
      } else {
        radius = Math.min(Math.max(width * 0.36, 320), 500);
      }
    };

    const render = () => {
      const step = 360 / items.length;
      items.forEach((item, index) => {
        const angle = rotation + index * step;
        const rad = angle * Math.PI / 180;
        const front = Math.cos(rad);
        const depth = (front + 1) / 2;
        const scale = 0.7 + depth * 0.42;
        const lift = (1 - depth) * 18;
        const brightness = 0.62 + depth * 0.48;
        const saturation = 0.88 + depth * 0.12;
        item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${lift}px) scale(${scale})`;
        item.style.zIndex = String(Math.round(depth * 1000));
        item.style.opacity = String(0.34 + depth * 0.66);
        item.style.filter = `brightness(${brightness}) saturate(${saturation})`;
      });
    };

    const frame = (now) => {
      const dt = Math.min(now - lastFrame, 48);
      lastFrame = now;

      if (!dragging) {
        rotation += autoSpeed * dt;
        if (Math.abs(velocity) > 0.0005) {
          rotation += velocity * dt;
          velocity *= Math.pow(0.925, dt / 16.67);
        } else {
          velocity = 0;
        }
      }

      render();
      requestAnimationFrame(frame);
    };

    const stopDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      orbit.classList.remove("is-dragging");
      if (event?.pointerId !== undefined && orbit.hasPointerCapture?.(event.pointerId)) {
        orbit.releasePointerCapture(event.pointerId);
      }
    };

    orbit.addEventListener("pointerdown", (event) => {
      dragging = true;
      orbit.classList.add("is-dragging");
      lastX = event.clientX;
      lastMoveTime = performance.now();
      velocity = 0;
      orbit.setPointerCapture?.(event.pointerId);
    });

    orbit.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dt = Math.max(now - lastMoveTime, 8);
      const delta = dx * dragStrength;
      rotation += delta;
      velocity = delta / dt;
      lastX = event.clientX;
      lastMoveTime = now;
      render();
    });

    orbit.addEventListener("pointerup", stopDrag);
    orbit.addEventListener("pointercancel", stopDrag);
    orbit.addEventListener("pointerleave", stopDrag);

    orbit.addEventListener("wheel", (event) => {
      event.preventDefault();
      const wheelDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      velocity += wheelDelta * 0.00085;
      rotation += wheelDelta * 0.035;
      render();
    }, { passive: false });

    orbit.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      velocity += direction * 0.07;
    });

    sizeOrbit();
    render();
    window.addEventListener("resize", () => {
      sizeOrbit();
      render();
    }, { passive: true });
    requestAnimationFrame(frame);
  }

  function initBootstrapFallbacks() {
    if (window.bootstrap) return;

    document.querySelectorAll(".faq-accordion .accordion-button").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.bsTarget);
        if (!target) return;
        const parent = button.closest(".accordion");
        parent?.querySelectorAll(".accordion-collapse.show").forEach((open) => {
          if (open !== target) open.classList.remove("show");
        });
        parent?.querySelectorAll(".accordion-button").forEach((btn) => {
          if (btn !== button) btn.classList.add("collapsed");
        });
        target.classList.toggle("show");
        button.classList.toggle("collapsed", !target.classList.contains("show"));
      });
    });

    const carousel = document.getElementById("testimonialCarousel");
    if (!carousel) return;
    const slides = Array.from(carousel.querySelectorAll(".carousel-item"));
    let current = slides.findIndex((slide) => slide.classList.contains("active"));
    if (current < 0) current = 0;
    const show = (index) => {
      slides[current]?.classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current]?.classList.add("active");
    };
    carousel.querySelector('[data-bs-slide="prev"]')?.addEventListener("click", () => show(current - 1));
    carousel.querySelector('[data-bs-slide="next"]')?.addEventListener("click", () => show(current + 1));
    window.setInterval(() => show(current + 1), 4500);
  }

 function initForms() {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {

      const button = form.querySelector("button[type='submit']");
      if (!button) return;

      button.disabled = true;
      button.innerHTML = "Sending...";
    });
  });
}
  ready(() => {
    initHeader();
    initSmoothLinks();
    initHeroParallax();
    initAosAndGsap();
    initSwipers();
    initCounters();
    initBookOrbit();
    initBootstrapFallbacks();
    initForms();
    
  });
})();


/* ============================================================
     MSP Before/After comparison slider — vanilla JS, no deps.
     Scoped entirely to elements inside .msp-before-after-section.
     Supports mouse drag, touch swipe, and keyboard (arrow keys).
     ============================================================ */
     
  (function () {
    'use strict';

    var section = document.querySelector('.msp-before-after-section');
    if (!section) return;

    var compares = section.querySelectorAll('[data-msp-bas-compare]');

    compares.forEach(function (compare) {
      var handle = compare.querySelector('[data-msp-bas-handle]');
      var dragging = false;

      /**
       * Clamp a value between 0 and 100.
       */
      function clamp(value) {
        return Math.max(0, Math.min(100, value));
      }

      /**
       * Update the --msp-pos custom property (drives the CSS clip-path
       * and divider position) plus the handle's ARIA value.
       */
      function setPosition(percent) {
        var clamped = clamp(percent);
        compare.style.setProperty('--msp-pos', clamped);
        handle.setAttribute('aria-valuenow', Math.round(clamped));
      }

      /**
       * Convert a pointer clientX into a 0–100 percentage relative
       * to the compare box's current bounding rectangle.
       */
      function percentFromClientX(clientX) {
        var rect = compare.getBoundingClientRect();
        return ((clientX - rect.left) / rect.width) * 100;
      }

      function onPointerDown(e) {
        dragging = true;
        compare.classList.add('msp-bas-is-dragging');
        // Pointer capture keeps receiving move events even if the
        // cursor leaves the element bounds mid-drag.
        if (e.pointerId !== undefined && compare.setPointerCapture) {
          compare.setPointerCapture(e.pointerId);
        }
        setPosition(percentFromClientX(e.clientX));
        handle.focus();
      }

      function onPointerMove(e) {
        if (!dragging) return;
        setPosition(percentFromClientX(e.clientX));
      }

      function onPointerUp(e) {
        if (!dragging) return;
        dragging = false;
        compare.classList.remove('msp-bas-is-dragging');
        if (e.pointerId !== undefined && compare.releasePointerCapture) {
          try { compare.releasePointerCapture(e.pointerId); } catch (err) { /* no-op */ }
        }
      }

      // Pointer Events unify mouse, touch and pen in one API.
      compare.addEventListener('pointerdown', onPointerDown);
      compare.addEventListener('pointermove', onPointerMove);
      compare.addEventListener('pointerup', onPointerUp);
      compare.addEventListener('pointercancel', onPointerUp);
      compare.addEventListener('pointerleave', function (e) {
        // Only stop if the button is no longer pressed (safety net for
        // browsers that don't fire pointerup reliably on fast drags).
        if (dragging && e.buttons === 0) onPointerUp(e);
      });

      // Keyboard accessibility: Arrow keys nudge, Home/End jump to ends.
      handle.addEventListener('keydown', function (e) {
        var current = parseFloat(compare.style.getPropertyValue('--msp-pos')) || 50;
        if (e.key === 'ArrowLeft') { setPosition(current - 4); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { setPosition(current + 4); e.preventDefault(); }
        else if (e.key === 'Home') { setPosition(0); e.preventDefault(); }
        else if (e.key === 'End') { setPosition(100); e.preventDefault(); }
      });
    });
  })();
