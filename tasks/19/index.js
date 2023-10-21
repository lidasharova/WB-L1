/*ЗАДАЧА
19) Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки. При прокрутке содержимого виджета до конца должны подгружаться новые посты. Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.


20)Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи. При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер 	хранилища.
*/
const owner_id = '-217966907'; //группа с Красивой природой
const token =
  '1a5fd1041a5fd1041a5fd104db1949d95411a5f1a5fd1047f6d2ece34ab6e3be6cc99f1';
let count = 5; // кол-во постов в одной загрузке
// ZBOqznuVj7jLSKaEIlFE;

//ф-ция подсчета размера максимальной памяти  LocalStorage  браузера (из 18 задачи) которая сработает только при первом открытии приложения и будет храниться в памяти для отображения максимального размера
const getMaxSizeMemoryLocalStorage = () => {
  if (localStorage.getItem('maxSizeMemory')) {
    // размер памяти уже был подсчитан и нет необходимости выполнять ее снова
    return;
  }
  let key = '1';
  let value = 'value';
  localStorage.clear(); //очистим localStorage
  try {
    //запустим цикл добавления данных в localStorage пока не вылетит ошибка когда он переполнится
    while (true) {
      localStorage.setItem(key, value);
      //меняем значения ключей каждую итерацию, что бы они не повторялись(не перезаписывались)
      key = key + 1;
    }
  } catch {
    //получили максимальный размер памяти
    const maxSize = Math.floor(
      JSON.stringify(localStorage).length / 1024 / 1024
    );
    localStorage.clear(); // очищаем весь localStorage
    return maxSize; // вернем максимальный размер
  }
};

// создаем переменную которая будет хранить информацию о максимальном размере памяти в LocalStorage
let maxLocalStorageSize = 0;
// проверяем, есть ли уже запись о максимальном размере в localStorage
maxLocalStorageSize = localStorage.getItem('maxSizeMemory');
// если размера нет, значит, вычисляем
if (!maxLocalStorageSize) {
  maxLocalStorageSize = getMaxSizeMemoryLocalStorage();
  console.log(
    `Максимальный обьем памяти localStorage вычислен:${maxLocalStorageSize} MB`
  );
  // сохраним значение в localStorage
  localStorage.setItem('maxSizeMemory', maxLocalStorageSize);
}

//ф-ция расчета кол-ва занятого обьема хранилища и вывод в консоль
const calculateMemoryStorage = () => {
  const usedMemory = JSON.stringify(localStorage).length;
  const usedMemoryMB = Math.floor(usedMemory / 1024 / 1024);
  console.log(
    `Oбъем занятой памяти в хранилище: ${usedMemoryMB} MB / Максимальный размер хранилища: ${maxLocalStorageSize} MB`
  );
};

calculateMemoryStorage();
