//  ./components/Section.js - ОТВЕЧАЕТ ЗА: только рендеринг карточек на страницу (добавляет его в контейнер и просто рендерит)
// p.s - в Section прокинуть ф-цию рендеринга (ф-ция renderer не обойдется без класса Card)
export class Section {
  constructor({ items, renderer }, containerSelector) {
    //1. items = initialCards, 2.renderer = отрендерить изнач массив карточек
    this._initialArr = items; //массив данных карточек
      console.log(this._initialArr);
    this._renderer = renderer; //ф-ция колл-бэк
    this._container = document.querySelector(containerSelector);
  }

  addItem(node) {
    //принимает DOM-элемент и добавляет его в контейнер.
    this._container.append(node);
  }
  // addItem(node, position = 'before') {
  //   switch (position) {
  //     case 'before':
  //       this._container.prepend(node)
  //       break;
  //     case 'after':
  //       this._container.append(node)
  //       break;
  //     default:
  //       break;
  //   }
  // }

  renderItems() {
    // [{name: '', link: ''}, {name: '', link: ''},{name: '', link: ''}]
    this._initialArr.forEach((item) => {
      //item - аргумент
      this._renderer(item, this._container);
    });
  }
  // renderItems(dataArr) {//ОТВЕЧАЕТ ЗА: рендеринг в цикле изнач массива карточек
  //   dataArr.forEach((dataItem) => {
  //     this._renderer(dataItem, this._container);//вызывается рендеринг и в нее передаются данные каждой карточки
  //   });
  // }
}


// Класс Section будет решать отдельную задачу — вставку элементов в разметку.

// ВСТАВКА ЭЛЕМЕНТОВ В РАЗМЕТКУ - ВОЗВРАЩАЕМ ГОТОВЫЙ ЭЛЕМЕНТ КАРТОЧКИ, при нажатии submit / formPlace /btnCreatePlaceCard
// function renderCard(container, data, position = 'before') {
//   const card = initialiseClassCard(data); // 2. разметка попадает в переменную card, и ренедерится с помощью метода renderCard.
//   switch (position) {
//     case 'before':
//       container.prepend(card);
//       break;
//     case 'after':
//       container.append(card);
//       break;

//     default:
//       break;
//   }
//   return card;
//   // container.append(card); // !!! Теперь данная функциональность не нужна (после реализованного выше)
// }

// //ДОБАВИТЬ СВОЮ КАРТОЧКУ
// function addCard() {
//   formPlace.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     renderCard(
//       cardsList,
//       { name: inputAddPlaceName.value, link: inputAddPlaceLink.value },
//       'before'
//     );
//     closePopup(popupAddPlaceNode);
//     formPlace.reset();
//   });
// }
// addCard();
