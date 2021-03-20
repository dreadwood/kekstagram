const bigPicture  = document.querySelector('.big-picture');
const btnClose  = bigPicture.querySelector('.big-picture__cancel');
const img  = bigPicture.querySelector('.big-picture__img img');
const description  = bigPicture.querySelector('.social__caption');
const likes  = bigPicture.querySelector('.likes-count');
const commentsInfo  = bigPicture.querySelector('.social__comment-count');
const commentsCount  = bigPicture.querySelector('.comments-count');
const btnCommentsLoader  = bigPicture.querySelector('.comments-loader');

// временно скрывает ненужные поля
commentsInfo.classList.add('hidden');
btnCommentsLoader.classList.add('hidden');

const showBigPicture = (imgData) => {
  img.src = imgData.url;
  description.textContent = imgData.description;
  likes.textContent = imgData.likes;
  commentsCount.textContent = imgData.comments.length;

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
