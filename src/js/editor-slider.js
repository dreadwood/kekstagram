import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

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

let resetSlider;

const initSlider = (uploadElement, photo) => {
  const effectsElements = uploadElement.querySelector('.img-upload__effects');
  const inputEffect = uploadElement.querySelector('.effect-level__value');
  const slider = uploadElement.querySelector('.effect-level__slider');

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

  resetSlider = () => {
    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }
    photo.className = null;
    photo.style = null;
    inputEffect.value = null;
  };

  effectsElements.addEventListener('change', (evt) => {
    photo.className = `effects__preview--${evt.target.value}`;

    switch (evt.target.value) {
      case 'none':
        resetSlider();
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
};

export {
  initSlider,
  resetSlider,
};
