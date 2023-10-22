/*ЗАДАЧА
Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля. Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах. Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.
*/

//Хороший пароль должен содержать минимум одну цифру, одну букву в верхнем регистре, одну букву в нижнем регистре и минимум один специальный символ. Длина пароля - не менее 8 символов.//

const tooltips = document.querySelector('.tooltips');
const strength = document.querySelector('.strength');
const inputPassword = document.querySelector('#password-input');
const togglePasswordButton = document.querySelector('.toggle-password');
const form = document.querySelector('form');

//ф-ция для просмотра пароля
togglePasswordButton.addEventListener('click', () => {
  if (inputPassword.type === 'password') {
    inputPassword.type = 'text'; // видимый
    togglePasswordButton.textContent = 'Скрыть пароль';
  } else {
    inputPassword.type = 'password'; //скрыт
    togglePasswordButton.textContent = 'Показать пароль';
  }
});

//ф-ция проверки сложности пароля
// считать надежность пароля будем по кол-ву выполненных требований к паролю
const checkPassword = (password) => {
  // создаем переменную которая будет хрнанить оценку сложности пароля
  let passwordStrength = 'Слабый';
  // проверяем длину пароля
  const lengthScore = password.length >= 8 ? 1 : 0;
  // проверяем наличие цифр
  const hasNumbers = /[0-9]/.test(password) ? 1 : 0;
  // проверяем наличие букв в нижнем и верхнем регистре
  const hasLowercase = /[a-z]/.test(password) ? 1 : 0;
  const hasUppercase = /[A-Z]/.test(password) ? 1 : 0;
  // проверяем наличие спец символов
  const hasSpecialChars = /[!@#$%^&*]/.test(password) ? 1 : 0;
  // вычисляем общую сложность пароля
  const totalScore =
    lengthScore + hasNumbers + hasLowercase + hasUppercase + hasSpecialChars;
  // если выполнены 3 пункта то средний
  if (totalScore >= 3) {
    passwordStrength = 'Средний';
  }
  // если выполнены все 5 пунктов то сильный
  if (totalScore >= 5) {
    passwordStrength = 'Сильный';
  }
  return passwordStrength;
};

// ф-ция получения подсказок
const getTooltip = (password) => {
  // очищаем предыдущие подсказки
  tooltips.textContent = '';
  // создаем массив для хранения элементов подсказок
  let tooltipElements = [];

  // проверяем длину пароля
  if (password.length < 8) {
    const tooltipLength = document.createElement('li');
    tooltipLength.textContent = 'Пароль должен содержать минимум 8 символов.';
    tooltipElements.push(tooltipLength);
  }
  // проверяем наличие букв в верхнем регистре
  if (!/[A-Z]/.test(password)) {
    const tooltipUppercase = document.createElement('li');
    tooltipUppercase.textContent =
      'Пароль должен содержать хотя бы одну букву в верхнем регистре.';
    tooltipElements.push(tooltipUppercase);
  }
  // проверяем наличие букв в нижнем регистре
  if (!/[a-z]/.test(password)) {
    const tooltipLowercase = document.createElement('li');
    tooltipLowercase.textContent =
      'Пароль должен содержать хотя бы одну букву в нижнем регистре.';
    tooltipElements.push(tooltipLowercase);
  }
  // проверяем наличие хотя бы одного числа
  if (!/\d/.test(password)) {
    const tooltipNumber = document.createElement('li');
    tooltipNumber.textContent = 'Пароль должен содержать хотя бы одну цифру.';
    tooltipElements.push(tooltipNumber);
  }
  // проверяем наличие хотя бы одного специального символа
  if (!/[\W_]/.test(password)) {
    const tooltipSpecialChars = document.createElement('li');
    tooltipSpecialChars.textContent =
      'Пароль должен содержать хотя бы один специальный символ.';
    tooltipElements.push(tooltipSpecialChars);
  }
  // выводим подсказки добавляя их в контейнер
  tooltips.append(...tooltipElements);
};

// вешаем прослушку на ввод пароля
inputPassword.addEventListener('input', () => {
  const password = inputPassword.value;
  const strengthPassword = checkPassword(password);
  strength.textContent = strengthPassword; // выводим оценку пароля
  getTooltip(password); // выводим подсказки
});

// обработчик сабмита
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // отменяем стандартное поведение браузера
});
