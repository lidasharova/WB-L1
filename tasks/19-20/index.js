/*ЗАДАЧА
19) Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки. При прокрутке содержимого виджета до конца должны подгружаться новые посты. Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.


20)Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи. При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер 	хранилища.
*/

const owner_id = '-1179772'; //История моды
const token =
  '1a5fd1041a5fd1041a5fd104db1949d95411a5f1a5fd1047f6d2ece34ab6e3be6cc99f1';

let count = 10; // кол-во постов в одной загрузке
const responseError = document.querySelector('.response-error'); //контейнер для ошибок сети
const postList = document.querySelector('.post-list'); //контейнер для постов
const loader = document.querySelector('.loader');
let savedOffset; //перем для выборки постов
let canLoadDate = true; //флаг того, что можно загружать посты
let maxLocalStorageSize = 0; // перем максим размера памяти в LocalStorage

//создадим ссылку с возможностью менять кол-во запросов постов и позицию выборки постов для постраничной загрузки данных
const getUrl = (count, offset) => {
  return `https://api.vk.com/method/wall.get?access_token=${token}&owner_id=${owner_id}&count=${count}&offset=${offset}&v=5.131`;
};

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
    const maxSize = Math.floor(JSON.stringify(localStorage).length);
    localStorage.clear(); // очищаем весь localStorage
    return maxSize; // вернем максимальный размер
  }
};

// проверяем, есть ли уже запись о максимальном размере в localStorage
maxLocalStorageSize = localStorage.getItem('maxSizeMemory');
// если размера нет, значит, вычисляем
if (!maxLocalStorageSize) {
  maxLocalStorageSize = getMaxSizeMemoryLocalStorage();
  console.log(
    `Максимальный обьем памяти localStorage вычислен:${maxLocalStorageSize} байт`
  );
  // сохраним значение в localStorage
  localStorage.setItem('maxSizeMemory', maxLocalStorageSize);
}

//ф-ция расчета кол-ва занятого обьема хранилища и вывод в консоль
const calculateMemoryStorage = () => {
  const usedMemory = JSON.stringify(localStorage).length;
  console.log(
    `Oбъем занятой памяти в хранилище: ${usedMemory} байт / Максимальный размер хранилища: ${maxLocalStorageSize} байт`
  );
};

// ф-ция сохранения данных в localStorage c проверкой на переполнение данных
const saveDataToLocalStorage = (dataPosts) => {
  const localStoragePosts = JSON.parse(localStorage.getItem('posts')); //достаем из хранилища данные
  let resultPosts;
  if (localStoragePosts) {
    dataPosts.forEach((post) => localStoragePosts.push(post)); //пройдем по переданным постам и добавим их
    resultPosts = localStoragePosts;
  } else {
    //если хранилище пустое то добавляем новые переданые посты
    resultPosts = dataPosts;
  }
  // если хранилище переполнено, то удаляем старые посты из него
  const savedDataSize = JSON.stringify(localStorage).length;
  while (savedDataSize > maxLocalStorageSize) {
    //удалим старые записи постов
    resultPosts.splice(0, count);
  }
  // сохраняем данные в localStorage
  localStorage.setItem('posts', JSON.stringify(resultPosts));
  //отображаем заполненность хранилища в консоли
  calculateMemoryStorage();
};

//обработчик события скролла, чтобы отслеживать прокрутку до конца
window.addEventListener('scroll', () => {
  //если скрол снизу и можем загружать данные
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    canLoadDate
  ) {
    canLoadDate = false; //блокируем загрузку
    loader.classList.remove('hide'); //показываем индикатор загрузки
    let newOffset = savedOffset + count; //создаем новую выборку для запроса
    savedOffset = newOffset; //присваиваем новое значение выборке
    console.log(`новая выборка - ${newOffset}`);
    localStorage.setItem('offset', newOffset); //сохраняем новое значение offset в локал сторадж
    console.log('Загружаем новые посты...');
    throttledSendVKApiRequest(); //отправляем запрос
  }
});

