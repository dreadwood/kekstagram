import {makeRandomArr} from './utils.js';

const DEBOUNCE_DELAY = 500;
const MAX_RANDOM_PHOTOS = 10;

const SortTypes = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filter = document.querySelector('.img-filters');
const filterBtns = filter.querySelectorAll('.img-filters__button');

const showFilter = (data, cb) => {
  filter.classList.remove('img-filters--inactive');

  let lastTimeout;

  filter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')
      && !evt.target.classList.contains('img-filters__button--active')) {
      filterBtns.forEach((btn) => {
        btn.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      });

      const sortPhotos = sortPhoto(data, evt.target.id);

      // cb();

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => cb(sortPhotos), DEBOUNCE_DELAY);
    }
  });
};

const sortPhoto = (dataPhoto, type) => {
  switch (type) {
    case SortTypes.RANDOM:
      return makeRandomArr(dataPhoto).slice(0, MAX_RANDOM_PHOTOS);
    case SortTypes.DISCUSSED:
      return dataPhoto.slice().sort((a, b) => b.comments.length - a.comments.length);
    case SortTypes.DEFAULT:
    default:
      return dataPhoto;
  }
};

export {
  showFilter,
};

// filter-default
// filter-random
// filter-discussed
