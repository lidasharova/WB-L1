import jsonObject from './jsonObject.json' assert { type: 'json' };
//импортируем объект JSON
/* ЗАДАЧА
Реализовать функцию конвертации JSON в строку
*/


//Напишем полифил для метода JSON.stringify который преобразует JavaScript-объекты в строку JSON. (упрощенную версию метода)
function stringify(data) {
  if (data === undefined) return undefined; // Если `data` равно `undefined`, вернем `undefined`.
  if (data === null) return 'null'; // Если `data` равно `null`, вернем строку 'null'.
  if (data.toString() === 'NaN') return 'null'; // Если `data` преобразуется в строку 'NaN', вернем строку 'null'.
  if (data === Infinity) return 'null'; // Если `data` равно `Infinity`, вернем строку 'null'.

  // Если `data` является строкой, обрамляем ее двойными кавычками и экранируем символы `"` внутри.
  if (data.constructor === String) return '"' + data.replace(/"/g, '\\"') + '"';

  // Если `data` является числом, возвращаем его в виде строки.
  if (data.constructor === Number) return String(data);

  // Если `data` является булевым значением, возвращаем его как 'true' или 'false'.
  if (data.constructor === Boolean) return data ? 'true' : 'false';

  // Если `data` является массивом, сериализуем каждый элемент массива и объединяем в строку.
  if (data.constructor === Array)
    return (
      '[' +
      data
        .reduce((acc, value) => {
          if (value === undefined || value === NaN || value === Infinity)
            return [...acc, 'null'];
          // Если элемент массива `undefined`, `NaN` или `Infinity`, заменяем на 'null'.
          else return [...acc, stringify(value)]; // Рекурсивно вызываем `stringify` для каждого элемента.
        }, [])
        .join(',') +
      ']'
    );

  // Если `data` является объектом, сериализуем каждую пару "ключ-значение" и объединяем в строку.
  if (data.constructor === Object)
    return (
      '{' +
      Object.keys(data)
        .reduce((acc, k) => {
          if (data[k] === undefined)
            return acc; // Пропускаем пары, где значение `undefined`.
          else return [...acc, stringify(k) + ':' + stringify(data[k])]; // Рекурсивно вызываем `stringify` для ключа и значения.
        }, [])
        .join(',') +
      '}'
    );

  return '{}'; // Если `data` не соответствует ни одному из вышеперечисленных типов, вернем пустой объект '{}'.
}

const jsonStr = stringify(jsonObject);
console.log(jsonStr);
