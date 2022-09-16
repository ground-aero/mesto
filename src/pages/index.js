/* index.js - Корневая точка проекта. 
 Файл содержит только инициализацию необходимых главной странице модулей — функций и классов */
// В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Popup from '../components/Popup.js';
import {
  selectors,
  initialCards,
  formPlace,
  cardsList,
  inputAddPlaceName,
  inputAddPlaceLink,
  popupAddPlaceNode,
} from '../utils/constants.js';

const page = document.querySelector('.page');
// edit Profile
const popupEditNode = document.querySelector('#overlay_edit'); // оверлей popup Edit
const btnEditProfile = document.querySelector('.profile__btn-edit'); // кнопка редактировать
const formProfile = document.forms.profile; // получаем форму profile по св-ву name
const inputEditName = formProfile.elements.nameEdit; // по св-ву name // page.querySelector('#popup__input_type_edit-name');
const inputEditJob = formProfile.elements.job; // // page.querySelector('#popup__input_type_job');
const profileNameNode = page.querySelector('.profile__name');
const profileJobNode = page.querySelector('.profile__job');
// XXXXXXXXXXXXXXXXX  ДОБАВИТЬ МЕСТО - ХХХХХХХХХХХХХХХХХХХХХХХ
// btn "+" & add place window
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

const popupWithImage = new PopupWithImage('.popup_img-bg');

// function handleFormSubmit(formDataObject) {
//   console.log(formDataObject);
//   cardList.addItem(generateCard(formDataObject), 'before');
// }

// Card --------------------------------- создается нода, возвращает готовую разметку
function initialiseCard(dataCard) {
  const newCard = new Card(
    { data: dataCard, handleCardClick: openPopup },
    '#card-template'
  );

  return newCard.generateCard(); //возвращает готовую разметку карточки, методом на экземпляре класса. вызываем генерацию карточки на том что нам вернул экземпляр класса
}
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

// Section ----------------------------------------------
// cardsList = section
// Ф-ция говорит что нужно сделать ДЛЯ ОДНОЙ КАРТОЧКИ когда получим данные, то что вернет initialiseCard() -готовую разметку
// Выгружаю начальные карточки. Инициализирую класс Section, передаю: {initialCards, renderer}, containerSelect
const section = new Section(
  {
    items: initialCards,
    renderer: (cardItem, container) => {
      //cardItem, container - просто параметры
      section.addItem(initialiseCard(cardItem, container));
    },
  },
  '.elements__list'
);

// ---------------------------------------------------------

//ДОБАВИТЬ СВОЮ КАРТОЧКУ
function addCard() {
  formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderToContainer(
      cardsList,
      { name: inputAddPlaceName.value, link: inputAddPlaceLink.value },
      'before'
    );
    closePopup(popupAddPlaceNode);
    formPlace.reset();
  });
}
addCard();

function openPopup(modal) {
  document.addEventListener('keyup', handleEscUp);
  modal.classList.add('popup_opened');

  btnCreatePlaceCard.classList.add('btn_status_disabled');
  btnCreatePlaceCard.setAttribute('disabled', 'disabled'); // устанавливаем атрибут disabled
}

function closePopup(modal) {
  document.removeEventListener('keyup', handleEscUp); // удаляем событие keydown // Закрыли попап -- листенер можно удалить ****
  modal.classList.remove('popup_opened');
}

function handleEscUp(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

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
  evt.preventDefault(); // Эта строка отменяет стандартную отправку формы.
  setEditNodeTextContent();
  closePopup(popupEditNode);
}
formProfile.addEventListener('submit', handleSaveSubmitEditForm); // слушатель по событию сабмит на форме (“submit” - «отправка») даже при нажатии на Enter

// ПР-7 --

// -- ОБРАБОТЧИКИ НА ОТКРЫТИЕ:
// кнопка "edit"
function handleButtonEditClick(evt) {
  setPopupEditInputValue(); // вызв заполнение полей
  openPopup(popupEditNode);
}

// кнопка "+" / add place
function handleButtonAddPlaceClick() {
  // evt.preventDefault();
  openPopup(popupAddPlaceNode);
}

//-------- слушатели кнопок
btnAddPlace.addEventListener('click', handleButtonAddPlaceClick); // "+" ("add")
btnEditProfile.addEventListener('click', handleButtonEditClick); // "edit profile"

// ------- слушатели клика на попапы и кнопки "Х"
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
