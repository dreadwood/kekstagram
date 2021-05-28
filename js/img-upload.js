import {isEscEvent} from './utils.js';
import '../nouislider/nouislider.js';

const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const LEFT_MOUSE_CODE = 0;
const TAG_SYMBOL = '#';
const TAG_SEPARATOR = ' ';
const TAG_PATTERN = /^[a-z0-9#]*$/i;
const TAG_LENGTH = 20;
const MAX_NUM_TAGS = 5;

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

const TagChecks = {
  hash: {
    check(tags) {
      return tags.some((tag) => tag[0] !== TAG_SYMBOL);
    },
    message: 'Хэш-тег должен начинается с символа #.',
  },
  empty: {
    check(tags) {
      return tags.some((tag) => tag.length === 1 && tag === TAG_SYMBOL);
    },
    message: 'Хеш-тег не может состоять только из #.',
  },
  quantity: {
    check(tags) {
      return tags.length > MAX_NUM_TAGS;
    },
    message: 'Нельзя указать больше 5 хэш-тегов.',
  },
  duplication: {
    check(tags) {
      return new Set(tags).size !== tags.length;
    },
    message: 'Один и тот же хэш-тег не может быть использован дважды.',
  },
  length: {
    check(tags) {
      return tags.some((tag) => tag.length > TAG_LENGTH);
    },
    message: 'Максимальная длина одного хэш-тега 20 символов, включая #.',
  },
  structure: {
    check(tags) {
      return tags.some((tag) => !TAG_PATTERN.test(tag));
    },
    message: 'Хеш-тег должен состоять только из буквы и чисел.',
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
const tagsInput = uploadElement.querySelector('.text__hashtags');
const commentsInput = uploadElement.querySelector('.text__description');

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

const hideEditor = () => {
  document.removeEventListener('keydown', escKeydownHandler);

  inputUpload.value = '';
  editor.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const escKeydownHandler = (evt) => {
  const focusElement = document.activeElement;

  if (isEscEvent(evt) &&
      focusElement !== tagsInput &&
      focusElement !== commentsInput) {
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

tagsInput.addEventListener('input', (evt) => {
  let errorMessage = '';
  const tags = evt.target.value.toLowerCase().split(TAG_SEPARATOR)
    .filter((item) => item !== '');

  if (TagChecks.hash.check(tags)) {
    errorMessage += `${TagChecks.hash.message}\n`;
  }

  if (TagChecks.empty.check(tags)) {
    errorMessage += `${TagChecks.empty.message}\n`;
  }

  if (TagChecks.quantity.check(tags)) {
    errorMessage += `${TagChecks.quantity.message}\n`;
  }

  if (TagChecks.duplication.check(tags)) {
    errorMessage += `${TagChecks.duplication.message}\n`;
  }

  if (TagChecks.length.check(tags)) {
    errorMessage += `${TagChecks.length.message}\n`;
  }

  if (TagChecks.structure.check(tags)) {
    errorMessage += `${TagChecks.structure.message}\n`;
  }

  tagsInput.setCustomValidity(errorMessage);
});
