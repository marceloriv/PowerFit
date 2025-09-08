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
    // ! recordar que hay que renombrar los archivos si es que cambian de lugar o nombre
    loadComponent('#mainNav', 'components/mainNav.html', function () {
      if (window.PowerFit && typeof PowerFit.fixNavLinks === 'function') {
        PowerFit.fixNavLinks();
      }
    });
    loadComponent('#header', 'components/header.html');
  });
})();
