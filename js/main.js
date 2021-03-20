import {createPhoto} from './data.js';
import {createArrayDontRepeatNum} from './utils.js';
import {renderSmallPicture} from './render.js';

const MAX_NUMBER_PHOTOS = 25;

const picturesElement = document.querySelector('.pictures');

const photos = createArrayDontRepeatNum(MAX_NUMBER_PHOTOS).map(num => createPhoto(num));

const fragment = document.createDocumentFragment();
photos.forEach((photo) => {
  const pictureElement = renderSmallPicture(photo);
  fragment.appendChild(pictureElement);
});
picturesElement.appendChild(fragment);

const bigPicture  = document.querySelector('.big-picture');
const bigPictureBtnClose  = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg  = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes  = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount  = bigPicture.querySelector('.comments-count');
const bigPictureDescription  = bigPicture.querySelector('.social__caption');
const bigPictureCommentsInfo  = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader  = bigPicture.querySelector('.comments-loader');

bigPictureCommentsInfo.classList.add('hidden');
bigPictureCommentsLoader.classList.add('hidden');

const showBigPicture = (imgData) => {
  bigPictureImg.src = imgData.url;
  bigPictureLikes.textContent = imgData.likes;
  bigPictureCommentsCount.textContent = imgData.comments.length;
  bigPictureDescription.textContent = imgData.description;

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

const hiddenBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

picturesElement.addEventListener('click', (evt) => {
  const selectedPicture = evt.target.closest('.picture');
  if (selectedPicture) {
    evt.preventDefault();
    const imgData = photos.find((photo) => photo.id == +selectedPicture.dataset.id);
    showBigPicture(imgData);
  }
});

bigPictureBtnClose.addEventListener('click', () => {
  hiddenBigPicture();
});

bigPicture.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('overlay')) {
    hiddenBigPicture();
  }
});
