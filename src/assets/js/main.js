/*
 * PowerFit - JavaScript Principal
 * Carga componentes comunes y maneja funcionalidades globales
 */

(function () {
  // Detectar profundidad de la página para ajustar rutas

  function obtenerRutaBase() {
    const ruta = window.location.pathname.replace(/\\/g, '/');
    return ruta.includes('/pages/') ? '../../' : './';
  }

  function cargarComponente(destino, url, callback) {
    const $el = $(destino);
    if (!$el.length) return;

    console.log(`Cargando: ${url} en ${destino}`);
    $el.load(url, function (_, estado, xhr) {
      if (estado !== 'success') {
        console.warn(`No se pudo cargar: ${url} (${xhr?.status})`);
      } else {
        console.log(`✓ Cargado: ${url}`);
      }
      callback && callback();
    });
  }

  $(function () {
    const rutaBase = obtenerRutaBase();
    console.log(`Ruta base detectada: ${rutaBase}`);

    // Cargar navbar
    cargarComponente(
      '#mainNav',
      rutaBase + 'components/mainNav.html',
      function () {
        if (
          window.PowerFit &&
          typeof PowerFit.ajustarEnlacesNav === 'function'
        ) {
          PowerFit.ajustarEnlacesNav();
        }
      }
    );

    // Cargar header (solo si existe el contenedor)
    if ($('#header').length) {
      cargarComponente('#header', rutaBase + 'components/header.html');
    }

    // Cargar footer
    cargarComponente(
      '#footer',
      rutaBase + 'components/footer.html',
      function () {
        // Actualizar año automáticamente
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      }
    );
  });

  // Configurar enlaces del navbar según la profundidad
  window.PowerFit = window.PowerFit || {};
  window.PowerFit.ajustarEnlacesNav = function () {
    const esProfundo = window.location.pathname
      .replace(/\\/g, '/')
      .includes('/pages/');
    const base = esProfundo ? '../../' : './';

    const mapaEnlaces = {
      '[data-link-root]': 'index.html',
      '[data-link-inicio]': 'index.html',
      '[data-link-catalogo]': 'pages/catalogo/catalogo.html',
      '[data-link-carrito]': 'pages/carrito/carrito.html',
      '[data-link-contacto]': 'pages/contacto/contacto.html',
      '[data-link-perfil]': 'pages/perfil/perfil.html',
      '[data-link-login]': 'pages/login/login.html',
    };

    Object.entries(mapaEnlaces).forEach(([selector, ruta]) => {
      const $link = $(selector);
      if ($link.length) {
        $link.attr('href', base + ruta);
      }
    });

    console.log('Enlaces del navbar configurados');
  };
})();
