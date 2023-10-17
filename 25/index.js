/*ЗАДАЧА
Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.
*/

function createElement(container, styles, text = '') {
  // Создаем новый элемент
  const element = document.createElement('div');

  // установим стили из переданного в функцию объекта styles
  if (styles) {
    for (const prop in styles) {
      element.style[prop] = styles[prop];
    }
  }

  // установим текст внутрь элемента
  element.textContent = text;

  // добавим новый элемент в указанный контейнер
  container.append(element);
}

//найдем контейнер для нашего элемента в DOM
const container = document.querySelector('.container');
//пропишем стили в обьект
const styles = {
  margin: '20px',
  border: '1px solid black',
  borderRadius: '10px',
  width: '100px',
  height: '50px',
  backgroundColor: 'green',
  color: 'white',
  textAlign: 'center',
};
//создадим переменную с текстом для нового элемента
const text = 'новый элемент';

//для визуализации создания элемента , найдем кнопку и повесим на нее прослушку
document.querySelector('.button').addEventListener('click', () => {
  container.innerHTML = ''; // очистим содержимое контейнера от старого элемента
  createElement(container, styles, text); // cоздадим и добавим новый элемент
});
