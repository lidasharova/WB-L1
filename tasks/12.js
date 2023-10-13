/* ЗАДАЧА
Задача на работу с объектами: создайте объект, представляющий собой книгу. Объект должен иметь свойства, такие как: название книги, автор и год издания. Напишите методы для получения и изменения значений свойств книги.
*/

// создали объект, представляющий книгу
const book = {
  // добавили сво-ва
  title: 'Цветы для Элджернона',
  author: 'Дэниел Киз',
  year: 1959,

  // получить название книги
  getTitle: function () {
    return this.title;
  },

  // оплучить автора книги
  getAuthor: function () {
    return this.author;
  },

  // получить год издания
  getYear: function () {
    return this.year;
  },

  // установить другое название книги
  setTitle: function (newTitle) {
    this.title = newTitle;
  },

  // установить автора книги
  setAuthor: function (newAuthor) {
    this.author = newAuthor;
  },

  // установить год издания книги
  setYear: function (newYear) {
    this.year = newYear;
  },
};

// получаем данные о книге
console.log(`Название: ${book.getTitle()}`);
console.log(`Автор: ${book.getAuthor()}`);
console.log(`Год: ${book.getYear()}`);

// изменим данные в обьекте
book.setTitle('Унесенные ветром');
book.setAuthor('Маргарет Митчелл');
book.setYear(1936);

// получим новые данные
console.log(`Новое название: ${book.getTitle()}`);
console.log(`Новый автор: ${book.getAuthor()}`);
console.log(`Новый год: ${book.getYear()}`);
