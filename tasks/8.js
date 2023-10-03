/* ЗАДАЧА
Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.
*/

const ourArrayFunctions = [() => 1, () => 2, () => 3];

function callFunctionsAndReturnResults(functionsArray) {
  // Создаем и возвращаем новую функцию
  return function () {
    const results = []; // Создаем пустой массив для хранения результатов
    // Проходимся по каждой функции в нашем массиве и вызываем ее
    for (const func of functionsArray) {
      // Вызываем функцию и добавляем результат в массив
      results.push(func());
    }
    return results; // Возвращаем массив результатов после вызова всех функций
  };
}

// Пример
const newFunction = callFunctionsAndReturnResults(ourArrayFunctions);
const resultsArray = newFunction();
console.log(resultsArray); // [1, 2, 3]

//2 способ
// Используем метод map для вызова каждой функции и создания массива результатов
function callFunctionsAndReturnResults2(functionsArray) {
  return function () {
    return functionsArray.map((func) => func());
  };
}

// Пример
const newFunction2 = callFunctionsAndReturnResults2(ourArrayFunctions);
const resultsArray2 = newFunction2();
console.log(resultsArray); // [1, 2, 3]
