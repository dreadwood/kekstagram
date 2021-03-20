import {createPhoto} from './data.js';
import {createArrayDontRepeatNum} from './utils.js';
import {renderSmallPicture} from './render.js';
import {showBigPicture} from './big-picture.js';

const MAX_NUMBER_PHOTOS = 25;

const picturesElement = document.querySelector('.pictures');

const photos = createArrayDontRepeatNum(MAX_NUMBER_PHOTOS)
  .map(num => createPhoto(num));

const fragment = document.createDocumentFragment();
photos.forEach((photo) => {
  const pictureElement = renderSmallPicture(photo);
  fragment.appendChild(pictureElement);
});
picturesElement.appendChild(fragment);

picturesElement.addEventListener('click', (evt) => {
  const selectedPicture = evt.target.closest('.picture');
  if (selectedPicture) {
    evt.preventDefault();
    const imgData = photos.find((photo) =>
      photo.id === Number(selectedPicture.dataset.id));
    showBigPicture(imgData);
  }
});
