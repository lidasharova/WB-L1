/*ЗАДАЧА
Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
*/

//найдем наши элементы - инпут и лист с подсказками в DOM
const addressInput = document.querySelector('.address-input');
const addressList = document.querySelector('.address-list');
//зайдем в кабинет разработчика на Яндекс картах и получим ключ для бесплатного использования API Геосаджеста - т.к. API Геосаджест позволяет получать предложения поисковой выдачи во время поиска географических объектов и/или организаций.

const API_KEY = '5b85006b-c44c-447d-915b-287683fd5175';

//изучим документацию https://yandex.ru/dev/geosuggest/doc/ru/

//напишем асинхронную функцию внутри которой при вводе в инпут слов для поиска адреса будем ожидать ответа от сервера с подсказками и выводить их пользователю в выпадающем списке
addressInput.addEventListener('input', async () => {
  const queryText = addressInput.value;
  // очистим список подсказок перед каждым новым запросом
  addressList.innerHTML = '';
  //если пользователь ввел что-то в инпут, запустим отрисовку подсказок
  if (queryText) {
    await renderResultsDebounced(queryText);
  }
});

//тк я столкнулась с проблемой слишком частых запросов, а значит и дублированием ответов, то решила применить "Дебаунсинг" - он позволяет управлять частотой выполнения функции. Он создает задержку перед выполнением определенной функции после возникновения события. Если событие происходит многократно или с высокой частотой, дебаунсинг позволяет игнорировать все повторные срабатывания функции в течение заданного интервала времени.(https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/)

//ф-ция  Дебаунсинга по ограничению запросов в определенный промежуток времени
const setTimeLimit = (myFunc, time) => {
  let timeout; // переменная timeout для хранения идентификатора таймера
  return function () {
    const context = this; // сохраним контекст вызова функции (this)
    const args = arguments; // сохраним аргументы функции
    clearTimeout(timeout); // очистим предыдущий запущенный таймаут (если есть)
    // установим новый таймаут
    timeout = setTimeout(() => {
      myFunc.apply(context, args); // когда время ожидания завершиться, выполнится переданная функция myFunc с сохраненным контекстом и аргументами
    }, time); // установится задержка (время ожидания) перед выполнением функции
  };
};

// ф-ция с ограничением частоты вызова в 1 секунду для отрисовки подсказок
const renderResultsDebounced = setTimeLimit(async (queryText) => {
  addressList.innerHTML = ''; // удалим старые подсказки
  const result = await geocodingResults(queryText); //отправим запрос

  //пройдемся по массиву и у каждого элемента вытащим адрес подсказки
  result.forEach((address) => {
    const listItem = document.createElement('li'); //осздадим новый элемент для подсказок
    const mainAddress = address.address.formatted_address; //достанем адрес подсказки из обьекта
    listItem.textContent = mainAddress; //запишем адрес в элемент

    //установим прослушку, при клике на подсказку
    listItem.addEventListener('click', function () {
      addressInput.value = mainAddress; //установим подсказку в инпут
      addressList.innerHTML = ''; //удалим старые подсказки
    });
    addressList.append(listItem);
  });
}, 1000); // интервал задержки 1 секунда

//ф-ция для получения данных с сервера
const geocodingResults = async (queryText) => {
  // создаем API запрос по примеру из документации с нашими данными вводной  строки и ключем, установим язык и кол-во максимальных подсказок 5 (по умолчанию их 7, лимит 10), так же установили тип подсказок - все географические обьекты
  const url = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${API_KEY}&text=${queryText}&lang=ru&results=5&types=geo&print_address=1`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      //обработаем известные ответы сети
      if (response.status == 400) {
        console.error(
          'В запросе используется неверный параметр или его значение.'
        );
        if (response.status == 403) {
          console.error('Ключ API недействителен.');
        }
        console.error('Ошибка сети или сервера');
      }
    }
    //вернем разрешенный промис с ответом с сервера в виде JS массива с данными подсказок
    const data = await response.json();
    return data.results;
  } catch (error) {
    //выведем другие ошибки
    console.error(error);
  }
};
