const bigPicture  = document.querySelector('.big-picture');
const btnClose  = bigPicture.querySelector('.big-picture__cancel');
const img  = bigPicture.querySelector('.big-picture__img img');
const description  = bigPicture.querySelector('.social__caption');
const likes  = bigPicture.querySelector('.likes-count');
const commentsInfo  = bigPicture.querySelector('.social__comment-count');
const commentsCount  = bigPicture.querySelector('.comments-count');
const commentsList  = bigPicture.querySelector('.social__comments');
const btnCommentsLoader  = bigPicture.querySelector('.comments-loader');
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

const showBigPicture = (imgData) => {
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


  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

const hiddenBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

btnClose.addEventListener('click', () => {
  hiddenBigPicture();
});

bigPicture.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('overlay')) {
    hiddenBigPicture();
  }
});

export {
  showBigPicture,
};
