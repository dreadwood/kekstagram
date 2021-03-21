const uploadElement = document.querySelector('.img-upload');
// const form = uploadElement.querySelector('.img-upload__form');
const btnUpload = uploadElement.querySelector('.img-upload__input');
const editor = uploadElement.querySelector('.img-upload__overlay');
const btnClose = uploadElement.querySelector('.img-upload__cancel');


const showEditor = () => {
  editor.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escKeydownHandler);
};

const hiddenEditor = () => {
  editor.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const escKeydownHandler = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    hiddenEditor();
  }
  document.removeEventListener('keydown', escKeydownHandler);
};

btnClose.addEventListener('click', () => {
  hiddenEditor();
});

// btnUpload.addEventListener('change', (evt) => {
//   showEditor();
// });

// временно, пока не загружается нужное изображение
btnUpload.addEventListener('click', (evt) => {
  evt.preventDefault();
  showEditor();
});

editor.addEventListener('click', (evt) => {
  if (evt.target === editor) {
    hiddenEditor();
  }
});
