/**
 * slider.js — Before/After slider component
 * DoctorLáser · Reutilizable, sin dependencias externas.
 * Inicializa todos los elementos [data-slider] en el documento.
 */

(function () {
  'use strict';

  /**
   * Inicializa un slider individual.
   * @param {HTMLElement} wrap - Contenedor .slider-wrap con [data-slider]
   */
  function initSlider(wrap) {
    const divider = wrap.querySelector('.slider-divider');
    const afterEl  = wrap.querySelector('.slider-after');
    if (!divider || !afterEl) return;

    let dragging = false;

    /** Actualiza posición del divisor según coordenada X absoluta */
    function move(clientX) {
      const rect = wrap.getBoundingClientRect();
      const pct  = Math.min(Math.max((clientX - rect.left) / rect.width * 100, 5), 95);
      divider.style.left          = pct + '%';
      afterEl.style.clipPath      = `inset(0 ${100 - pct}% 0 0)`;
    }

    // ── Mouse ────────────────────────────────────────────────
    divider.addEventListener('mousedown', function (e) {
      dragging = true;
      e.preventDefault();
    });

    // ── Touch ────────────────────────────────────────────────
    divider.addEventListener('touchstart', function () {
      dragging = true;
    }, { passive: true });

    // ── Global listeners (shared, but guarded by flag) ───────
    window.addEventListener('mousemove', function (e) {
      if (dragging) move(e.clientX);
    });
    window.addEventListener('mouseup', function () {
      dragging = false;
    });
    window.addEventListener('touchmove', function (e) {
      if (dragging) move(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', function () {
      dragging = false;
    });
  }

  /** Inicializa todos los sliders del documento */
  function initAll() {
    document.querySelectorAll('[data-slider]').forEach(initSlider);
  }

  // Espera a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
