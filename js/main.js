import {renderSmallPicture} from './render.js';
import {showBigPicture} from './big-picture.js';
import {getData} from './api.js';
import './editor.js';

// TO-DO
// переименовать big-picture.js (возможно в post.js)
// убрать лишние функции из utils.js

// const MAX_NUMBER_PHOTOS = 25;
let photos;

const picturesElement = document.querySelector('.pictures');

const showPhotos = (dataJson) => {
  photos = dataJson;
  const fragment = document.createDocumentFragment();
  dataJson.forEach((photo) => {
    const pictureElement = renderSmallPicture(photo);
    fragment.appendChild(pictureElement);
  });
  picturesElement.appendChild(fragment);
};

getData(showPhotos);

// Открыть фото в модальном окне
picturesElement.addEventListener('click', (evt) => {
  const selectedPicture = evt.target.closest('.picture');
  if (selectedPicture) {
    evt.preventDefault();
    const imgData = photos.find((photo) =>
      photo.id === Number(selectedPicture.dataset.id));
    showBigPicture(imgData);
  }
});
