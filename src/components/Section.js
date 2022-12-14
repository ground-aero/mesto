//  ОТВЕЧАЕТ ЗА: только рендеринг карточек на страницу (добавляет его в контейнер и просто рендерит) // p.s - в Section прокинуть ф-цию рендеринга (ф-ция renderer не обойдется без класса Card)
export class Section {
  constructor({ renderer }, containerSelector) {
    //1. items = initialCards, 2.renderer = отрендерить изнач массив карточек
    // this._initialArr = items; //[массив {объектов} карточек]
    this._renderer = renderer; //ф-ция колл-бэк (наприм передаем по ссылке)
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    //принимает готовую карточку(DOM-элемент) и добавляет его в контейнер DOM.
    this._container.append(element);
  }

  // 1-й Вариант. //отрисовка с помощью колл-бэка
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
    //ОТВЕЧАЕТ ЗА: отрисовку (рендеринг) в цикле изнач массива карточек
    dataArr.forEach(this._renderer); //вызывается рендеринг по ссылке
  }

}
