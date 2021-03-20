const pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const renderPicture = (imgData) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = imgData.url;
  pictureElement.querySelector('.picture__likes')
    .textContent = imgData.likes;
  pictureElement.querySelector('.picture__comments')
    .textContent = imgData.comments.length;

  return pictureElement;
};

export {
  renderPicture,
};
