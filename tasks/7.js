/*Задача 7

Задача о коллекции функций: у вас есть массив функций, напишите код, который вызовет каждую функцию в этом массиве и выведет их порядковый номер. Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
Другими словами, нужно выполнить следующие шаги:
Вызвать первую функцию из массива.
После завершения работы первой функции вызвать вторую функцию.
После завершения работы второй функции вызвать третью функцию.
И так далее, пока все функции в массиве не будут вызваны по порядку.

*/

// const functionsArray1 = [fn, fn1, fn2, fn3];

const functionsArray = [
  () => {
    console.log('Вызвана функция 1');
  },
  () => {
    console.log('Вызвана функция 2');
  },
  () => {
    console.log('Вызвана функция 3');
  },
];

/*РЕШЕНИЕ

т.к. нам нужно вызывать функции СТРОГО ПОСЛЕДОВАТЕЛЬНО - мы используем рекурсию - когда функция внутри себя вызывает себя же.

- поэтому просто вызовем первую функцию передав ее индекс из массива
- если индекс меньше длины массива, то просто вазовем эту функцию
- потом снова вызовем эту же ф-цию со следующми индексами,  пока все функции не будут вызваны ПОСЛЕДОВАТЕЛЬНО друг за другом
*/

function callFunctions(indexFn) {
  if (indexFn < functionsArray.length) {
    functionsArray[indexFn](); // Вызываем текущую функцию по индексу
    callFunctions(indexFn + 1); // Вызываем следующую функцию
  }
}

console.log(callFunctions(0)); //начнем с первой функции

//просто вызов в цикле for ( код ниже) приведет к тому, что функции будут вызваны не ПОСЛЕДОВАТЕЛЬНО друг за другом, а сразу же, не дожидаясь исполнения функции
const callFunctionsAll = (arrayFn) => {
  for (let i = 0; i < arrayFn.length; i++) {
    arrayFn[i]();
  }
};

console.log(callFunctionsAll(functionsArray));

/* 2 вариант
- можно дожидаться выполнения функций ПОСЛЕДОВАТЕЛЬНО с помощью promise
- сделаем так, что бы каждая функция в массиве возвращала нам РАЗРЕШЕННЫЙ ПРОМИС
- или обернем каждую в промис и они станут их асинхронными.
- вызваем каждую в цикле for с await
*/

const ArrayPromises = [
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Вызвана функция 1');
        resolve();
      }, 1000);
    });
  },
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Вызвана функция 2');
  },
];

async function callPromises() {
  for (let i = 0; i < functionsArray.length; i++) {
    await functionsArray[i]();
  }
}

// Начинаем выполнение функций
callPromises();
