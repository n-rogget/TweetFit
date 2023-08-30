/* eslint-disable no-alert */
import { signIn } from '../lib/index.js';

function login(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('loginSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = 'images/logo-login.png';
  imageLogo.alt = 'Logo TweetFit';
  imageLogo.classList.add('logoImg');
  const slogan = document.createElement('h7');
  slogan.classList.add('sloganstyle');
  const sectionGeneral = document.createElement('section');
  sectionGeneral.classList.add('generalLogin');
  const title = document.createElement('h2');
  const inputEmail = document.createElement('input');
  inputEmail.classList.add('input-login');
  inputEmail.setAttribute('id', 'inputEmail');
  const inputPass = document.createElement('input');
  inputPass.classList.add('input-login');
  inputPass.setAttribute('id', 'inputPass');
  inputPass.type = 'password';
  const buttonLogin = document.createElement('button');
  buttonLogin.classList.add('login-button');
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('button-return');
  const errorAlert = document.createElement('p');
  errorAlert.classList.add('error');
  const resetpassSection = document.createElement('section');
  resetpassSection.classList.add('resetpass-section');
  const restorePass = document.createElement('p');
  restorePass.classList.add('restorePassP');
  const resetPass = document.createElement('a');
  resetPass.classList.add('restorePassA');
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  resetPass.textContent = '¿Olvidaste tu contraseña?';
  restorePass.textContent = 'Recupérala aquí';
  title.textContent = 'Inicia sesión';
  buttonLogin.textContent = 'Ingresar';

  slogan.textContent = '¡Juntos podemos lograr grandes resultados!';
  buttonReturn.textContent = 'Volver atrás';

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });
  restorePass.addEventListener('click', () => {
    navigateTo('/resetPassword');
  });
  buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const getEmail = inputEmail.value;
    const getPass = inputPass.value;
    const error1 = document.querySelector('.error');

    try {
      const userCredential = await signIn(getEmail, getPass);

      if (userCredential.user.emailVerified) {
        // El usuario está autenticado y su correo está verificado.
        navigateTo('/feed');
      } else {
        error1.textContent = 'Aun no verificas tu email';
      }
    } catch (error) {
      // Manejar el error de autenticación o verificación de correo aquí.
      if (error.code === 'auth/user-not-found') {
        error1.textContent = 'Usuario no encontrado. Verifica tus credenciales.';
        // alert('Usuario no encontrado. Verifica tus credenciales.');
      } else if (error.code === 'auth/wrong-password') {
        error1.textContent = 'Contraseña incorrecta. Verifica tus datos.';
        // alert('Contraseña incorrecta. Verifica tus credenciales.');
      } else if (error.code === 'auth/user-disabled') {
        error1.textContent = 'Tu cuenta ha sido deshabilitada.';
        // alert('Tu cuenta ha sido deshabilitada. Contacta al soporte.');
      } else if (error.code === 'auth/user-mismatch') {
        error1.textContent = 'Hay un problema con tu cuenta.';
        // alert('Hay un problema con tu cuenta. Contacta al soporte.');
      } /* else {
        // error1.textContent = 'Ocurrió un error. Intenta nuevamente.';
        alert('Ocurrió un error. Por favor, intenta nuevamente.');
      } */
    }
  });

  sectionLogo.append(imageLogo, slogan);
  // eslint-disable-next-line max-len
  sectionGeneral.append(title, inputEmail, inputPass, errorAlert, buttonLogin, buttonReturn, resetpassSection);
  section.append(sectionLogo, sectionGeneral);
  resetpassSection.append(resetPass, restorePass);

  return section;
}

export default login;
