const smallPictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const renderSmallPicture = (imgData) => {
  const pictureElement = smallPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = imgData.url;
  pictureElement.querySelector('.picture__likes')
    .textContent = imgData.likes;
  pictureElement.querySelector('.picture__comments')
    .textContent = imgData.comments.length;
  pictureElement.dataset.id = imgData.id;

  return pictureElement;
};

export {
  renderSmallPicture,
};
