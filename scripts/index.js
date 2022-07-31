// 'use strict';
const page = document.querySelector('.page');

// edit Profile
const popupEditNode = document.querySelector('.popup_type_edit'); // Находим POPUP-edit форму в DOM.
const btnEditProfile = document.querySelector('.profile__btn-edit'); // кнопка редактировать
const btnSave = document.querySelector('.btn_type_save-profile');
const btnClose = document.querySelector('.popup__btn-close');
let inputName = page.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let inputJob = page.querySelector('.popup__input_type_job');
let profileNameNode = page.querySelector('.profile__name');
let profileJobNode = page.querySelector('.profile__job');
// add Place
const btnAddPlace = document.querySelector('.profile__btn-addplace');
const btnCreateSavePlace = document.querySelector('.btn_type_create-place'); // btn "сохранить/создать"
const popupAddPlaceNode = document.querySelector('.popup_type_add-place'); // Находим POPUP-add форму в DOM.
// let btnLike = page.querySelectorAll('.element__btn-like');

// // Каждый попап сохраните в своей переменной и создайте функцию, которая будут принимать в качестве аргумента указание,
// // какой именно попап надо открыть или закрыть, т.е. передавайте туда класс-модификатор из совета ранее.

// ---- обработчик закрытия по кнопке "Х" и клику на страницу ------
function handlerClosePopupClick(evt) {
  const target = evt.target;
  const activePopup = document.querySelector('.popup_opened');
  if (
    target.classList.contains('popup__btn-close') ||
    target.classList.contains('popup')
  ) {
    closePopup(activePopup);
  }
}

