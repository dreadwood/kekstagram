const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;

const initScale = (uploadElement, photo) => {
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
};

export {
  initScale,
};
