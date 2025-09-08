/* login.js - Simulación de sesión (nombres en español) */

// Simulación de base de datos de usuarios registrados
const usuariosRegistrados = [
  { email: 'admin@powerfit.com', password: '123456' },
  { email: 'usuario@powerfit.com', password: 'powerfit2024' },
  { email: 'test@gmail.com', password: 'test123' },
];

function estaLogueado() {
  return !!localStorage.getItem('pf_sesion');
}

function guardarSesion(datos) {
  localStorage.setItem('pf_sesion', JSON.stringify(datos));
}

function borrarSesion() {
  localStorage.removeItem('pf_sesion');
}

function validarCredenciales(email, password) {
  return usuariosRegistrados.find(
    (usuario) => usuario.email === email && usuario.password === password
  );
}

function validarLogin($formulario) {
  let esValido = true;

  // Validar correo
  const $email = $('#login-email');
  const email = $email.val().trim();
  if (!email || !email.includes('@') || !email.includes('.')) {
    $email.addClass('is-invalid');
    esValido = false;
  } else {
    $email.removeClass('is-invalid').addClass('is-valid');
  }

  // Validar contraseña (solo que no esté vacía)
  const $password = $('#login-password');
  const password = $password.val().trim();
  if (!password) {
    $password.addClass('is-invalid');
    $password.next('.invalid-feedback').text('Ingresa tu contraseña.');
    esValido = false;
  } else {
    $password.removeClass('is-invalid').addClass('is-valid');
  }

  return esValido;
}

$(function () {
  const $formulario = $('#login-form');
  if (!$formulario.length) return;
  if (estaLogueado()) {
    const usuario = JSON.parse(localStorage.getItem('pf_sesion'));
    $('#login-status')
      .addClass('text-success')
      .text('Ya has iniciado sesión como ' + usuario.email + '.');
    $('#login-email').val(usuario.email);
  }
  $formulario.on('submit', function (e) {
    e.preventDefault();
    if (!validarLogin($formulario)) return;

    const email = $('#login-email').val().trim();
    const password = $('#login-password').val().trim();

    // Validar credenciales contra usuarios registrados
    const usuarioValido = validarCredenciales(email, password);

    if (!usuarioValido) {
      $('#login-status')
        .removeClass('text-success')
        .addClass('text-danger')
        .text('Credenciales incorrectas. Verifica tu correo y contraseña.');
      return;
    }

    const usuario = {
      email: email,
      ts: Date.now(),
    };

    guardarSesion(usuario);
    $('#login-status')
      .removeClass('text-danger')
      .addClass('text-success')
      .text('¡Bienvenido! Iniciando sesión...');
    setTimeout(() => (window.location.href = '../perfil/perfil.html'), 1200);
  });
});
