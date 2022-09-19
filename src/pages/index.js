/* index.js - Корневая точка проекта. 
 Файл содержит только инициализацию необходимых главной странице модулей — функций и классов */
// В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.

// import { FormValidator } from '../scripts/FormValidator.js';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { Popup } from '../components/Popup.js';
import {
  settings,
  selectors,
  initialCards,
  cardsList,
  formProfile,
  inputEditName,
  inputEditJob,
  formPlace,
  inputAddPlaceName,
  inputAddPlaceLink,
  popupSelectorsImage,
} from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

const page = document.querySelector('.page');
// edit Profile
const popupEdit = document.querySelector('#overlay_edit'); // оверлей popup Edit
const btnEditProfile = document.querySelector('.profile__btn-edit'); // кнопка редактировать

const profileNameNode = page.querySelector('.profile__name');
const profileJobNode = page.querySelector('.profile__job');
// XXXXXXXXXXXXXXXXX  ДОБАВИТЬ МЕСТО - ХХХХХХХХХХХХХХХХХХХХХХХ
// btn "+" & add place window
const popupAddPlace = document.querySelector('#overlay_add-place'); // оверлей add place
const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / секции profile
const formElementCard = document.querySelector('#window_add-place'); // окно 430px add place
const btnCreatePlaceCard = document.querySelector('.btn_type_create-place'); // btn "сохранить/создать" место
// <template>,  list <ul>, btn-del
const cardTemplate = document.querySelector('#card-template').content; //.querySelector(selectors.card); // темплейт .content, и children
const btnDel = cardTemplate.querySelectorAll('.card__btn-del');
// image popup
const popupOfImage = document.querySelector('.popup_img-bg'); // оверлей img popup
const popupImage = document.querySelector('.popup__img'); // img popup
const popupText = document.querySelector('.popup__subtitle'); // текст/подзаголовок img


//--remove card----PW-8----------------------------------------------------
function handleRemoveCard(node) {
  //получаем ноду, удаляем ноду
  node.remove();
  node = null;
}

// Card ------------------------- создается экземпляр карточки, и возвращает готовую разметку
function initialiseCard(dataCard) {
  const newCard = new Card(
    { data: dataCard, handleImageOpenPopup, handleRemoveCard }, //handleCardClick: open
    '#card-template'
  );

  return newCard.generateCard(); //возвращает готовую разметку карточки, методом на экземпляре класса. вызываем генерацию карточки на том что нам вернул экземпляр класса
}
// УДАЛИТЬ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// //ПЕРЕБОРОМ МАССИВА КАРТОЧЕК, СОЗДАЕМ ИНСТАНС, ВЫЗЫВАЕМ ГЕНЕРИРОВАНИЕ КАЖДОЙ КАРТОЧКИ, РЕНДЕРИМ ИХ В СПИСОК
// initialCards.forEach((card) => {
//   const newCard = initialiseCard(card);
//   renderToContainer(cardsList, newCard)
// })
// // ВСТАВКА ЭЛЕМЕНТОВ В РАЗМЕТКУ - ВОЗВРАЩАЕМ ГОТОВЫЙ ЭЛЕМЕНТ КАРТОЧКИ, при нажатии submit / formPlace /btnCreatePlaceCard
// function renderToContainer(container, element) {
// container.append(element)
//   // container.append(card); // !!! Теперь данная функциональность не нужна (после реализованного выше)
// }
// - - -
// initialCards.forEach((item) => {
//   const card = new Card(item, '#card-template', () => {
//   popupWithImage.openPopup(item.link, item.name); //?? open ??
//   }); // ВМЕСТО: '#card-template'
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();
//   // Добавляем в DOM
//   renderToContainer(cardsList, cardElement)
//   // cardsList.append(cardElement);
// });

// -----------------------------------------------

// ф-ция создает объект из полей формы (перекидываем из index -> PopupWithForm)
function submitHandlerPlace(formDataObject) {
  // const newCard = initialiseCard(formDataObject); //создает экз класса и возвращает разметку. Она требует данные (данные реализованы здесь выше)
  // section.addItem(newCard); //добавляется своя карточка в момент нажатия сабмит формы
  //  вариант-2
    section.addItem(initialiseCard(formDataObject)) 
}

// Section ----------------------------------------------
// cardsList = section
// Ф-ция говорит что нужно сделать ДЛЯ ОДНОЙ КАРТОЧКИ когда получим данные, то что вернет initialiseCard() -готовую разметку
// Выгружаю начальные карточки. Инициализирую класс Section, передаю: {initialCards, renderer}, containerSelect
const section = new Section(
  {
    items: initialCards,
    renderer: (cardItem, container) => {
      //описывает что сделать с данными при переборе в цикле. //cardItem, container - просто параметры
      section.addItem(initialiseCard(cardItem, container));
    },
  },
  '.elements__list'
);

// ---------------------------------------------------------
//ДОБАВИТЬ СВОЮ КАРТОЧКУ
// function addCard() {
//   formPlace.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     renderToContainer(
//       cardsList,
//       { name: inputAddPlaceName.value, link: inputAddPlaceLink.value },
//       'before'
//     );
//     closePopup(popupAddPlace);
//     formPlace.reset();
//   });
// }
// addCard();

