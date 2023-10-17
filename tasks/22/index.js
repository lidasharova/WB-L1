/*ЗАДАЧА
  Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат.
  */

//Метод document.write()записывает строку текста в поток документа

//1 вариант
//мы можем вставить функцию внутрь document.write(). Функция myFuncWrite вызывает саму себя внутри document.write(myFuncWrite()). Это приведет к бесконечным рекурсивным вызовам функции, так как каждый вызов myFuncWrite() в document.write вызывает новый вызов myFuncWrite, который в свою очередь вызывает еще один вызов и так далее. Как результат, стек вызовов переполняется, и браузер сразу выдаст ошибку.
function funcWrite() {
  try {
    // вызываем функцию myFuncWrite() которая содержит document.write() внутри document.write()
    document.write(funcWrite());
  } catch (error) {
    document.write('Error: ' + error.message);
  }
}
funcWrite();

//2 вариант
//мы можем только посчитать сколько раз можно вызвать эту функцию, до заполнения коллстэка c помощью рекурсии
//создадим счетчик для подсчета кол-ва вызовов
let count = 0;
function myFuncWrite() {
  try {
    document.write(`<p>счетчик вызова функции:${count}</p>`);
    count++;
    myFuncWrite(); // вызываем функцию myFuncWrite() внутри document.write
  } catch (error) {
    console.log(` ${count}`);
    document.write('Error: ' + error.message);
  }
}
myFuncWrite();

//мой результат в браузере  Google Chrome -  6881 вызовов
