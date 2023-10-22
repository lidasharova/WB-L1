/*ЗАДАЧА
Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.(http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true)

Требования:
данные должны загружаться при загрузке страницы
необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
необходимо реализовать клиентскую пагинацию (50 элементов на странице)
*/
const url =
  'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true';

let sortParameter = true; // направление сортировки по умолчанию (по возрастанию)
let sortedColumnIndex = null; // индекс колонки, по которой происходит сортировка
const itemsPerPage = 50; //кол-во элементов(обьектов или людей) на странице
const tableBody = document.querySelector('.table-body'); //таблица в которую будем статически помещать наши данные
const pagination = document.querySelector('.pagination'); // пагинация в которую мы поместим кнопки исходя из кол-ва полученных обьектов
let currentPage = 1; // текущая страница
const tableHeader = document.querySelector('.table-head'); // таблица в которую будем статически помещать необходимые заголовки
const resetSort = document.querySelector('.reset-sorting');
let originalData; // исходные данные
let headerFields; // переменная хранящая массив названия столбцов

//что бы данные подгружались при загрузке странички мы установим событие load на окно
//cобытие load на объекте window наступает, когда загрузилась вся страница, включая стили, картинки и другие ресурсы.
window.addEventListener('load', async function () {
  originalData = await fetchData(); // получим данные
  displayTableHeader(originalData); // отобразим заголовки
  displayData(currentPage, originalData); // отобразим данные
  setupPagination(originalData); // отобразим пагинацию
  // установим ф-цию сброса на кнопку сброса сортировки
  resetSort.addEventListener('click', () => {
    displayData(currentPage, originalData); // сброс сортировки
  });
});

//пишем асинхронную ф-цию для получения данных из предоставленного источника
const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Ошибка сети или сервера');
    }
    //вернем разрешенный промис с ответом с сервера в виде JS массива с данными
    const data = await response.json();
    return data;
  } catch (error) {
    //отловим ошибки
    console.error(error);
    return null;
  }
};

// ф-ция для динамического отображения названия столбцов таблицы исходя из данных
const displayTableHeader = (data) => {
  // получим названия полей из первого объекта данных
  headerFields = Object.keys(data[0]);
  // создадим заголовки и добавим им data-id для удобства сортировки
  for (let i = 0; i < headerFields.length; i++) {
    const th = document.createElement('th');
    th.textContent = headerFields[i];
    th.dataset.id = i; // задаем data-id

    // добавляем прослушку на каждый заголовок для подсветки и сортировки
    th.addEventListener('mouseenter', () => {
      th.classList.add('highlighted'); // добавим при наведении
    });
    th.addEventListener('mouseleave', () => {
      th.classList.remove('highlighted'); // удалим подсветку при уходе
    });
    th.addEventListener('click', () => {
      // сортировка при клике
      sortTable(i, data);
    });
    // добавляем названия столбцов в таблицу
    tableHeader.appendChild(th);
  }
};

// функция для сортировки данных
function sortTable(columnIndex, data) {
  //создадим копию данных для сортировки, что бы не мутировать исходные данные
  newData = [...data];
  //проверим, была ли нажата та же колонка, по которой уже проводилась сортировка.Если это так, то меняется параметр сортировки на противоположный.
  if (columnIndex === sortedColumnIndex) {
    sortParameter = !sortParameter;
  } else {
    // если выбрали новую колонку, то параметр сортировки снова устанавливается в исходное значение (по возрастанию),
    sortParameter = true;
    sortedColumnIndex = columnIndex;
  }

  //осртируем массив данных в определенной колонке
  newData.sort((a, b) => {
    const fieldA = a[headerFields[columnIndex]];
    const fieldB = b[headerFields[columnIndex]];
    // Прямое сравнение строк
    if (fieldA < fieldB) {
      //если сортировка по возрастанию то возвращаем отрицательное значение (-1)
      return sortParameter ? -1 : 1;
    }
    // если сортировка по убыванию то возвращаем положительное значение (1)
    if (fieldA > fieldB) {
      return sortParameter ? 1 : -1;
    }
    // если значения равны то 0
    return 0;
  });
  // отрисуем отсортированные данные текущей страницы
  displayData(currentPage, newData);
}

// функция для отображения данных для указанной страницы
const displayData = (pageNumber, data) => {
  tableBody.innerHTML = ''; // очистим таблицу
  // вычислим начальный и конечный индекс элемента в массиве данных с которого мы будем отображать данные (в массиве отсчет с 0 поэтому -1)
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage; // конечный индекс - к начальному просто прибавим кол-во элементов на странице
  // оставим необходимые данные с помощью метода slice
  const currentDateOnPage = data.slice(startIndex, endIndex);

  // создадим таблицу для каждого элемента массива
  currentDateOnPage.forEach((item) => {
    const row = document.createElement('tr'); // создадим строку
    // создадим столбцы
    row.innerHTML = `
            <td>${item.fname}</td>
            <td>${item.lname}</td>
            <td>${item.tel}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>
            <td>${item.state}</td>
            <td>${item.zip}</td>
        `;

    //  добавим каждую строку в наше тело таблицы
    tableBody.append(row);
  });
};

// функция для отображения пагинации(кнопочек переключения страниц)
const setupPagination = (data) => {
  const pageCount = Math.ceil(data.length / itemsPerPage); // найдем количество страниц исходя из плученных данных
  pagination.innerHTML = ''; // очистим пагинацию
  for (let i = 1; i <= pageCount; i++) {
    // создадим кнопки для пагинации с помощью цикла по кол-ву страниц
    const button = document.createElement('button');
    button.classList.add('page-btn'); // добавим класс для кнопок
    button.innerText = i; // добавим текст для кнопок (цифры страниц)
    // проверяем, является ли эта кнопка текущей страницей
    if (i === currentPage) {
      button.classList.add('active'); // добавляем класс активной кнопки
    }
    // создаем прослушку для каждой кнопки
    // при нажатии на кнопку, меняем текущую страницу currentPage
    button.addEventListener('click', (e) => {
      // удалим классы активной кнопки с со всех кнопок
      document.querySelectorAll('.page-btn').forEach((btn) => {
        btn.classList.remove('active');
      });
      const currentBtn = e.target; // получим кнопку, на которую нажали
      currentBtn.classList.add('active'); //сделаем ее активной
      currentPage = i; // меняем текущую страницу на номер нажатной кнопки
      // вызываем функцию для отображения данных для текущей страницы
      displayData(currentPage, data);
    });
    // добавляем кнопку в нашу пагинацию
    pagination.append(button);
  }
};
