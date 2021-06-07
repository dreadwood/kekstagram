import {showBigPhoto} from './big-photo.js';
import {filteringPhoto} from './filter.js';

const photoContainer = document.querySelector('.pictures');
const smallPhotoTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const renderSmallPhoto = (imgData) => {
  const photoElement = smallPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = imgData.url;
  photoElement.querySelector('.picture__likes')
    .textContent = imgData.likes;
  photoElement.querySelector('.picture__comments')
    .textContent = imgData.comments.length;
  photoElement.dataset.id = imgData.id;

  return photoElement;
};

const clearFeed = () => {
  const photos = photoContainer.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

const renderPhotoFeed = (data) => {
  clearFeed();
  const filteredPhotos = filteringPhoto(data);

  const fragment = document.createDocumentFragment();
  filteredPhotos.forEach((imgData) => {
    const photoElement = renderSmallPhoto(imgData);
    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPhoto(imgData);
    });
    fragment.appendChild(photoElement);
  });
  photoContainer.appendChild(fragment);
};

export {
  renderPhotoFeed,
};
