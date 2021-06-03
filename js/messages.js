import {isEscEvent} from './utils.js';

const mainElement = document.querySelector('main');
const errorTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');

const renderMesssageElement = (tempale) => {
  const messsageElement = tempale.cloneNode(true);
  const btnClose = messsageElement.querySelector('button');

  const escKeydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      messsageElement.remove();
      document.removeEventListener('keydown', escKeydownHandler);
    }
  };

  document.addEventListener('keydown', escKeydownHandler);

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      messsageElement.remove();
      document.removeEventListener('keydown', escKeydownHandler);
    });
  }

  messsageElement.addEventListener('click', (evt) => {
    if (evt.target === messsageElement) {
      messsageElement.remove();
    }
  });

  mainElement.appendChild(messsageElement);
};

const showError = () => {
  renderMesssageElement(errorTemplate);
};

const showSuccess = () => {
  renderMesssageElement(successTemplate);
};

export {
  showError,
  showSuccess,
};
