let page = document.querySelector('.page');

// Находим форму в DOM
let popupForm = page.querySelector('.popup'); // Воспользуйтесь методом querySelector()
// кнопки
let btnEdit = page.querySelector('.profile__btn-edit'); // кнопка редактировать
let btnAdd = page.querySelector('.profile__btn-add');
let btnSave = page.querySelector('.popup__btn-save');
let btnClose = page.querySelector('.popup__btn-close');
let btnLike = page.querySelectorAll('.element__btn-like');

let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');

// Находим поля формы в DOM
let inputName = page.querySelector('.popup__input_name'); // Воспользуйтесь инструментом .querySelector()
let inputJob = page.querySelector('.popup__input_job'); // Воспользуйтесь инструментом .querySelector()

console.log(typeof inputJob);

function popupFormOpen(onclick) {
  // Попап должен открываться !!! по нажатию кнопки!!! «Редактировать»,
  // а закрываться — при клике по крестику в правом верхнем углу:
  //  alert('XXXX xxxx!');
}

popupFormOpen();

popupForm.addEventListener('button', popupFormOpen);

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
