import {isEscEvent} from './utils.js';

const bigPhoto  = document.querySelector('.big-picture');
const btnClose  = bigPhoto.querySelector('.big-picture__cancel');
const img  = bigPhoto.querySelector('.big-picture__img img');
const description  = bigPhoto.querySelector('.social__caption');
const likes  = bigPhoto.querySelector('.likes-count');
const commentsInfo  = bigPhoto.querySelector('.social__comment-count');
const commentsCount  = bigPhoto.querySelector('.comments-count');
const commentsList  = bigPhoto.querySelector('.social__comments');
const btnCommentsLoader  = bigPhoto.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment')
  .content.querySelector('.social__comment');

// временно скрывает ненужные поля
commentsInfo.classList.add('hidden');
btnCommentsLoader.classList.add('hidden');

const renderComment = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const avatar = commentElement.querySelector('.social__picture');
  avatar.src = commentData.avatar;
  avatar.alt = commentData.name;
  commentElement.querySelector('.social__text')
    .textContent = commentData.message;

  return commentElement;
};

const showBigPhoto = (imgData) => {
  img.src = imgData.url;
  description.textContent = imgData.description;
  likes.textContent = imgData.likes;
  commentsCount.textContent = imgData.comments.length;

  const fragment = document.createDocumentFragment();
  imgData.comments.forEach((comment) => {
    const commentElement = renderComment(comment);
    fragment.appendChild(commentElement);
  });

  commentsList.textContent = '';
  commentsList.appendChild(fragment);

  document.addEventListener('keydown', escKeydownHandler);

  document.body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
};

const hiddenBigPhoto = () => {
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
