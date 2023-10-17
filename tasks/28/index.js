/*ЗАДАЧА
Создать и добавить элемент с использованием шаблонов: Напишите функцию, которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.
*/

//Элементы внутри тега <template> не отображаются на веб-странице, они видны только в DOM, и мы можем использовать их для динамического создания элементов с помощью JavaScript

/*создадим функцию которая принимает класс нашего написанного шаблона в HTML и класс контейнера куда
нам следует поместить созданный элемент*/
const createElementFromTemplate = (container, templateClass) => {
  //найдем наш template в DOM по его классу
  const template = document.querySelector(templateClass);
  //если нашли
  if (template) {
    /* Создаем копию содержимого шаблона с помощью метода importNode
    импортированный узел является клоном оригинала, второй параметр метода - булевое значение которое указывает копировать узел с потомками или нет */
    const copy = document.importNode(template.content, true);
    // добавим нашу копию в элемент-контейнер из DOM
    const containerElement = document.querySelector(container);
    containerElement.append(copy);
  } else {
    console.error('Шаблон не найден');
  }
};

// Вызываем функцию при клике на кнопку и передаем в нее классы нашего template и контейнера
document.querySelector('.button').addEventListener('click', () => {
  createElementFromTemplate('.container', '.my-template');
});