// -PW-8-------- работа с формой ----------------------------------------
// УДАЛИТЬ !!!!!!!!!!!!!

// function handleFormSubmit(formDataObject) {
//   console.log(formDataObject);
//   cardList.addItem(generateCard(formDataObject), 'before');
// }
// PW-8 перенести код в класс
// слушатель на окно формы (430px)
// formProfile.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const formDataObject = {};
//   const inputElements = formProfile.querySelectorAll('.popup__input');
//   [...inputElements].forEach((input) => {
//     formDataObject[input.name] = input.value; //'name - знач атрибута name=""
//     formDataObject[input.job] = input.value;
//   });
// });

// formPlace.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const formDataObject = {};
//   const inputElements = formPlace.querySelectorAll('.popup__input');
//   [...inputElements].forEach((input) => {
//     formDataObject[input.name] = input.value; //'name - знач атрибута name=""
//     formDataObject[input.link] = input.value;
//   });

//   const newCard = initialiseCard(formDataObject); //создает экз класса и возвращает разметку. Она требует данные (данные реализованы здесь выше)
//   section.addItem(newCard); //добавляется своя карточка в момент нажатия сабмит формы
// });

//--PW-8------ popup new Popup --------------------------------------------------
const newPopupProfile = new PopupWithForm(
  '#overlay_edit',
  '#form-add-profile',
  handleSaveSubmitEditForm
);
newPopupProfile.setEventListeners();// слушатель вызываем в прямом потоке кода, после создания экземпляра класса
// newPopupProfile.open()

const newPopupAddPlace = new PopupWithForm(
  '#overlay_add-place',
  '#form-place',
  submitHandlerPlace
);
newPopupAddPlace.setEventListeners(); //вызываем на экземпляре в прямом потоке кода
// newPopupAddPlace.open()

// const newPopupAdd = new PopupWithForm('#form-add-profile')
// document.forms.profile


const popupWithImage = new PopupWithImage('#overlay_img-zoom');
popupWithImage.setEventListeners();

function handleImageOpenPopup(data) {
 popupWithImage.open(data)
}


//----------------------------------------------------------------------------
function openPopup(modal) {
  // document.addEventListener('keyup', handleEscUp);
  modal.classList.add('popup_opened');

  // btnCreatePlaceCard.classList.add('btn_status_disabled');
  // btnCreatePlaceCard.setAttribute('disabled', 'disabled'); // устанавливаем атрибут disabled
}

function closePopup(modal) {
  // document.removeEventListener('keyup', handleEscUp); // удаляем событие keydown // Закрыли попап -- листенер можно удалить ****
  modal.classList.remove('popup_opened');
}

// function handleEscUp(evt) {
//   evt.preventDefault();
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }

function setPopupEditInputValue() {
  inputEditName.value = profileNameNode.textContent; // .trim(); // При открытии попапа поля формы заполняются данными из профиля.
  inputEditJob.value = profileJobNode.textContent; // .trim();
}

function setEditNodeTextContent() {
  profileNameNode.textContent = inputEditName.value; // Вставьте новые значения с помощью textContent
  profileJobNode.textContent = inputEditJob.value; // Получаем значение полей inputEditName  и inputEditJob из свойства value. //  // Выберите элементы, куда должны быть вставлены значения полей.
}
// ф-ция обработчик по форме Edit / "сохранить" и "отправить" данные из строки формы профиля
function handleSaveSubmitEditForm(evt) {
  // evt.preventDefault(); // Эта строка отменяет стандартную отправку формы.
  setEditNodeTextContent();
  closePopup(popupEdit);
}
// formProfile.addEventListener('submit', handleSaveSubmitEditForm); // слушатель по событию сабмит на форме (“submit” - «отправка») даже при нажатии на Enter

// ПР-7 --

// -- ОБРАБОТЧИКИ НА ОТКРЫТИЕ:
// кнопка "edit"
function handleButtonEditClick(evt) {
  setPopupEditInputValue(); // вызв заполнение полей
  openPopup(popupEdit);
}

// ---PW-8 ------------------- IMAGE POPUP

// // кнопка "+" / add place
function handleButtonAddPlaceClick() {
  openPopup(popupAddPlace);
}

//-------- слушатели кнопок
btnEditProfile.addEventListener('click', handleButtonEditClick); // "edit profile"
btnAddPlace.addEventListener('click', handleButtonAddPlaceClick); // "+" ("add")

// // ------- слушатели клика на попапы и кнопки "Х"
document.querySelectorAll('.popup').forEach((popup) => {
  // универсальный слушатель на все попап оверлеи, на закрытие
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup__btn-close') ||
      evt.target.classList.contains('popup')
    ) {
      closePopup(popup);
    }
  });
});

// FormValidator class

// const formProfileValid = new FormValidator(settings, formProfile);
// formProfileValid.enableValidation();

// const formPlaceValid = new FormValidator(settings, formPlace);
// formPlaceValid.enableValidation();

section.renderItems(initialCards);

export { openPopup, popupOfImage, popupImage, popupText };
