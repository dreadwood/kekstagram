import {isEscEvent} from './utils.js';

const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;

const uploadElement = document.querySelector('.img-upload');
// const form = uploadElement.querySelector('.img-upload__form');
const inputUpload = uploadElement.querySelector('.img-upload__input');
const editor = uploadElement.querySelector('.img-upload__overlay');
const photo = uploadElement.querySelector('.img-upload__preview img');
const btnClose = uploadElement.querySelector('.img-upload__cancel');

const scaleElements = uploadElement.querySelector('.img-upload__scale');
const btnScaleDown = scaleElements.querySelector('.scale__control--smaller');
const btnScaleUp = scaleElements.querySelector('.scale__control--bigger');
const inputScale = scaleElements.querySelector('.scale__control--value');

const changeScalePhoto = (currentScale, selectedScale) => {
  if (currentScale !== selectedScale) {
    inputScale.value = `${selectedScale}%`;
    photo.style.transform = `scale(${selectedScale / 100})`;
  }
};

scaleElements.addEventListener('click', (evt) => {
  const currentScale = parseInt(inputScale.value);
  switch (evt.target) {
    case btnScaleDown:
      if (currentScale > MIN_SCALE) {
        changeScalePhoto(currentScale, (currentScale - STEP_SCALE));
      }
      break;
    case btnScaleUp:
      if (currentScale < DEFAULT_SCALE) {
        changeScalePhoto(currentScale, (currentScale + STEP_SCALE));
      }
      break;
    case inputScale:
      changeScalePhoto(currentScale, DEFAULT_SCALE);
      break;
  }
});


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
