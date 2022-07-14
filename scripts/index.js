'use strict'

let page = document.querySelector('.page');

// profile - кнопки
let btnEdit = page.querySelector('.profile__btn-edit'); // кнопка редактировать
let btnAdd = page.querySelector('.profile__btn-add');
let btnLike = page.querySelectorAll('.element__btn-like');
// profile - поля
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');

// Находим POPUP форму в DOM
let popupForm = page.querySelector('.popup'); // Воспользуйтесь методом querySelector()
// POPUP Кнопки
let btnSave = page.querySelector('.popup__btn-save');
let btnClose = page.querySelector('.popup__btn-close');
// Находим поля формы в DOM
let inputName = page.querySelector('.popup__input_name'); // Воспользуйтесь инструментом .querySelector()
let inputJob = page.querySelector('.popup__input_job'); // Воспользуйтесь инструментом .querySelector()

function popupFormOpen() {
  // Чтобы попап открывался, ДОБАВЛЯЙТЕ ЕМУ МОДИФИКАТОР popup_opened с одним-единственным правилом...????
  // Попап должен открываться !!! по нажатию кнопки!!! «Редактировать» - btnEdit
  // а закрываться — при клике по крестику в правом верхнем углу - btnClose
  // ИЗМЕНЯТЬ ЗНАЧЕНИЕ СВОЙСТВА НА flex

//  popupForm.classList.add('popup_opened');
  page.querySelector('.popup').style.display = 'flex';

  // add display: flex;
  //   popupForm.removeAttribute('display');

  // 2.Чтобы закрыть попап, удаляйте у него модификатор popup_opened
  // 3. Отслеживайте клик по кнопке методом addEventListener.
}
//popupFormOpen();
btnEdit.addEventListener('click', popupFormOpen);

function popupFormClose() {
  page.querySelector('.popup').style.display = 'none';
}
btnClose.addEventListener('click', popupFormClose);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);
