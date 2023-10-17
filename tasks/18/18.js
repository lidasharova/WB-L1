/*ЗАДАЧА
Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.
*/
//создадим ф-цию в кот подсчитаем размер LocalStorage
const getSize = () => {
  let key = '1';
  let value = 'value';
  localStorage.clear(); //очистим localStorage
  try {
    //запустим цикл добавления данных в localStorage пока не вылетит ошибка когда он переполнится
    while (true) {
      localStorage.setItem(key, value);
      //меняем значения ключей каждую итерацию, что бы они не повторялись(не перезаписывались)
      key = key + 1;
      console.log('Данные успешно добавлены в localStorage');
    }
  } catch {
    console.log('Ошибка при добавлении данных, localStorage переполнен');
    //распарсим в строку данные из localStorage
    const string = JSON.stringify(localStorage);
    //вернем длину строки
    return string.length;
  }
};

document.querySelector('button').addEventListener('click', () => {
  //получим размер localStorage и выведем на страничку
  const maxLocalStorageSize = getSize();
  textInfo = `Размер вашего хранилища: ${maxLocalStorageSize} байт
  или около ${Math.floor(maxLocalStorageSize / 1024 / 1024)} Мб
  `;
  const text = document.createElement('p');
  text.textContent = textInfo;
  document.querySelector('p') ? null : document.body.append(text);
});

//Ответ: Размер хранилища LocalStorage моего браузера Google Chrome: 5260081 байт или около 5 Мб
