//импортируем  функции из моего модуля
import {
  formatDate,
  dateDiff,
  relativeTime,
  multipleLocaleSupport,
} from './module.mjs';

// отформатируем определенную дату в нужный нам формат
const format = 'dddd, MMMM Do YYYY';
const formattedDate = formatDate('2019-10-13', format);
console.log(`Необходимый формат даты '2019-10-13' : ${formattedDate}`);

// вычислим сколько прошло с даты до настоящего момента
const relative = relativeTime('1996-04-05', 'YYYY-MM-DD');
console.log(`Сколько прошло с '1996-04-05': ${relative}`);

// Вычисляем разницу между датами в днях
const differenceInDays = dateDiff('2022-10-01', '1988-10-15', 'days');
console.log(`Разница между датами: ${differenceInDays} дней`);

//получим текущую дату в нужном нам формате
const currentDate = multipleLocaleSupport('LLLL');
console.log(`Формат 'LLLL' текущей даты: ${currentDate}`);
