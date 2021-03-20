import {createPhoto} from './data.js';
import {createArrayDontRepeatNum} from './utils.js';
import {renderPicture} from './render.js';

const MAX_NUMBER_PHOTOS = 25;

const picturesElement = document.querySelector('.pictures');

const photos = createArrayDontRepeatNum(MAX_NUMBER_PHOTOS).map(num => createPhoto(num));

const fragment = document.createDocumentFragment();
photos.forEach((photo) => {
  const pictureElement = renderPicture(photo);
  fragment.appendChild(pictureElement);
});
picturesElement.appendChild(fragment);
