/* Задача 4
Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:

112 сообщения
12 сообщений
1 сообщение
1024 пользователя
1026 пользователей
121 пользователь

	Функцию надо упаковать в модуль.


РЕШЕНИЕ
- преобразуем число в строку и получаем абсолютное значение
- получаем последний символ строки (последнюю цифру числа)
- проверяем специфические правила для разных случаев
- если последние две цифры числа равны 11, 12, 13, 14, то используем третью форму
- если последняя цифра равна 1, то используем первую форму
- если последняя цифра от 2 до 4, то используем вторую форму
- в остальных случаях используем третью форму
*/

export const getWordFromNumber = (number, textForms) => {
  const numberStr = Math.abs(number).toString();
  const lastDigit = numberStr.slice(-1);
  if (numberStr.length >= 2 && numberStr.slice(-2, -1) === '1') {
    return `${number} ${textForms[2]}`;
  }
  if (lastDigit === '1') {
    return `${number} ${textForms[0]}`;
  }
  if (lastDigit >= '2' && lastDigit <= '4') {
    return `${number} ${textForms[1]}`;
  }
  return `${number} ${textForms[2]}`;
};

/* 2 вариант

 РЕШЕНИЕ
- берем абсолютное значение числа number с помощью Math.abs()
- вычисляем ОСТАТОК от деления на 100 с помощью оператора %, для определения последних двух цифр числа абсолютного, которые могут использоваться для определения формы слова.
- Вычисляем остаток от деления первого ОСТАТКА на 10.
Это дает  последнюю цифру числа абсолютного числа, которая может быть важной для определения формы слова.
Проверка на специфичные случаи:
- Если абсолютное число находится в диапазоне от 11 до 19 включительно (числа, оканчивающиеся на 11-19), то возвращаем форму из textForms[2], так как для этих чисел форма может быть особой.
- Проверка на форму в зависимости от числа n:
- Если n находится в диапазоне от 2 до 4 включительно, то возвращаем форму из textForms[1], так как это общая форма для чисел, оканчивающихся на 2-4.
- Если n равно 1, то возвращаем форму из textForms[0], так как это форма для чисел, оканчивающихся на 1.
- Если ни одно из вышеуказанных условий не выполняется, то возвращаем форму из textForms[2] как форму по умолчанию.


АРГУМЕНТЫ ФУНКЦИИ:
number - число предметов
textForms - это массив со словами в форме -  [Им.п ед, Род.п ед, Род.п множ]
//например - [цветок, цветка, цветков]
*/

export const getWordFromNumberToo = (number, textForms) => {
  let absolutNumber = Math.abs(number) % 100;
  let n = absolutNumber % 10;
  if (absolutNumber > 10 && absolutNumber < 20) {
    return `${number} ${textForms[2]}`;
  }
  if (n > 1 && n < 5) {
    return `${number} ${textForms[1]}`;
  }
  if (n == 1) {
    return `${number} ${textForms[0]}`;
  }
  return `${number} ${textForms[2]}`;
};

//примеры использования
console.log(
  getWordFromNumber(112, ['пользователь', 'пользователя', 'пользователей'])
); // 112 пользователей
console.log(
  getWordFromNumber(12, ['пользователь', 'пользователя', 'пользователей'])
); // 12 пользователей
console.log(
  getWordFromNumber(1, ['пользователь', 'пользователя', 'пользователей'])
); // 1 пользователь
console.log(getWordFromNumber(5, ['минута', 'минуты', 'минут'])); // 5 минут

console.log(
  getWordFromNumberToo(1024, ['пользователь', 'пользователя', 'пользователей'])
); // 1024 пользователя
console.log(
  getWordFromNumberToo(1026, ['пользователь', 'пользователя', 'пользователей'])
); // 1026 пользователей
console.log(
  getWordFromNumberToo(121, ['пользователь', 'пользователя', 'пользователей'])
); // 121 пользователь

console.log(getWordFromNumberToo(5, ['минута', 'минуты', 'минут'])); // 5 минут
