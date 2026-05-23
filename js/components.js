(function () {
  'use strict';

  var path = window.location.pathname;

function isActive(href) {
  return path === href;
}

  var navEl = document.getElementById('main-nav');
  if (navEl) {
    navEl.className = 'nav';
    navEl.innerHTML = [
      '<div class="nav-inner">',
        '<a href="index.html" class="nav-logo" aria-label="DoctoraLáser — Inicio">',
          'Doctora Láser',
          '<em>Dra. Ana Vinasco · Bogotá</em>',
        '</a>',
        '<ul class="nav-links" id="nav-mobile" role="list">',
          navItem('index.html',        'Inicio'),
          navItem('beneficios.html',   'Beneficios'),
          navItem('tratamientos.html', 'Tratamientos'),
          navItem('evidencia.html',    'Evidencia'),
          navItem('casos.html',        'Casos'),
          '<li class="nav-cta-mobile">',
            '<a href="agenda.html" class="btn btn--wa" style="width:100%;justify-content:center">',
              '<i class="ti ti-brand-whatsapp" aria-hidden="true"></i> Agendar cita',
            '</a>',
          '</li>',
        '</ul>',
        '<a href="agenda.html" class="btn btn--primary nav-cta desktop-only">',
          '<i class="ti ti-calendar-plus" aria-hidden="true"></i>',
          'Agendar cita',
        '</a>',
        '<button class="nav-mobile-btn" id="nav-burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-mobile">',
          '<i class="ti ti-menu-2" aria-hidden="true"></i>',
        '</button>',
      '</div>'
    ].join('');

    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'nav-overlay';
    document.body.appendChild(overlay);

    var burger     = document.getElementById('nav-burger');
    var mobileMenu = document.getElementById('nav-mobile');
    var waFloat    = document.getElementById('wa-float');

    function openMenu() {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      burger.setAttribute('aria-expanded', 'true');
      if (waFloat) waFloat.style.display = 'none';
    }
    function closeMenu() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
      if (waFloat) waFloat.style.display = '';
    }

    burger.addEventListener('click', function () {
      mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    function onScroll() {
      navEl.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function navItem(href, label) {
    var active = isActive(href) ? ' class="active" aria-current="page"' : '';
    return '<li><a href="' + href + '"' + active + '>' + label + '</a></li>';
  }

  /* --- FOOTER ------------------------------------------------ */
  var footerEl = document.getElementById('main-footer');
  if (footerEl) {
    footerEl.className = 'footer';
    footerEl.setAttribute('role', 'contentinfo');
    footerEl.innerHTML = [
      '<div class="footer-inner">',
        '<div style="max-width:260px">',
          '<div class="footer-logo">Doctora Láser <em>Dra. Ana Vinasco</em></div>',
          '<p class="footer-tagline">Odontología con láser diodo en Bogotá.<br>Más precisa, menos dolor, recuperación más rápida.</p>',
        '</div>',
        '<div>',
          '<span class="footer-heading">Páginas</span>',
          '<nav class="footer-links" aria-label="Navegación del pie">',
            '<a href="index.html">Inicio</a>',
            '<a href="beneficios.html">Beneficios</a>',
            '<a href="tratamientos.html">Tratamientos</a>',
            '<a href="evidencia.html">Evidencia</a>',
            '<a href="casos.html">Casos</a>',
            '<a href="agenda.html">Agenda</a>',
          '</nav>',
        '</div>',
        '<div>',
          '<span class="footer-heading">Contacto</span>',
          '<div class="footer-links">',
            '<span style="display:flex;align-items:flex-start;gap:.5rem;color:rgba(255,255,255,.5);font-size:13.5px">',
              '<i class="ti ti-map-pin" style="color:var(--c-p400);font-size:15px;flex-shrink:0;margin-top:2px" aria-hidden="true"></i>',
              'Cra. 7 Bis #124–56, Bogotá, Colombia',
            '</span>',
            '<a href="tel:+573015666729" style="display:flex;align-items:center;gap:.5rem">',
              '<i class="ti ti-brand-whatsapp" style="color:var(--c-p400);font-size:15px" aria-hidden="true"></i>',
              '+57 301 5666729',
            '</a>',
            '<a href="mailto:info@doctoralaser.com" style="display:flex;align-items:center;gap:.5rem">',
              '<i class="ti ti-mail" style="color:var(--c-p400);font-size:15px" aria-hidden="true"></i>',
              'info@doctoralaser.com',
            '</a>',
          '</div>',
        '</div>',
        '<div>',
          '<span class="footer-heading">Horarios</span>',
          '<div style="display:flex;flex-direction:column;gap:3px">',
            hourRow('Lunes',          '8:00 a.m. – 12:00 p.m.'),
            hourRow('Martes',         '8:00 a.m. – 7:00 p.m.'),
            hourRow('Miércoles','2:00 p.m. – 7:00 p.m.'),
            hourRow('Jueves',         '8:00 a.m. – 7:00 p.m.'),
            hourRow('Viernes',        '8:00 a.m. – 7:00 p.m.'),
            hourRow('Sábado',  '8:00 a.m. – 7:00 p.m.'),
            hourRow('Domingo',        'Cerrado', true),
          '</div>',
        '</div>',
      '</div>',
      '<div class="footer-copy">',
        '<span>© 2026 Doctora Láser. Todos los derechos reservados.</span>',
        '<a href="privacidad.html">Política de privacidad</a>',
      '</div>'
    ].join('');
  }

  function hourRow(day, time, closed) {
    var cls = closed
      ? ' class="footer-hour-row footer-hour-row--closed"'
      : ' class="footer-hour-row"';
    return '<div' + cls + '><span>' + day + '</span><span>' + time + '</span></div>';
  }

  /* --- WHATSAPP FLOAT --------------------------------------- */
  var waEl = document.getElementById('wa-float');
  if (waEl) {
    waEl.innerHTML =
      '<a href="https://wa.me/573015666729?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20DoctoraL%C3%A1ser%20%F0%9F%98%8A"' +
      ' target="_blank" rel="noopener noreferrer"' +
      ' aria-label="Contactar por WhatsApp">' +
        '<i class="ti ti-brand-whatsapp" aria-hidden="true"></i>' +
      '</a>';
  }

})();
