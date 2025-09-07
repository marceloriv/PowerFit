/*
 * PowerFit - JavaScript Principal
 * Carga componentes comunes y maneja funcionalidades globales
 */

(function () {
  // Detectar profundidad de la página para ajustar rutas
  function getBasePath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    return path.includes('/pages/') ? '../../' : './';
  }

  function loadComponent(target, url, cb) {
    const $el = $(target);
    if (!$el.length) return;

    console.log(`Cargando: ${url} en ${target}`);
    $el.load(url, function (_, status, xhr) {
      if (status !== 'success') {
        console.warn(`No se pudo cargar: ${url} (${xhr?.status})`);
      } else {
        console.log(`✓ Cargado: ${url}`);
      }
      cb && cb();
    });
  }

  $(function () {
    const basePath = getBasePath();
    console.log(`Base path detectado: ${basePath}`);

    // Cargar navbar
    loadComponent(
      '#mainNav',
      basePath + 'components/mainNav.html',
      function () {
        if (window.PowerFit && typeof PowerFit.fixNavLinks === 'function') {
          PowerFit.fixNavLinks();
        }
      }
    );

    // Cargar header (solo si existe el contenedor)
    if ($('#header').length) {
      loadComponent('#header', basePath + 'components/header.html');
    }

    // Cargar footer
    loadComponent('#footer', basePath + 'components/footer.html', function () {
      // Actualizar año automáticamente
      const yearSpan = document.getElementById('year');
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });
  });

  // Configurar enlaces del navbar según la profundidad
  window.PowerFit = window.PowerFit || {};
  window.PowerFit.fixNavLinks = function () {
    const isDeep = window.location.pathname
      .replace(/\\/g, '/')
      .includes('/pages/');
    const base = isDeep ? '../../' : './';

    const linkMap = {
      '[data-link-root]': 'index.html',
      '[data-link-inicio]': 'index.html',
      '[data-link-catalogo]': 'pages/catalogo/catalogo.html',
      '[data-link-carrito]': 'pages/carrito/carrito.html',
      '[data-link-contacto]': 'pages/contacto/contacto.html',
      '[data-link-perfil]': 'pages/perfil/perfil.html',
      '[data-link-login]': 'pages/login/login.html',
    };

    Object.entries(linkMap).forEach(([selector, path]) => {
      const $link = $(selector);
      if ($link.length) {
        $link.attr('href', base + path);
      }
    });

    console.log('Enlaces del navbar configurados');
  };
})();
