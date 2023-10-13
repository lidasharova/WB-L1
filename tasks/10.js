/* ЗАДАЧА
Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
*/

function parseJSON(jsonString) {
  let index = 0; //индекс текущего символа в строке

  // ф-ция для пропуска пробелов
  function deleteSpaces() {
    while (/\s/.test(jsonString[index])) {
      index++; // увеличиваем индекс, пока символ является пробелом
    }
  }

  // ф-ция разбора возможных значений содержащихся в переданном обьекте JSON
  function parseValue() {
    deleteSpaces(); // пропустим пробелы
    const char = jsonString[index]; //получим текущий символ

    if (char === '{') {
      return parseObject(); // если это фигурная скобка, то парсим объект
    } else if (char === '[') {
      return parseArray(); // если это квадратная скобка, то парсим массив
    } else if (char === '"') {
      return parseString(); // если кавычка, то парсим строку
    } else if (char === 't' || char === 'f' || char === 'n') {
      return parseBooleanOrNull(); // если это "t", "f" или "n", парсим булевое значение -  true, false или null
    } else if (char === '-' || /\d/.test(char)) {
      return parseNumber(); // если это цифра или минус то парсим число
    } else {
      throw new Error(`Недопустимый символ в строке JSON: ${char}`);
    }
  }

  // Функция для разбора объекта JSON
  function parseObject() {
    index++; // пропуск открывающей скобки в объекте {
    const obj = {};
    while (jsonString[index] !== '}') {
      const key = parseString(); // получим ключ - строку
      deleteSpaces(); // пропустим пробелы
      if (jsonString[index] !== ':') {
        throw new Error(`Ожидалось ':' после ключа "${key}"`);
      }
      index++;
      const value = parseValue(); // получим значение
      obj[key] = value; // используем значение как ключ
      deleteSpaces(); // пропустим пробелы

      if (jsonString[index] === ',') {
        index++; // пропуск запятой
      }
    }

    index++; // пропуск закрывающей скобки }
    return obj;
  }

  // Ф-ция для разбора массива JSON
  function parseArray() {
    index++; // пропуск квадратной скобки [
    const arr = [];

    while (jsonString[index] !== ']') {
      const value = parseValue(); // получим значение
      arr.push(value);
      deleteSpaces();
      if (jsonString[index] === ',') {
        index++; //пропуск запятой
      }
    }
    index++; // пропуск закрывающей скобки ]
    return arr;
  }

  // Функция для разбора строки JSON
  function parseString() {
    index++; // пропуск открывающей кавычки
    let result = '';
    while (jsonString[index] !== '"') {
      // если текущий символ - экранированный символ
      if (jsonString[index] === '\\') {
        index++; // пропустим обратный слэш
        const escapeChar = jsonString[index]; // сохраним экранированный символ
        if (escapeChar === 'n') {
          result += '\n'; // если символ - 'n', добавляем символ новой строки
        } else if (escapeChar === 'r') {
          result += '\r'; // если - 'r', добавляем символ возврата каретки
        } else if (escapeChar === 't') {
          result += '\t'; // если - 't', добавляем символ табуляции
        } else if (escapeChar === 'u') {
          // если символ - 'u', это указывает на символ Unicode
          const unicode = jsonString.slice(index + 1, index + 5); // извлечем последовательность Unicode (4 символа)
          result += String.fromCharCode(parseInt(unicode, 16)); // преобразуем Unicode в символ и добавляем к результату
          index += 4; // тк обработали 4 символа Unicode, увеличиваем индекс на 4
        } else {
          result += escapeChar; // если это другой экранированный символ, добавим его как есть
        }
      } else {
        result += jsonString[index]; // если символ не экранированный, добавим его как есть
      }
      index++; // перейдем к следующему символу
    }
    index++; // пропустим закрывающую кавычку (конец строки)
    return result; //вернем результат парсинга
  }

  // ф-ция разбора числа JSON
  function parseNumber() {
    let start = index; // запомнили позицию

    while (/[\d.eE+-]/.test(jsonString[index])) {
      index++; // увеличиваем индекс, пока текущий символ является частью числа (цифра, точка, 'e', 'E', '+' или '-').
    }
    const numberStr = jsonString.slice(start, index); // получим строку, представляющую число.
    const number = parseFloat(numberStr); // преобразуем в число

    if (isNaN(number)) {
      // если получили - NaN, то это не число
      throw new Error(`Не число: ${numberStr}`);
    }

    return number; // вернем полученное число.
  }

  // Функция для разбора булевого значения true, false или null
  function parseBooleanOrNull() {
    const word = parseWord(); // Вызываем функцию parseWord, чтобы получить строку, представляющую значение (true, false или null).
    if (word === 'true') {
      return true; // если 'true', вернем true.
    } else if (word === 'false') {
      return false; // если 'false', вернем false.
    } else if (word === 'null') {
      return null; // eсли слово 'null', вернем null.
    } else {
      // если строка не соответствует ничему, то выбросим ошибку
      throw new Error(`слово ${word} -  не равно true, false или null`);
    }
  }

  // Ф-ция для разбора слова (одного из трех возможных true, false, null)
  function parseWord() {
    let start = index; //  запомнили позицию
    while (/[a-zA-Z]/.test(jsonString[index])) {
      index++; // двигаем индекс вперед, пока текущий символ является буквой (независимо от регистра).
    }
    return jsonString.slice(start, index); // получим слово из строки, по начальной и конечной позиции.
  }
  return parseValue(); // начнем парсинг строки
}

// Пример использования
const jsonString =
  '{"name":"Lida","age":27,"hasJob":false,"tasks":[1,2,3],"address":{"city":"NN"},"school":{"type":"hight school","class":[8,9,10]}}';
const parsedObject = parseJSON(jsonString);
console.log(parsedObject);

/* получим обьект JSON
{
  name: 'Lida',
  age: 27,
  hasJob: false,
  tasks: [ 1, 2, 3 ],
  address: { city: 'NN' },
  school: { type: 'hight school', class: [ 8, 9, 10 ] }
}
*/
