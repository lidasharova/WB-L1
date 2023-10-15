/*ЗАДАЧА
Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).
*/

let i = 0; //счетчик вызовов
const sizeFunc = 72; // размер простой функции = 72 байта
let countMemory = 0; // счетчик для размера памяти

//рекурсивная функция для вычисления размера коллстэка, которая увеличивает счетчик и вызывает саму себя пока коллстэк не переполнится
const func = () => {
  i++;
  countMemory += sizeFunc;
  func();
};

//для вычисления памяти воспользуемся формулой 72 + K * 8
const getSize = () => {
  try {
    func();
  } catch (e) {
    // Словили ошибку переполнения стэка и вернули значение счетчика
    console.error(i, countMemory / 1024, e);
    return `кол-во вызовов: ${i} и объем памяти: ${countMemory} байт (${Math.floor(
      countMemory / 1024
    )} Kб)`;
  }
};

document.querySelector('button').addEventListener('click', () => {
  //получим размер коллстэка и выведем на страничку
  const memory = getSize();
  const text = document.createElement('p');
  text.textContent = memory;
  document.querySelector('p') ? null : document.body.append(text);
});

/* Ответ:
размер коллстэка в
Chrome - 10983 вызовов и объем памяти:  790848 байт (772 Kб),
Firefox - 33514 вызовов и объем памяти: 2413008 байт (2356 Kб)
Opera - 10983 вызовов и объем памяти: 790776 байт (772 Kб)
Safari - 45633 вызовов и объем памяти: 3285576 байт (3208 Kб)
*/
