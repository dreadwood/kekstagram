const URL_LOAD = 'https://22.javascript.pages.academy/kekstagram/data';
const URL_UPLOAD = 'https://22.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFall) => {
  fetch(URL_LOAD)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onFall());
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
        onFall();
      }
    })
    .catch(() => onFall());
};

export {
  getData,
  sendData,
};
