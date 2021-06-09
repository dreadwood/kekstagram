import {getData} from './api.js';
import {renderPhotoFeed} from './feed.js';
import {showFilter} from './filter.js';
import {showAppError} from './messages.js';
import './editor.js';
import {debounce} from './utils.js';

const DEBOUNCE_INTERVAL = 500;

getData(
  (data) => {
    renderPhotoFeed(data);
    showFilter(debounce(
      () => renderPhotoFeed(data),
      DEBOUNCE_INTERVAL,
    ));
  },
  showAppError,
);
