const TAG_SYMBOL = '#';
const TAG_SEPARATOR = ' ';
const TAG_PATTERN = /^[a-z0-9#]*$/i;
const TAG_LENGTH = 20;
const MAX_NUM_TAGS = 5;

const TagChecks = {
  hash: {
    check(tags) {
      return tags.some((tag) => tag[0] !== TAG_SYMBOL);
    },
    message: 'Хэш-тег должен начинается с символа #.',
  },
  empty: {
    check(tags) {
      return tags.some((tag) => tag.length === 1 && tag === TAG_SYMBOL);
    },
    message: 'Хеш-тег не может состоять только из #.',
  },
  quantity: {
    check(tags) {
      return tags.length > MAX_NUM_TAGS;
    },
    message: 'Нельзя указать больше 5 хэш-тегов.',
  },
  duplication: {
    check(tags) {
      return new Set(tags).size !== tags.length;
    },
    message: 'Один и тот же хэш-тег не может быть использован дважды.',
  },
  length: {
    check(tags) {
      return tags.some((tag) => tag.length > TAG_LENGTH);
    },
    message: 'Максимальная длина одного хэш-тега 20 символов, включая #.',
  },
  structure: {
    check(tags) {
      return tags.some((tag) => !TAG_PATTERN.test(tag));
    },
    message: 'Хеш-тег должен состоять только из буквы и чисел.',
  },
};

const tagsFieldInputHandler = (evt) => {
  let errorMessage = '';
  const tags = evt.target.value.toLowerCase().split(TAG_SEPARATOR)
    .filter((item) => item !== '');

  if (TagChecks.hash.check(tags)) {
    errorMessage += `${TagChecks.hash.message}\n`;
  }

  if (TagChecks.empty.check(tags)) {
    errorMessage += `${TagChecks.empty.message}\n`;
  }

  if (TagChecks.quantity.check(tags)) {
    errorMessage += `${TagChecks.quantity.message}\n`;
  }

  if (TagChecks.duplication.check(tags)) {
    errorMessage += `${TagChecks.duplication.message}\n`;
  }

  if (TagChecks.length.check(tags)) {
    errorMessage += `${TagChecks.length.message}\n`;
  }

  if (TagChecks.structure.check(tags)) {
    errorMessage += `${TagChecks.structure.message}\n`;
  }

  evt.target.setCustomValidity(errorMessage);
};

export {
  tagsFieldInputHandler,
};
