/*ЗАДАЧА
Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет анимацию для элемента на веб-странице, например, плавное изменение его положения или размера.
*/
// Напишем ф-цию которая принимает два аргумента: элемент и имя анимации из файла стилей
function setAnimation(element, animationName) {
  // определим имя анимации для элемента(из файла стилей)
  element.style.animationName = animationName;
  // установим продолжительность
  element.style.animationDuration = '5s';
  // установим тип изменения анимации во времени
  element.style.animationTimingFunction = 'linear;';
  // установим направление анимации
  element.style.animationDirection = 'alternate';
  // установим бесконечность анимации
  element.style.animationIterationCount = 'infinite';
}

// найдем наши элементы для которых мы хотим применить анимацию
// при клике на эти фигуры мы запустим анимацию
document.querySelector('.circle').addEventListener('click', (e) => {
  setAnimation(e.target, 'moveCircle');
});
document.querySelector('.square').addEventListener('click', (e) => {
  setAnimation(e.target, 'moveSquare');
});
document.querySelector('.triangle').addEventListener('click', (e) => {
  setAnimation(e.target, 'moveTriangle');
});
