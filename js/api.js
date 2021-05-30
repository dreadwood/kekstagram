const URL_LOAD = 'https://22.javascript.pages.academy/kekstagram/data';
const URL_UPLOAD = 'https://22.javascript.pages.academy/kekstagram';

const SEND_ERROR_MESSAGE = 'Не удалось отправить изображение. Попробуйте еще раз.';
const GET_ERROR_MESSAGE = 'Не удалось загрузить приложение. Попробуйте позже.';

const getData = (onSuccess, onFall) => {
  fetch(URL_LOAD)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onFall(GET_ERROR_MESSAGE));
};

const sendData = (onSuccess, onFall, body) => {
  fetch(URL_UPLOAD, {
    method: 'POST',
    type: 'multipart/form-data',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFall(SEND_ERROR_MESSAGE);
      }
    })
    .catch(() => onFall(SEND_ERROR_MESSAGE));
};

export {
  getData,
  sendData,
};
