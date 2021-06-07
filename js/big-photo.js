import {isEscEvent} from './utils.js';

const NUMBER_COMMENTS_TO_SHOW = 5;

const bigPhoto  = document.querySelector('.big-picture');
const btnClose  = bigPhoto.querySelector('.big-picture__cancel');
const img  = bigPhoto.querySelector('.big-picture__img img');
const description  = bigPhoto.querySelector('.social__caption');
const likes  = bigPhoto.querySelector('.likes-count');
const commentsCount  = bigPhoto.querySelector('.comments-count');
const numberCommentsShow  = bigPhoto.querySelector('.number-comments-show');
const commentsList  = bigPhoto.querySelector('.social__comments');
const btnLoader  = bigPhoto.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment')
  .content.querySelector('.social__comment');

let comments;

const renderComment = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const avatar = commentElement.querySelector('.social__picture');
  avatar.src = commentData.avatar;
  avatar.alt = commentData.name;
  commentElement.querySelector('.social__text')
    .textContent = commentData.message;

  return commentElement;
};

const addComments = (start, end) => {
  const fragment = document.createDocumentFragment();
  comments.slice(start, end).forEach((comment) => {
    const commentElement = renderComment(comment);
    fragment.appendChild(commentElement);
  });
  commentsList.appendChild(fragment);
};

const btnLoaderClickHandler = () => {
  let сurrentAmount = +numberCommentsShow.textContent;
  const totalAmount = сurrentAmount + NUMBER_COMMENTS_TO_SHOW;

  if (totalAmount >= comments.length) {
    btnLoader.classList.add('hidden');
    numberCommentsShow.textContent = comments.length;
    btnLoader.removeEventListener('click', btnLoaderClickHandler);
  } else {
    numberCommentsShow.textContent = totalAmount;
  }

  addComments(сurrentAmount, totalAmount);
};

const renderCommentList = () => {
  numberCommentsShow.textContent = NUMBER_COMMENTS_TO_SHOW;
  commentsCount.textContent = comments.length;
  commentsList.textContent = '';
  btnLoader.classList.remove('hidden');

  addComments(0, NUMBER_COMMENTS_TO_SHOW);

  btnLoader.addEventListener('click', btnLoaderClickHandler);
};

// const clearBigPhoto = () => {
//   img.src = '';
//   description.textContent = '';
//   likes.textContent = '';
//   numberCommentsShow.textContent = '5';
//   commentsCount.textContent  = '';
//   commentsList.textContent = '';
//   btnLoader.classList.remove('hidden');
// };

const showBigPhoto = (imgData) => {
  img.src = imgData.url;
  description.textContent = imgData.description;
  likes.textContent = imgData.likes;

  comments = imgData.comments;

  renderCommentList();

  document.addEventListener('keydown', escKeydownHandler);

  document.body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
};

const hiddenBigPhoto = () => {
  btnLoader.removeEventListener('click', btnLoaderClickHandler);
  bigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const escKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hiddenBigPhoto();
    document.removeEventListener('keydown', escKeydownHandler);
  }
};

btnClose.addEventListener('click', () => {
  hiddenBigPhoto();
});

bigPhoto.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('overlay')) {
    hiddenBigPhoto();
  }
});

export {
  showBigPhoto,
};
