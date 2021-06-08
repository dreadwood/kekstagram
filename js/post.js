import {isEscEvent} from './utils.js';

const NUMBER_COMMENTS_TO_SHOW = 5;

const post  = document.querySelector('.big-picture');
const btnClose  = post.querySelector('.big-picture__cancel');
const img  = post.querySelector('.big-picture__img img');
const description  = post.querySelector('.social__caption');
const likes  = post.querySelector('.likes-count');
const commentsCount  = post.querySelector('.comments-count');
const numberCommentsShow  = post.querySelector('.number-comments-show');
const commentsList  = post.querySelector('.social__comments');
const btnLoader  = post.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment')
  .content.querySelector('.social__comment');

let comments;
let currentCommentsNumber;
let totalCommentsNumber;

const renderComment = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const avatar = commentElement.querySelector('.social__picture');
  avatar.src = commentData.avatar;
  avatar.alt = commentData.name;
  commentElement.querySelector('.social__text')
    .textContent = commentData.message;

  return commentElement;
};

const addComments = () => {
  const fragment = document.createDocumentFragment();
  comments.slice(currentCommentsNumber, totalCommentsNumber)
    .forEach((comment) => {
      const commentElement = renderComment(comment);
      fragment.appendChild(commentElement);
    });
  commentsList.appendChild(fragment);
};

const btnLoaderClickHandler = () => {
  currentCommentsNumber = totalCommentsNumber;
  totalCommentsNumber = currentCommentsNumber + NUMBER_COMMENTS_TO_SHOW;

  if (totalCommentsNumber >= comments.length) {
    btnLoader.classList.add('hidden');
    numberCommentsShow.textContent = comments.length;
    btnLoader.removeEventListener('click', btnLoaderClickHandler);
  } else {
    numberCommentsShow.textContent = totalCommentsNumber;
  }

  addComments();
};

const renderCommentList = () => {
  currentCommentsNumber = 0;
  totalCommentsNumber = currentCommentsNumber + NUMBER_COMMENTS_TO_SHOW;
  commentsCount.textContent = comments.length;
  commentsList.textContent = '';

  if (totalCommentsNumber >= comments.length) {
    btnLoader.classList.add('hidden');
    numberCommentsShow.textContent = comments.length;
  } else {
    btnLoader.classList.remove('hidden');
    numberCommentsShow.textContent = totalCommentsNumber;
    btnLoader.addEventListener('click', btnLoaderClickHandler);
  }

  addComments();
};

const showPost = (imgData) => {
  img.src = imgData.url;
  description.textContent = imgData.description;
  likes.textContent = imgData.likes;

  comments = imgData.comments;
  renderCommentList();

  document.addEventListener('keydown', escKeydownHandler);

  document.body.classList.add('modal-open');
  post.classList.remove('hidden');
};

const hiddenPost = () => {
  btnLoader.removeEventListener('click', btnLoaderClickHandler);
  post.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const escKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hiddenPost();
    document.removeEventListener('keydown', escKeydownHandler);
  }
};

btnClose.addEventListener('click', () => {
  hiddenPost();
});

post.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('overlay')) {
    hiddenPost();
  }
});

export {
  showPost,
};
