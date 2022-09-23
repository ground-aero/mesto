/* index.js - Корневая точка проекта. 
 Файл содержит только инициализацию необходимых главной странице модулей — функций и классов */
// В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.

import './index.css'; // добавьте импорт главного файла стилей
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  btnEditProfile,
  btnAddPlace,
  userInfo,
  initialCards,
  settings,
  formProfile,
  formPlace,
} from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

//--remove card----PW-8----------
function handleRemoveCard(node) {
  //получаем ноду, удаляем ее
  node.remove();
  node = null;
}

// Card ----------- создается экз, и возвращает разметку
function initialiseCard(dataCard) {
  const newCard = new Card(
    { data: dataCard, handleCardClick, handleRemoveCard }, //handleCardClick: open
    '#card-template'
  );

  return newCard.generateCard(); //возвращает разметку карточки, методом на экземпляре класса. вызываем генерацию карточки на том что нам вернул экземпляр класса
}

// -----------------------------------------------

// ф-ция создает объект из полей формы (перекидываем из index -> PopupWithForm)
function handlePlaceSubmit(formDataObject) {
  // const newCard = initialiseCard(formDataObject); //создает экз класса и возвращает разметку. Она требует данные (данные реализованы здесь выше)
  // section.addItem(newCard); //добавляется своя карточка в момент нажатия сабмит формы
  //  вариант-2
  section.addItem(initialiseCard(formDataObject));
}

// Section ------------------------------------
// cardsList = section
// Ф-ция говорит что нужно сделать для одной карточки когда получим данные, то что вернет initialiseCard() -готовую разметку. // Выгружаю начальные карточки. Инициализирую класс Section, передаю: {initialCards, renderer}, containerSelect
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

//----- new POPUPs ----------------------------
const newPopupProfile = new PopupWithForm(
  '#overlay_edit',
  '#form-add-profile',
  handleSaveSubmitEditForm
);
newPopupProfile.setEventListeners(); // слушатель вызываем в прямом потоке кода, после создания экземпляра класса

const newPopupAddPlace = new PopupWithForm(
  '#overlay_add-place',
  '#form-place',
  handlePlaceSubmit
);
newPopupAddPlace.setEventListeners(); //вызываем на экземпляре в прямом потоке кода

const popupWithImage = new PopupWithImage('#overlay_img-zoom');
popupWithImage.setEventListeners();

function handleCardClick(data) {
  popupWithImage.open(data);
}

//----------NEW userInfo ----------------------

// function initialiseUser() {
const { nameSelector, jobSelector } = userInfo;
const newUser = new UserInfo({ nameSelector, jobSelector });
// name: '.profile__name',
// job: '.profile__job'

//-------------------------------------------------------

// ф-ция обработчик по форме Edit / "сохранить" и "отправить" данные из строки формы профиля
function handleSaveSubmitEditForm(formDataObject) {
  newUser.setUserInfo(formDataObject); // setEditNodeTextContent();
  newPopupProfile.close(); // closePopup(popupEdit);
}

// -- ОБРАБОТЧИКИ НА ОТКРЫТИЕ:
// кнопка "edit"
function handleButtonEditClick() {
  // setPopupEditInputValue(); // вызв заполнение полей
  newPopupProfile.open(); // openPopup(popupEdit);
}

// // кнопка "+" / add place
function handleButtonAddPlaceClick() {
  newPopupAddPlace.open();
  //openPopup(popupAddPlace);
}

//-------- СЛУШАТЕЛИ КНОПОК
btnEditProfile.addEventListener('click', handleButtonEditClick); // "edit profile"
btnAddPlace.addEventListener('click', handleButtonAddPlaceClick); // "+" ("add")

// FormValidator class ------------------------------------
const formProfileValid = new FormValidator(settings, formProfile);
formProfileValid.enableValidation();

const formPlaceValid = new FormValidator(settings, formPlace);
formPlaceValid.enableValidation();

section.renderItems(initialCards);
