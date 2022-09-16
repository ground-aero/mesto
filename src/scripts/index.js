// /* index.js - Корневая точка проекта. 
//  Файл содержит только инициализацию необходимых главной странице модулей — функций и классов */
// // В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.

// import { FormValidator } from './FormValidator.js';
// import { Card } from './Card.js';
// import { Section } from '../components/Section.js';

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
//   },
// ];
// const selectors = {
//   card: '.card', // карточка
//   image: '.card__img', // img/card
//   title: '.card__title', // title/card
//   btnLike: '.card__btn-like', // like/card
//   btnDel: '.card__btn-del', // del/card
//   like: '.card__btn-like_active', // like/card
// };

// const page = document.querySelector('.page');
// // edit Profile
// const popupEditNode = document.querySelector('#overlay_edit'); // оверлей popup Edit
// const btnEditProfile = document.querySelector('.profile__btn-edit'); // кнопка редактировать
// const formProfile = document.forms.profile; // получаем форму profile по св-ву name
// const inputEditName = formProfile.elements.nameEdit; // по св-ву name // page.querySelector('#popup__input_type_edit-name');
// const inputEditJob = formProfile.elements.job; // // page.querySelector('#popup__input_type_job');
// const profileNameNode = page.querySelector('.profile__name');
// const profileJobNode = page.querySelector('.profile__job');

// function openPopup(modal) {
//   document.addEventListener('keyup', handleEscUp);
//   modal.classList.add('popup_opened');

//   btnCreatePlaceCard.classList.add('btn_status_disabled');
//   btnCreatePlaceCard.setAttribute('disabled', 'disabled'); // устанавливаем атрибут disabled
// }

// function closePopup(modal) {
//   document.removeEventListener('keyup', handleEscUp); // удаляем событие keydown // Закрыли попап -- листенер можно удалить ****
//   modal.classList.remove('popup_opened');
// }

// function handleEscUp(evt) {
//   evt.preventDefault();
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }

// function setPopupEditInputValue() {
//   inputEditName.value = profileNameNode.textContent; // .trim(); // При открытии попапа поля формы заполняются данными из профиля.
//   inputEditJob.value = profileJobNode.textContent; // .trim();
// }
// function setEditNodeTextContent() {
//   profileNameNode.textContent = inputEditName.value; // Вставьте новые значения с помощью textContent
//   profileJobNode.textContent = inputEditJob.value; // Получаем значение полей inputEditName  и inputEditJob из свойства value. //  // Выберите элементы, куда должны быть вставлены значения полей.
// }
// // ф-ция обработчик по форме Edit / "сохранить" и "отправить" данные из строки формы профиля
// function handleSaveSubmitEditForm(evt) {
//   evt.preventDefault(); // Эта строка отменяет стандартную отправку формы.
//   setEditNodeTextContent();
//   closePopup(popupEditNode);
// }
// formProfile.addEventListener('submit', handleSaveSubmitEditForm); // слушатель по событию сабмит на форме (“submit” - «отправка») даже при нажатии на Enter

// // XXXXXXXXXXXXXXXXX  ДОБАВИТЬ МЕСТО - ХХХХХХХХХХХХХХХХХХХХХХХ

// // btn "+" & add place window
// const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / секции profile
// const popupAddPlaceNode = document.querySelector('#overlay_add-place'); // оверлей add place
// const formElementCard = document.querySelector('#window_add-place'); // окно 430px add place
// const formPlace = document.forms.place; // получаем форму place по св-ву name
// const inputAddPlaceName = formPlace.elements.name; // ('#input-name'); // input/field/name/ add place
// const inputAddPlaceLink = formPlace.elements.link; // page.querySelector('#input-link'); // input/field/link/ add place
// const btnCreatePlaceCard = document.querySelector('.btn_type_create-place'); // btn "сохранить/создать" место
// // <template>,  list <ul>, btn-del
// const cardsList = document.querySelector('.elements__list'); // список карточек <ul>
// const cardTemplate = document.querySelector('#card-template').content; //.querySelector(selectors.card); // темплейт .content, и children
// const btnDel = cardTemplate.querySelectorAll('.card__btn-del');
// // image popup
// const popupOfImage = document.querySelector('.popup_img-bg'); // оверлей img popup
// const popupImage = document.querySelector('.popup__img'); // img popup
// const popupText = document.querySelector('.popup__subtitle'); // текст/подзаголовок img

// // ПР-7 --

// //ИНИЦИАЛИЗАЦИЯ КЛАССА Card, И ВОЗВРАЩЕНИЕ В РАЗМЕТКУ
// const initialiseClassCard = (data) => {
//   const card = new Card(data, selectors);
//   return card.generateCard(); // 1. метод возвращает разметку();
// };

// //ПЕРЕБОРОМ МАССИВА КАРТОЧЕК, СОЗДАЕМ ИНСТАНС, ВЫЗЫВАЕМ ГЕНЕРИРОВАНИЕ КАЖДОЙ КАРТОЧКИ, АПЕНДИМ ИХ В СПИСОК
// initialCards.forEach((item) => {
//   const card = new Card(item, selectors); // ВМЕСТО: '#card-template'
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();
//   // Добавляем в DOM
//   cardsList.append(cardElement);
//   // document.body.append(cardElement);
// });

// // ВСТАВКА ЭЛЕМЕНТОВ В РАЗМЕТКУ - ВОЗВРАЩАЕМ ГОТОВЫЙ ЭЛЕМЕНТ КАРТОЧКИ, при нажатии submit / formPlace /btnCreatePlaceCard
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

// // -- ОБРАБОТЧИКИ НА ОТКРЫТИЕ:
// // кнопка "edit"
// function handleButtonEditClick(evt) {
//   setPopupEditInputValue(); // вызв заполнение полей
//   openPopup(popupEditNode);
// }

// // кнопка "+" / add place
// function handleButtonAddPlaceClick() {
//   // evt.preventDefault();
//   openPopup(popupAddPlaceNode);
// }

// //-------- слушатели кнопок
// btnAddPlace.addEventListener('click', handleButtonAddPlaceClick); // "+" ("add")
// btnEditProfile.addEventListener('click', handleButtonEditClick); // "edit profile"

// // ------- слушатели клика на попапы и кнопки "Х"
// document.querySelectorAll('.popup').forEach((popup) => {
//   // универсальный слушатель на все попап оверлеи, на закрытие
//   popup.addEventListener('mousedown', (evt) => {
//     if (
//       evt.target.classList.contains('popup__btn-close') ||
//       evt.target.classList.contains('popup')
//     ) {
//       closePopup(popup);
//     }
//   });
// });

// export { openPopup, popupOfImage, popupImage, popupText };

// // FormValidator class

// //КОНФИГИ ФОРМ
// const settings = {
//   formClass: '.popup__form',
//   inputClass: '.popup__input',
//   submitButtonClass: '.btn_submit',
//   disabledButtonClass: 'btn_status_disabled', // button disabled style
//   errorInputClass: 'popup__input-span_error_active', // <span> error
//   errorLineClass: 'popup__input_line_error',
// };

// const formProfileValid = new FormValidator(settings, formProfile);
// formProfileValid.enableValidation();

// const formPlaceValid = new FormValidator(settings, formPlace);
// formPlaceValid.enableValidation();
