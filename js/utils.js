/**
 * @param {number} num1
 * @param {number} num2
 * @return {number} Случайное целове число
 */
const getRandomInteger = (num1, num2 = 0) => {
  if (num1 === num2) {
    return num1;
  }
  const min = (num1 > num2) ? num2 : num1;
  const max = (num1 > num2) ? num1 : num2;
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


/**
 * @param {string} str
 * @param {number} maxLength
 * @return {Boolean} Проверяет длину строки
 */
const checkStrLength = (str, maxLength) => {
  return (str.length <= maxLength) ? true : false;
};


/**
 * @param {number} minNum
 * @param {number} maxNum
 * @return {Array} Создает массив неповторяющихся целых чисел
 */
const createArrayDontRepeatNum = (maxNum, minNum = 1) => {
  const length = maxNum - minNum + 1;
  const setNum = new Set;

  while (setNum.size < length) {
    setNum.add(getRandomInteger(minNum, maxNum));
  }

  return [...setNum];
};


/**
 * @param {Array} arr
 * @return {Array} Создает массив перемешеннаных значений
 */
const makeRandomArr = (arr) => [...arr].sort(() => Math.random() - 0.5);


/**
* @param {number} max
* @return {Array} Создает массив последовательностью чисел
*/
const createArrSequenceNum = (max) => [...(new Array(max).keys())].map(item => item + 1);


export {
  getRandomInteger,
  checkStrLength,
  createArrayDontRepeatNum,
  makeRandomArr,
  createArrSequenceNum,
};
