import {isEscEvent} from './utils.js';

const uploadElement = document.querySelector('.img-upload');
// const form = uploadElement.querySelector('.img-upload__form');
const inputUpload = uploadElement.querySelector('.img-upload__input');
const editor = uploadElement.querySelector('.img-upload__overlay');
const btnClose = uploadElement.querySelector('.img-upload__cancel');


const showEditor = () => {
  document.addEventListener('keydown', escKeydownHandler);

  editor.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hiddenEditor = () => {
  inputUpload.value = '';
  editor.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const escKeydownHandler = (evt) => {
  evt.preventDefault();
  if (isEscEvent(evt)) {
    hiddenEditor();
  }
  document.removeEventListener('keydown', escKeydownHandler);
};

btnClose.addEventListener('click', () => {
  hiddenEditor();
});

// inputUpload.addEventListener('change', (evt) => {
//   showEditor();
// });

// временно, пока не загружается нужное изображение
inputUpload.addEventListener('click', (evt) => {
  evt.preventDefault();
  showEditor();
});

editor.addEventListener('click', (evt) => {
  if (evt.target === editor) {
    hiddenEditor();
  }
});
