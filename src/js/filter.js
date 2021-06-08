import {makeRandomArr} from './utils.js';

const MAX_RANDOM_PHOTOS = 10;

const FilterTypes = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filter = document.querySelector('.img-filters');
const filterBtns = filter.querySelectorAll('.img-filters__button');

const showFilter = (cb) => {
  filter.classList.remove('img-filters--inactive');

  filter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')
      && !evt.target.classList.contains('img-filters__button--active')) {
      filterBtns.forEach((btn) => {
        btn.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      });

      cb();
    }
  });
};

const filteringPhoto = (dataPhoto) => {
  const type = document.querySelector('.img-filters__button--active').id;

  switch (type) {
    case FilterTypes.RANDOM:
      return makeRandomArr(dataPhoto).slice(0, MAX_RANDOM_PHOTOS);
    case FilterTypes.DISCUSSED:
      return dataPhoto.slice()
        .sort((a, b) => b.comments.length - a.comments.length);
    case FilterTypes.DEFAULT:
    default:
      return dataPhoto;
  }
};

export {
  showFilter,
  filteringPhoto,
};
