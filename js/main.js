import {getData} from './api.js';
import {renderPhotoFeed} from './feed.js';
import './editor.js';

// TO-DO
// переименовать big-picture.js (возможно в post.js)
// убрать лишние функции из utils.js

// const MAX_NUMBER_PHOTOS = 25;

getData(renderPhotoFeed);