function openPopup(modal) {
  // modal - параметр в который подставляютлся любые нод-элементы, и дальше на него вешается classList. (popupNode тоже подставлется в modal)
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

// -- обработчик кнопки edit
function handlerButtonEditClick(evt) {
  evt.preventDefault();
  setPopupEditInputValue(); // вызв заполнение полей
  openPopup(popupEditNode);
}

// --------------- input values & textContent
function setPopupEditInputValue() {
  inputName.value = profileNameNode.textContent.trim(); // При открытии попапа поля формы заполняются данными из профиля.
  inputJob.value = profileJobNode.textContent.trim();
}

function setEditNodeTextValue() {
  profileNameNode.textContent = inputName.value; // Вставьте новые значения с помощью textContent
  profileJobNode.textContent = inputJob.value; // Получаем значение полей inputName  и inputJob из свойства value. //  // Выберите элементы, куда должны быть вставлены значения полей.
}

// --------- обрботчик кнопки "сохранить" в ноде Edit
function handlerButtonSaveSubmitForm(evt) {
  // Функция Сохранения btn_type_save-profile и «отправки» данных из строк формы профиля, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  setEditNodeTextValue();
  closePopup(popupEditNode);
}
popupEditNode.addEventListener('submit', handlerButtonSaveSubmitForm); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

// ------------------------------------------------------------------
// --- обработчик кнопки "+" / добавить Место
function handlerButtonAddPlaceClick(evt) {
  evt.preventDefault();
  openPopup(popupAddPlaceNode);
}
btnAddPlace.addEventListener('click', handlerButtonAddPlaceClick); // слушатель клика повешен на кнопку "+" ("add")
// btnAddPlace.addEventListener('click', () => openPopup(popupAddPlaceNode)); // слушатель клика повешен на кнопку "+" ("add")

// ######## НАПИСАТЬ ДОБАВЛЕНИЕ КАРТОЧЕК

// Сделайте так, чтобы при клике на «сохранить» 'btnSave'(.btn_type_save-profile) новая карточка попадала в начало контейнера с ними.
// А диалоговое окно после добавления автоматически закрывалось.
// Чтобы создавать новые карточки, добавьте обработчик событий submit.
//Сделайте это аналогично прошлому спринту, в котором вы настраивали редактирование информации о пользователе.

// --------- обрботчик кнопки "сохранить(submit)" в ноде Place

function handlerButtonSaveSubmitPlaceForm(evt) {
  // Функция Сохранения btn_type_save-profile и «отправки» данных из строк формы профиля, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.

  setEditNodeTextValue();
  closePopup(popupAddPlaceNode);
}
btnCreateSavePlace.addEventListener('submit', handlerButtonSaveSubmitPlaceForm); // Прикрепляем обработчик к кнопке: будет следить за событием “submit” - «отправка»





//-------- к н о п к и
btnEditProfile.addEventListener('click', handlerButtonEditClick);
btnSave.addEventListener('click', handlerButtonSaveSubmitForm);

btnClose.addEventListener('click', handlerClosePopupClick); // слушатель клика повешен на кнопку "close"
page.addEventListener('click', handlerClosePopupClick);

// ///// - ЧЕРНОВИК - \\\\\\ ФОРМА POPUP EDIT /////////// ----------------------------------------------------------
// откр
// function popupEditNodeOpen(modal) { // принимаем в кач-ве параметра ДОМ-элемент
//   popupEditNode.classList.add('popup_opened'); // форме попап добавлен класс-модификатор открытия

//   inputName.value = profileNameNode.textContent; // При открытии попапа поля формы заполняются данными из профиля.
//   inputJob.value = profileJobNode.textContent;
// }
// btnEditProfile.addEventListener('click', popupEditNodeOpen); // слушатель клика повешен на кнопку "edit"

// закр
// function popupEditNodeClose() {
//   popupEditNode.classList.remove('popup_opened'); // из формы попап удаляется класс-модификатор открытия
// }
// btnClose.addEventListener('click', popupEditNodeClose); // слушатель клика повешен на кнопку "close"
// -------------------------------------------------------------------------------------------------------------

// ФОРМА POPUP ADD -----------------
// откр
// function popupAddPlaceNodeOpen() {
//   popupAddPlaceNode.classList.add('popup_opened'); // форме попап добавлен класс-модификатор открытия
// }
// btnAddPlace.addEventListener('click', popupAddPlaceNodeOpen); // слушатель клика повешен на кнопку "+" ("add")

// // закр
// function popupAddPlaceNodeClose() {
//   popupAddPlaceNode.classList.remove('popup_opened'); // из формы попап удаляется класс-модификатор открытия

//   btnClose.addEventListener('click', popupAddPlaceNodeClose); // слушатель клика повешен на кнопку "close"
// }
// ---------------------------------------------------------------------------------------------------------

//  После внесения изменений и НАЖАТИЯ КНОПКИ «СОХРАНИТЬ» - btnSave
// function handlerButtonSaveSubmitForm() {     // информация на странице ДОЛЖНА ОБНОВИТЬСЯ, А ПОПАП АВТОМАТИЧЕСКИ ЗАКРЫТЬСЯ:
//    profileNameNode.innerHTML = `
//    <div class="profile__name-wrap">
//      <h1 class="profile__name">${inputName.value}</h1>
//    </div>`;
//   profileJobNode.innerHTML = `
//    <div class="profile__name-wrap">
//     <p class="profile__job">${inputJob.value}</p>
//    </div>`;

//    popupEditNodeClose();
// }

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

const selectors = {
  template: '#element-template',
  list: '.elements__list', // список карточек
  card: '.element',
  image: '.element__img',
  titleWrapper: '.element__info-wrap',
  title: '.element__title',
  btnLike: '.element__btn-like', // была объявлена выше
  btnDel: '.element__btn-del',
};

const cardsList = document.querySelector(selectors.list); // выбрали список
// const cardTemplate = document.querySelector(selectors.template).content.querySelector(selectors.card); // (!)темплейт через св-во content, и children
const cardTemplate = document.querySelector(selectors.template).content; //(!) выбираем темплейт через св-во content, и children

const INITIAL_CARDS = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

INITIAL_CARDS.forEach(function (element) {  // перебираем массив
  const cardElement = cardTemplate.cloneNode(true); // клонируем содержимое тега <template> (через объявление переменной)

  cardElement.querySelector(selectors.title).textContent = element.name; // теперь из темплейта берем текстовое содержимое тега <>, и присваиваем соотв. значение(я) из перебираемого массива
  cardElement.querySelector(selectors.image).src = element.link; // из темплейта берем текстовое содержимое тега <>, и присваиваем соотв. значение(я) из перебираемого массива

  cardsList.append(cardElement); // в список на странице втавляем склонированный контент, со всеми св-вами отобранными выше
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxx
// function renderCard(data, container, position = 'append') {
//   const card = createCard(data); //node
//   switch (position) {
//     case 'append':
//       return container.append(card);
//     case 'prepend':
//       return container.prepend(card);
//     case 'before':
//       return container.before(card);
//     case 'after':
//       return container.after(card);
//     default:
//       return;
//   }
//   // container.append(todo)
// }

// ##################################################################################################################
// function createCard(data) {
//   // создание карточки (но еще не её добавление)
//   // p.s - data (или name) - это элемент массива
//   const cardElement = template.cloneNode(true); // из шаблона создаем разметку с содержимым, примен метод (cloneNode(true) - глубокое копирование со всеми дочерними элементами
//   // теперь на этой склонированной ноде мы можем повесить обработчики события, и производить любые разные действия

//   const cardImage = cardElement.querySelector(selectors.image);
//   const cardTitle = cardElement.querySelector(selectors.title);
//   const cardButtonLike = cardElement.querySelector(selectors.btnLike);
//   const cardButtonDel = cardElement.querySelector(selectors.btnDel);

//   cardButtonLike.addEventListener('click', function(evt) {
//   // здесь создать эффект проставления лайка
//   })

//   // cardButtonDel.addEventListener('click', function (evt) {
//   //   ... .remove // здесь создать удаление карточки
//   // });

//   cardTitle.textContent = data; // ?????????????????????????
//   // data = { ?????????????????????????????
//   //   name: name,
//   //   link: link,
//   // };
//   // list.append(cardElement); // !!! выносим отдельно!!! Иначе карточка добавляется в момент ее создания (а это отдельная функция). Методом вставки узла (append) передаем готовую дом-ноду card

//   return cardElement;
// }
// createCard();

// function renderCard(data, container) {
//   // Задача ф-ции: добавимть на страницу. container - это наш лист
//   const card = createCard(data); // получаем node // передаем эти данные в createCard, которые будут в нее переданы в момент
//   container.append(card); // добавляем ноду на страницу

//   // list.append(cardElement); // момент добавления карточки (ф-ция создания была выше)
// }

// xxxxxxxxxxxxxxxxxxxxxxxxxxxx
// function renderCard(data, container, position = 'append') {
//   const card = createCard(data); //node
//   switch (position) {
//     case 'append':
//       return container.append(card);
//     case 'prepend':
//       return container.prepend(card);
//     case 'before':
//       return container.before(card);
//     case 'after':
//       return container.after(card);
//     default:
//       return;
//   }
//   // container.append(todo)
// }
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxчччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччч
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxx - openPopup(popupImageContainer) - xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// function openPopup(modal) {
//   // p.s - одна общая кнопка закрытия и один addEventListener ......
//   modal.classList.add('popup_visible');
// }

// function closePopup(evt) {
//   const closeBtn = evt.target;

//   if (closeBtn.classList.contains('popup__close-buttonm')) {
//     closeBtn.closest('popup').classList.remove('popup_visible');
//   }
// }

// дополнительно !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// page.addEventListener('click', closePopup);

//
//
//

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxx reserved xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// const templateCard = page.querySelector('#template-card').content; // получаем Темплейт
// const elementsCardsList = page.querySelector('.elements__list'); // получаем тег списка всех карточек - секции elements

// const elementCard = page.querySelector('.element'); // получаем одну карточку из секции elements

// const cloneOfElementCard = templateCard
//   .querySelector('.element')
//   .cloneNode(true); // клонируем содержимое карточки

// // наполняем содержимым
// // cloneOfElementCard.querySelector('.element');
// cloneOfElementCard.querySelector('.element__img').src =
//   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
// cloneOfElementCard.querySelector('.element__title').textContent = 'Архыз';

// // отображаем на странице
// elementsCardsList.append(cloneOfElementCard);

// // const sectionElementsCards = page.querySelectorAll('.elements__list.element'); // карточки из секции elements ul>li

// // sectionElementsCards.innerHTML = INITIAL_CARDS;
