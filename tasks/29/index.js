/*ЗАДАЧА
Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице и выполняет определенные действия с этими данными, например, отправляет их на сервер или отображает всплывающее окно с результатами.
*/

// получим форму по ее селектору(в нашем случае классу)
const form = document.querySelector('.myForm');

// ф-ция для обработки отправки формы
function handleSubmit(event) {
  event.preventDefault(); // предотвратим стандартное поведение браузера при отправке формы (перезагрузка страницы и отправка данных на сервер который должен быть указан в теге action
  // <form action="https://example.com/submit-form" method="post"></form>)

  /* 1) мы можем получить значения отдельных полей формы через form.elements, который представляет собой коллекцию всех элементов формы и обратиться к ним через их id /name */
  const name = form.elements.name.value;
  const email = form.elements.email.value;

  /* 2) можем получить сразу всю информацию из формы с помощью конструктора new FormData - это способ создания набора пар ключ/значение, представляющих поля формы и их значения, которые можно обработать и так же получить данные из отдельного поля с помощью метода get. по их name */

  //получили всю информацию
  const formData = new FormData(event.target);
  //получим информацию по отдельным полям если необходимо
  // const nameDate = formData.get('name');
  // const emailDate = formData.get('email');

  // выполняем действия с данными полученными из формы - отправка на сервер или вывод на страницу
  showDate(formData); //ф-ция отображения данных на странице
  sendDate(formData); //ф-ция отправки данных на сервер
}

// добавим обработчик события на отправку формы
form.addEventListener('submit', handleSubmit);

// ф-ция для отображения данных формы на странице
function showDate(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const container = document.querySelector('.container');
  const boxDate = document.createElement('div');
  boxDate.classList.add('box-date');
  boxDate.innerHTML = `
    <h3>Ваши данные</h3>
    <p>Имя: ${name}</p>
    <p>Email: ${email}</p>
  `;
  container.append(boxDate);
}

// ф-ция для отправки данных из формы на сервер
/* const sendDate = (formData) => {
  try {
    fetch('https://example.com/api/submit', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Ошибка сети или сервера');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Данные успешно отправлены на сервер:', data);
      });
  } catch (error) {
    console.error('Произошла ошибка при отправке данных:', error);
  }
} */
