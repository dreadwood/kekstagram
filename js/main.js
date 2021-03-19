import {createPhoto} from './data.js';
import {createArrayDontRepeatNum} from './utils.js';

const MAX_NUMBER_PHOTOS = 25;

// eslint-disable-next-line no-unused-vars
const photos = createArrayDontRepeatNum(MAX_NUMBER_PHOTOS).map(num => createPhoto(num));
