/*
 * Punto Central de JavaScript
 * Aca se pueden agregar funcionalidades comunes a todas las páginas
 * Por ejemplo, inicializar plugins, manejar eventos globales, etc.
 * cargar el footer y header
 * ...cosas
 */

/* Loader de componentes comunes */
(function () {
  function loadComponent(target, url, cb) {
    const $el = $(target);
    if (!$el.length) return;
    $el.load(url, function (_, status) {
      if (status !== 'success') {
        console.warn('No se pudo cargar:', url);
      }
      cb && cb();
    });
  }

  $(function () {
    // ! recordar que hay que renombrar los archivos si es que cambian de lugar o nombre
    loadComponent('#mainNav', 'components/mainNav.html', function () {
      if (window.PowerFit && typeof PowerFit.fixNavLinks === 'function') {
        PowerFit.fixNavLinks();
      }
    });
    loadComponent('#header', 'components/header.html');

    // Redirigir el botón "Compra Ahora" a la página de suplementos
    $(document).on('click', '.btn-cta', function (e) {
      e.preventDefault(); // Evitar el comportamiento por defecto
      window.location.href = 'pages/catalogo/catalogo.html'; // Redirigir al catálogo
    });
  });
})();
