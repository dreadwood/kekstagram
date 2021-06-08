import {isEscEvent} from './utils.js';

const mainElement = document.querySelector('main');
const errorAppTemplate = document.querySelector('#error-app')
  .content.querySelector('.error');
const errorTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');

const renderMesssageElement = (tempale) => {
  const messsageElement = tempale.cloneNode(true);
  const btnClose = messsageElement.querySelector('.button-close');
  const btnReboot = messsageElement.querySelector('.button-reboot');

  if (btnClose) {
    const escKeydownHandler = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        messsageElement.remove();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    document.addEventListener('keydown', escKeydownHandler);

    btnClose.addEventListener('click', () => {
      messsageElement.remove();
      document.removeEventListener('keydown', escKeydownHandler);
    });

    messsageElement.addEventListener('click', (evt) => {
      if (evt.target === messsageElement) {
        messsageElement.remove();
      }
    });
  }

  if (btnReboot) {
    btnReboot.addEventListener('click', () => {
      location.reload();
    });
  }

  mainElement.appendChild(messsageElement);
};

const showAppError = () => {
  renderMesssageElement(errorAppTemplate);
};

const showError = () => {
  renderMesssageElement(errorTemplate);
};

const showSuccess = () => {
  renderMesssageElement(successTemplate);
};

export {
  showAppError,
  showError,
  showSuccess,
};
