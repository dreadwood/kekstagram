import {isEscEvent} from './utils.js';
import '../nouislider/nouislider.js';

const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const LEFT_MOUSE_CODE = 0;

const FilterOptions = {
  Chrome: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
  },
  Sepia: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
  },
  Marvin: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
  },
  Phobos: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
  },
  Heat: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
  },
};

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

const effectsElements = uploadElement.querySelector('.img-upload__effects');
const inputEffect = uploadElement.querySelector('.effect-level__value');
const slider = uploadElement.querySelector('.effect-level__slider');

// ограничить слайдер по краям, чтобы range не прилипал
// удалть лишние css классы
// написать функцию сброс параметров у uploadElement или просто сброс формы
// разбить на модули этот файл

const sliderUpdateHandler = (values, handle) => {
  const value = parseFloat(values[handle]);
  inputEffect.value = value;
  photo.style.setProperty('--filter-value', value);
};

const updateSlider = ({MIN: min, MAX: max, STEP: step}) => {
  const options = {
    start: max,
    step: step,
    connect: 'lower',
    range: {
      min: min,
      max: max,
    },
  };

  if (slider.noUiSlider) {
    slider.noUiSlider.updateOptions(options);
  } else {
    // eslint-disable-next-line no-undef
    noUiSlider.create(slider, options);
    slider.noUiSlider.on('update', sliderUpdateHandler);
  }
};

effectsElements.addEventListener('change', (evt) => {
  photo.className = '';
  photo.classList.add(`effects__preview--${evt.target.value}`);

  switch (evt.target.value) {
    case 'none':
      if (slider.noUiSlider) {
        slider.noUiSlider.destroy();
      }
      inputEffect.value = ''; // вынести?
      break;
    case 'chrome':
      updateSlider(FilterOptions.Chrome);
      break;
    case 'sepia':
      updateSlider(FilterOptions.Sepia);
      break;
    case 'marvin':
      updateSlider(FilterOptions.Marvin);
      break;
    case 'phobos':
      updateSlider(FilterOptions.Phobos);
      break;
    case 'heat':
      updateSlider(FilterOptions.Heat);
      break;
  }
});

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

editor.addEventListener('mousedown', (evt) => {
  if (evt.target === editor && evt.button === LEFT_MOUSE_CODE) {
    hiddenEditor();
  }
});
