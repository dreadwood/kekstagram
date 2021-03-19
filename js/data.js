import {getRandomInteger, createArrayDontRepeatNum} from './utils.js';

const MESSAGE_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Суанда',
  'Мзауч',
  'Хамид',
  'Туказбан',
  'Герда',
  'Лаймон',
  'Аполлон',
  'Гавриила',
  'Ефим',
  'Лена',
];

const MAX_NUMBER_COMMENTS = 6;

/**
 * @param {number} id
 * @return {Object} Создает объект — комментарий
 */
const createComment = (id) => {
  return {
    id,
    avatar: `img/avatar-${id}.svg`,
    message: MESSAGE_TEXTS[getRandomInteger(MESSAGE_TEXTS.length - 1)],
    name: NAMES[getRandomInteger(NAMES.length - 1)],
  };
};


/**
 * @param {number} id
 * @return {Object} Создает объект — фотография
 */
const createPhoto = (id) => {
  const numberComments = getRandomInteger(MAX_NUMBER_COMMENTS);
  const comments = createArrayDontRepeatNum(numberComments).map(num => createComment(num));

  return {
    id,
    url: `photos/${id}.jpg`,
    description: 'Потрясающее фото',
    likes: getRandomInteger(15, 200),
    comments,
  };
};

export {
  createPhoto,
};
