/*ЗАДАЧА
Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки. При прокрутке содержимого виджета до конца должны подгружаться новые посты. Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).

При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.
*/
const owner_id = '-217966907'; //группа с Красивой природой
const token =
  '1a5fd1041a5fd1041a5fd104db1949d95411a5f1a5fd1047f6d2ece34ab6e3be6cc99f1';
let count = 5; // кол-во постов в одной загрузке
// ZBOqznuVj7jLSKaEIlFE;
