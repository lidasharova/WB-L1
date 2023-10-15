/* ЗАДАЧА
Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await для ожидания выполнения других асинхронных операций, и возвращает результат выполнения.
*/

// URL для выполнения нашего запроса на получение актуального курса EUR в рублях и USD
const myUrl =
  'https://api.apilayer.com/fixer/latest?symbols=RUB%2CUSD&base=EUR';
// Создаем объект заголовков (Headers) и добавляем в него наш API-ключ
const myHeaders = new Headers();
myHeaders.append('apikey', '0cAU3LiNCjWXTkKHw0inNKmlV4rlUeqE');

// пропишем опции запроса(из документации API)
const myRequestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

//напишем асинхронную функцию в которой используется ключевое слово await для ожидания выполнения асинхронных операции
async function asyncFunc(url, requestOptions) {
  try {
    // используем await для ожидания выполнения запроса и получения данных
    const response = await fetch(url, requestOptions);
    // неудачные ответы сети не вызывают исключение и не попадают в блок catch по умолчанию, поэтому поставим проверку на статус ответа сети
    if (!response.ok) {
      throw new Error('Error: ' + response.status);
    }
    //парсим полученный ответ (в форматe JSON) с помощью метода .json(), который есть у объекта response. Этот метод вернет нам JavaScript-объект.
    const res = await response.json();
    // вернем этот объект
    return res;
  } catch (error) {
    // обработка ошибок
    console.error('Error:', error);
  }
}

// Вызываем асинхронную функцию и обрабатываем результаты
asyncFunc(myUrl, myRequestOptions)
  .then((data) => {
    // данные получены (в консоль выведется обьект с данными курса EUR в рублях и USD)
    console.log(data.rates);
  })
  .catch((error) => {
    // обработка ошибок
    console.error('Error:', error);
  });
