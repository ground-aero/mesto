//  ОТВЕЧАЕТ ЗА: только рендеринг карточек на страницу (добавляет его в контейнер и просто рендерит)
// p.s - в Section прокинуть ф-цию рендеринга (ф-ция renderer не обойдется без класса Card)
export class Section {
  constructor({ items, renderer }, containerSelector) {
    //1. items = initialCards, 2.renderer = отрендерить изнач массив карточек
    this._initialArr = items; //[массив данных {объектов} карточек]
    // console.log(this._initialArr);
    this._renderer = renderer; //ф-ция колл-бэк (наприм передаем по ссылке)
    this._container = document.querySelector(containerSelector);
  }

  addItem(node) {
    //принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(node);
  }
  // МЕТОД КРАСИВЫЙ, НО НЕ ПОНЯЛ КАК СВЯЗАТЬ ЕГО
  // addItem(item) {
  //   const card = this._renderer(item);
  //   this._container.prepend(card);
  // }

  // 1-й Вариант.
  // renderItems() {
  //   // [{name: '', link: ''}, {name: '', link: ''},{name: '', link: ''}]
  //   this._initialArr.forEach((item) => {
  //     //кол-бэк ф-ция метода forEach, срабатыв для каждого эл массива
  //     //item - аргумент
  //     this._renderer(item, this._container); //передаем данные кажд карточки при вызове ф-ции
  //   });
  // }
  // 2-й Вариант (сокращенный).
  renderItems(dataArr) {
    //ОТВЕЧАЕТ ЗА: рендеринг в цикле изнач массива карточек
    dataArr.forEach(this._renderer); //вызывается рендеринг по ссылке
  }
}