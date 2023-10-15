/*ЗАДАЧА
Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует функцию для работы с датами. Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.
*/
// подключим внешнюю библиотеку командой "npm install moment"

// импортируем Moment.js непосредственно в модуль
import moment from 'moment';

// ф-ция  для форматирования нужной даты в определенный формат
export const formatDate = (date, format) => {
  return moment(date).format(format);
};

// ф-ция  для получения разницы между двумя датами
export const dateDiff = (date1, date2, unit) => {
  const startDate = moment(date1);
  const endDate = moment(date2);
  return moment(startDate).diff(endDate, unit);
};

// ф-ция  для получения разницы между датой и текущей датой
export const relativeTime = (date, format) => {
  return moment(date, format).fromNow();
};

// ф-ция для форматирования текущей даты и времени в соответствии с заданным форматом
export const multipleLocaleSupport = (format) => {
  return moment().format(format);
};
