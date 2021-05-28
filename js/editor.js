import {isEscEvent} from './utils.js';
import {tagsFieldInputHandler} from './editor-validation.js';
import {initSlider} from './editor-slider.js';
import {initScale} from './editor-scale.js';

const LEFT_MOUSE_CODE = 0;

const uploadElement = document.querySelector('.img-upload');
// const form = uploadElement.querySelector('.img-upload__form');
const inputUpload = uploadElement.querySelector('.img-upload__input');
const editor = uploadElement.querySelector('.img-upload__overlay');
const photo = uploadElement.querySelector('.img-upload__preview img');
const btnClose = uploadElement.querySelector('.img-upload__cancel');

const tagsField = uploadElement.querySelector('.text__hashtags');
const commentsField = uploadElement.querySelector('.text__description');

// написать функцию сброс параметров у uploadElement или просто сброс формы

const showEditor = () => {
  document.addEventListener('keydown', escKeydownHandler);

  editor.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideEditor = () => {
  document.removeEventListener('keydown', escKeydownHandler);

  inputUpload.value = '';
  editor.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const escKeydownHandler = (evt) => {
  const focusElement = document.activeElement;

  if (isEscEvent(evt) &&
      focusElement !== tagsField &&
      focusElement !== commentsField) {
    evt.preventDefault();
    hideEditor();
  }
};

btnClose.addEventListener('click', () => {
  hideEditor();
});

inputUpload.addEventListener('change', () => {
  showEditor();
});

// временно, пока не загружается нужное изображение
// inputUpload.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   showEditor();
// });

editor.addEventListener('mousedown', (evt) => {
  if (evt.target === editor && evt.button === LEFT_MOUSE_CODE) {
    hideEditor();
  }
});

initScale(uploadElement, photo);
initSlider(uploadElement, photo);

tagsField.addEventListener('input', tagsFieldInputHandler);