//создадим запрос к другому домену, с помощью техники JSONP (JSON with Padding) - для обхода политики безопасности Same-Origin Policy (SOP) в веб-браузерах,что ограничивает возможность сделать AJAX-запрос к серверам, находящимся в другом домене (или с другим протоколом или портом).

const sendVKApiRequest = () => {
  const script = document.createElement('script'); // создаем новый элемент <script>
  const callbackName = 'VK' + Date.now(); //генерируем уникальное имя для функции callback

  window[callbackName] = handleVKApiResponse; // прикрепляем функцию callback к глобальному объекту window под уникальным cозданным именем,что бы вызвать эту функцию после выполнения запроса.

  script.src = getUrl(count, savedOffset) + '&callback=' + callbackName; // получим часть скрипта, в котором указываем кол-во постов и смещение
  document.head.appendChild(script); // <script>, содержащий URL для выполнения JSONP-запроса, добавляем в заголовок документа (<head>).
  //по завершению загрузки данных из API ВКонтакте, этот обработчик удалит созданную функцию обратного вызова и элемент <script>, чтобы освободить ресурсы и избежать утечек памяти.
  script.onload = () => {
    delete window[callbackName];
    document.head.removeChild(script);
  };
};

//ф-ция защиты от троттлинга (из задачи 17)- она будет ограничивать вызов ф-ции, чтобы он происходил не чаще, чем раз в заданное нами время.
const throttle = (func, delay) => {
  let wait = false;
  return (...args) => {
    if (wait) {
      return;
    }
    func(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
};
//обернем нашу ф-цию в обертку защиты от троттлинга - ограничения вызова ф-ции в заданный промежуток времени
const throttledSendVKApiRequest = throttle(sendVKApiRequest, 1000);

//ф-ция обработки ответа от apiVK
const handleVKApiResponse = (response) => {
  // обрабатываем ответ от apiVK
  if (response.error) {
    responseError.innerHTML = response.error.error_msg; //если есть ошибка сети вставим ее в нашу разметку
    return;
  }
  responseError.innerHTML = ''; //если нет, очистим из разметки ошибку
  //если посты пришли
  if (response.response.items.length > 0) {
    saveDataToLocalStorage(response.response.items); // записываем в хранилище новые посты
    renderPosts(response.response.items); // выводим их
    loader.classList.add('hide'); // скрываем индикатор загрузки
    canLoadDate = true; // разблокируем загрузку
  } else {
    loader.classList.remove('hide'); // показываем индикатор загрузки
    canLoadDate = false; // заблокируем загрузку
  }
};

// ф-ция отрисовки постов
const renderPosts = (data) => {
  // выводим посты на страницу динамически
  let postArrayElements = [];
  data.forEach((post) => {
    if (post.attachments && post.attachments.length > 0) {
      let imgHtml = ''; // HTML для изображения
      post.attachments.forEach((attachment) => {
        if (attachment.type === 'photo') {
          imgHtml = `<img class="post-img" src=${attachment.photo.sizes[2].url} />`;
        }
      });

      let res = `
        <li class="post">
          <div class="post-content">${post.text}</div>
          <div class="post-img">${imgHtml}</div>
        </li>
      `;

      postArrayElements.push(res);
    } else {
      //если фото нет
      let res = `
        <li class="post">
          <div class="post-content">${post.text}</div>
        </li>
      `;
      postArrayElements.push(res);
    }
  });
  postList.innerHTML += postArrayElements.join('');
};

//ф-ция запуска  виджета
const startApp = () => {
  let savedDataPosts = JSON.parse(localStorage.getItem('posts')) || []; //переменная которая будет хранить сохраненные посты
  savedOffset = JSON.parse(localStorage.getItem('offset')) || 0; // получение offset из localStorage
  console.log(`выборка постов - ${savedOffset}`);
  //если сохранненные посты есть
  if (savedDataPosts && savedDataPosts.length > 0) {
    renderPosts(savedDataPosts); // отрисуем посты
  } else {
    throttledSendVKApiRequest(); // если нет то отправим запрос
  }
};

startApp();
