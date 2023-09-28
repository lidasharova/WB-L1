/* Задача 2
Задача о странных числах: Напишите функцию, которая принимает число и возвращает true, если это число является странным, и false в противном случае. Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.
 */

/* РЕШЕНИЕ
 - проверим, что аргумент функции положительное число
 - создадим массив с делителями числа
 - проходимся в цикле по всем числам -делителям и проверяем делится ли число на делитель без остатка
 - если да, то добавляем делитель в конец массива
 - находим сумму этих делителей из массива методом .reduce
 - сравниваем сумму с переданным аргументом
 - если это странное число, то вернется - true
 */

const isStrangeNumber = (randomNumber) => {
  if (typeof randomNumber === 'number' && randomNumber !== 0) {
    const arrayDivider = [];
    for (let i = 0; i < randomNumber; i++) {
      if (randomNumber % i === 0) {
        arrayDivider.push(i);
      }
    }
    const sumDivider = arrayDivider.reduce((a, b) => a + b, 0);
    return sumDivider === randomNumber;
  } else {
    return 'аргумент функции не является числом или равен 0 или это пустая строка';
  }
};

console.log(isStrangeNumber(6)); //true
