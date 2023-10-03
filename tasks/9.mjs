const jsonObject = require('./jsonObject.json');//импортируем объект JSON
/* ЗАДАЧА
Реализовать функцию конвертации JSON в строку


РЕШЕНИЕ
- мы используем встроенный метод JSON.stringify. Он принимает объект JSON и преобразует его в строку.
- если JSON невалиден или происходит другая ошибка, мы перехватываем ее с помощью блока try/catch
*/

function convertToString(jsonObject) {
  try {
    const jsonString = JSON.stringify(jsonObject);
    return jsonString;
  } catch {
    console.error('JSON невалиден');
    return null;
  }
}

// Пример использования:
//передаем в ф-цию обьект из файла json
const jsonString = convertToString(jsonObject);
console.log(jsonString);
