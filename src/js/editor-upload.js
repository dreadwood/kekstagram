const FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const initFileUpload = (inputUpload, photo, cb) => {
  inputUpload.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    const matches = FILE_TYPES.some((it) => file.type === it);

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        photo.src = reader.result;
        cb();
      });

      reader.readAsDataURL(file);
    }
  });
};

export {
  initFileUpload,
};
