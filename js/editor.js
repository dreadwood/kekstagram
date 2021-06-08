import {sendData} from './api.js';
import {initScale} from './editor-scale.js';
import {initSlider, resetSlider} from './editor-slider.js';
import {tagsFieldInputHandler} from './editor-validation.js';
import {showSuccess, showError} from './messages.js';
import {isEscEvent} from './utils.js';

const FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const LEFT_MOUSE_CODE = 0;

const uploadElement = document.querySelector('.img-upload');
const form = uploadElement.querySelector('.img-upload__form');
const inputUpload = uploadElement.querySelector('.img-upload__input');
const editor = uploadElement.querySelector('.img-upload__overlay');
const photo = uploadElement.querySelector('.img-upload__preview img');
const btnClose = uploadElement.querySelector('.img-upload__cancel');

const tagsField = uploadElement.querySelector('.text__hashtags');
const commentsField = uploadElement.querySelector('.text__description');

const showEditor = () => {
  document.addEventListener('keydown', escKeydownHandler);

  editor.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideEditor = () => {
  document.removeEventListener('keydown', escKeydownHandler);

  form.reset();
  resetSlider();

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

inputUpload.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const matches = FILE_TYPES.some((it) => file.type === it);

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      photo.src = reader.result;
      showEditor();
    });

    reader.readAsDataURL(file);
  }
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(showSuccess, showError, new FormData(evt.target));
  hideEditor();
});

editor.addEventListener('mousedown', (evt) => {
  if (evt.target === editor && evt.button === LEFT_MOUSE_CODE) {
    hideEditor();
  }
});

initScale(uploadElement, photo);
initSlider(uploadElement, photo);

tagsField.addEventListener('input', tagsFieldInputHandler);
