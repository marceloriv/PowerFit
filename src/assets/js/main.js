/*
 * PowerFit - JavaScript Principal
 * Carga componentes comunes y maneja funcionalidades globales
 */

(function () {

  function obtenerRutaBase() {
    const ruta = window.location.pathname.replace(/\\/g, '/');
    return ruta.includes('/pages/') ? '../../' : './';
  }

  function loadComponent(target, url, cb) {
    const $el = $(target);
    if (!$el.length) return;

    console.log(`Intentando cargar: ${url}`);
    $el.load(url, function (_, status) {
      if (status !== 'success') {
        console.warn(`No se pudo cargar: ${url}`);
      } else {
        console.log(`✓ Componente cargado: ${url}`);
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
  });
})();
