'use strict';
let page = document.querySelector('.page');

// popup
let popupForm = page.querySelector('.popup'); // Находим POPUP форму в DOM.
let btnSave = page.querySelector('.popup__btn-save');
let btnClose = page.querySelector('.popup__btn-close');
// поля формы в DOM
let inputName = page.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let inputJob = page.querySelector('.popup__input_type_job'); 

// profile - кнопки
let btnEdit = page.querySelector('.profile__btn-edit'); // кнопка редактировать
let btnAdd = page.querySelector('.profile__btn-add');
let btnLike = page.querySelectorAll('.element__btn-like');
// profile - поля
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');

function popupFormOpen() {
  popupForm.classList.add('popup_opened'); // форме попап добавлен класс-модификатор открытия
  inputName.value = profileName.textContent; // При открытии попапа поля формы заполняются данными из профиля.
  inputJob.value = profileJob.textContent;
}

btnEdit.addEventListener('click', popupFormOpen); // слушатель клика повешен на кнопку "edit"

function popupFormClose() {
  popupForm.classList.remove('popup_opened'); // из формы попап удаляется класс-модификатор открытия
}

btnClose.addEventListener('click', popupFormClose); // слушатель клика повешен на кнопку "close"

//  После внесения изменений и НАЖАТИЯ КНОПКИ «СОХРАНИТЬ» - btnSave
// function formSubmitHandler() {     // информация на странице ДОЛЖНА ОБНОВИТЬСЯ, А ПОПАП АВТОМАТИЧЕСКИ ЗАКРЫТЬСЯ:
//    profileName.innerHTML = `
//    <div class="profile__name-wrap">
//      <h1 class="profile__name">${inputName.value}</h1>
//    </div>`;
//   profileJob.innerHTML = `
//    <div class="profile__name-wrap">
//     <p class="profile__job">${inputJob.value}</p>
//    </div>`;

//    popupFormClose();
// }

// btnSave.addEventListener('click', formSubmitHandler);

function formSubmitHandler(evt) {
  // Функция сохранения и «отправки» данных из строк формы профиля, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.

  profileName.textContent = inputName.value; // Получите значение полей inputName  и inputJob из свойства value
  profileJob.textContent = inputJob.value; // Выберите элементы, куда должны быть вставлены значения полей.
  // Вставьте новые значения с помощью textContent

  popupFormClose();
}

popupForm.addEventListener('submit', formSubmitHandler); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
