// 'use strict';
const page = document.querySelector('.page');
// edit Profile
const popupEditNode = document.querySelector('#overlay_edit'); // оверлей popup Edit
const btnEditProfile = document.querySelector('.profile__btn-edit'); // кнопка редактировать
const formProfile = document.forms.profile; // получаем форму profile по св-ву name
let inputEditName = formProfile.elements.nameEdit; // по св-ву name // page.querySelector('#popup__input_type_edit-name');
let inputEditJob = formProfile.elements.job; // // page.querySelector('#popup__input_type_job');
const btnSaveProfile = document.querySelector('.btn_type_save-profile');
const btnsClose = document.querySelectorAll('.popup__btn-close');
let profileNameNode = page.querySelector('.profile__name');
let profileJobNode = page.querySelector('.profile__job');

//  обработчик закрытия попапов, по кнопке "Х" // и клику на страницу
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
// --- input values & textContent
function setPopupEditInputValue() {
  inputEditName.value = profileNameNode.textContent; // .trim(); // При открытии попапа поля формы заполняются данными из профиля.
  inputEditJob.value = profileJobNode.textContent; // .trim();
}
function setEditNodeTextContent() {
  profileNameNode.textContent = inputEditName.value; // Вставьте новые значения с помощью textContent
  profileJobNode.textContent = inputEditJob.value; // Получаем значение полей inputEditName  и inputEditJob из свойства value. //  // Выберите элементы, куда должны быть вставлены значения полей.
}
// ф-ция обработчик по форме Edit / "сохранить" и "отправить" данные из строки формы профиля
function handlerSaveSubmitEditForm(evt) {
  evt.preventDefault(); // Эта строка отменяет стандартную отправку формы.
  setEditNodeTextContent();
  closePopup(popupEditNode);
}
popupEditNode.addEventListener('submit', handlerSaveSubmitEditForm); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка» даже при нажатии на Enter

// XXXXXXXXXXXXXXXXX  ДОБАВИТЬ МЕСТО - ХХХХХХХХХХХХХХХХХХХХХХХ

const selectors = {
  card: '.element', // карточка
  image: '.element__img', // img/card
  title: '.element__title', // title/card
  btnLike: '.element__btn-like', // like/card
  btnDel: '.element__btn-del', // del/card
  like: '.element__btn-like_active', // like/card
};
// btn "+" & add place window
const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / секции profile
const popupAddPlaceNode = document.querySelector('#overlay_add-place'); // оверлей add place
const formElementCard = document.querySelector('#window_add-place'); // окно 430px add place
// input & form / add place:
// const formAddPlace = document.querySelector('.popup__form'); // input/form
const formAddPlace = document.forms.place; // получаем форму place по св-ву name
const inputAddPlaceName = formAddPlace.elements.name; // ('#input-name'); // input/field/name/ add place
const inputAddPlaceLink = formAddPlace.elements.link; // page.querySelector('#input-link'); // input/field/link/ add place
const btnCreatePlaceCard = document.querySelector('.btn_type_create-place'); // btn "сохранить/создать"
// <template>,  list <ul>, btn-del
const cardsList = document.querySelector('.elements__list'); // список карточек <ul>
const cardTemplate = document.querySelector('#element-template').content; //.querySelector(selectors.card); // темплейт .content, и children
const btnDel = cardTemplate.querySelectorAll('.element__btn-del');
// image popup
const popupOfImage = document.querySelector('#overlay_img-zoom'); // оверлей img popup
const popupImage = document.querySelector('.popup__img'); // img popup
const popupText = document.querySelector('.popup__subtitle'); // текст/подзаголовок img

// ф-ция создания узла/карточки (но еще не её добавление)
function createCard(link, name) {
  // const cardElement = cardTemplate.querySelector(selectors.card).cloneNode(true); // клонир содерж 1 карточки
  const cardElement = cardTemplate
    .querySelector(selectors.card)
    .cloneNode(true); // клонир содерж 1 карточки
  const cardImage = cardElement.querySelector(selectors.image); // объявл переменные дочерн.элементв клонируемой карточки
  const cardTitle = cardElement.querySelector(selectors.title);
  const cardBtnDel = cardElement.querySelector(selectors.btnDel); // ++
  const cardBtnLike = cardElement.querySelector(selectors.btnLike); // ++

  // (для клонированной карточки) присваиваем атрибуты с данными со входа
  cardImage.src = link;
  cardTitle.textContent = name;
  cardImage.alt = name;

  // удаление карточки
  cardBtnDel.addEventListener('click', function () {
    const cardElement = cardBtnDel.closest('.element');
    cardElement.remove();
  });
  // cardBtnDel.addEventListener('click', () => cardElement.remove());

  // лайк
  cardBtnLike.addEventListener('click', function like(el) {
    el.target.classList.toggle('element__btn-like_active');
    return el;
  });
  // cardBtnLike.addEventListener('click', like);

  // img open-popup/ zoom
  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupText.textContent = name;
    popupImage.alt = name;
    openPopup(popupOfImage);
  });

  return cardElement; // карточка с заполненным содержимым
}

// обработчик открытия попапа img
// function popupOfImage(el)
function handlerImagePopupClick(evt) {
  evt.preventDefault();
  openPopup(popupOfImage);
}

// ф-ция кнопки лайк
// function like(el) {
//   e.target.classList.toggle('element__btn-like_active');
// }

// ф-ция удаления карточки
// function del(el) {
//   e.target. cardElement.remove();
// }

// ф-ция: добавление на страницу. container - лист
function renderCard(container, data, position = 'before') {
  // Ф-ция renderCard ЖДЕТ ОБЪЕКТ !!!!!!
  // const cardElement = createCard(data); //node
  switch (position) {
    case 'before':
      container.prepend(createCard(data.link, data.name));
      break;
    case 'after':
      container.append(createCard(data.link, data.name));
      break;
    default:
      break;
  }
  // container.append(card)
}

// слушатель окна 430px / add place
function addEventListener() {
  formElementCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(
      cardsList,
      { link: inputAddPlaceLink.value, name: inputAddPlaceName.value },
      'before'
    ); // Ф-ция renderCard ЖДЕТ ОБЪЕКТ !!!!
    closePopup(popupAddPlaceNode);
  });
}
addEventListener();

// createInitialCards(); ------------------------------
function createInitialCards() {
  initialCards.forEach(function (item) {
    // перебираемый объект
    renderCard(cardsList, item, 'before'); // // передаем весь объект
    // xxxx в список на странице втавляем склонированный контент, со всеми св-вами отобранными выше xxxxxx
  });
}
createInitialCards();

// ----------------------------------------------
// - открыть (диалоговое окно) add place попап
// обработчик кнопки "+" / Place / открыть
function handlerButtonAddPlaceClick(evt) {
  evt.preventDefault();
  openPopup(popupAddPlaceNode);
}
btnAddPlace.addEventListener('click', handlerButtonAddPlaceClick); // слушатель клика на кнопке "+" ("add")

//-------- к н о п к и
btnEditProfile.addEventListener('click', handlerButtonEditClick);
btnSaveProfile.addEventListener('click', handlerSaveSubmitEditForm);
// btnClose.addEventListener('click', handlerClosePopupClick); // addEL на кнопку "close"
btnsClose.forEach((buttonClose) =>
  buttonClose.addEventListener('click', handlerClosePopupClick)
);

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// xxxxxxxxxxxxxxxxx validate xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// const inputsAll = Array.from(document.querySelectorAll('.popup__input')); // получ nodeList - поля инпута каждого из полей каждой из форм

// const formError = document.querySelector('#input-error-edit'); // span error
// console.log(inputsAll);
// console.log(formError);

// // Функция, добавляет класс с ошибкой
// const showInputError = (element, errorMessage) => {
//   // передадим текст ошибки вторым параметром
//   element.classList.add('popup__input_line_error'); // стили - нижняя красная линия
//   // Заменим содержимое span с ошибкой на переданный параметр
//   formError.textContent = errorMessage;
//   formError.classList.add('popup__input-span_error_active'); // form__input-error_active // стили - span с красной ошибкой
// };

// // Функция, удаляет классы с ошибкой
// const hideInputError = (element) => {
//   element.classList.remove('form__input_line_error');
//   formError.classList.remove('popup__input-span_error_active');
//   // Очистим ошибку
//   formError.textContent = '';
// };

// // Функция, проверяет валидность поля, внутри вызывает showInputError или hideInputError.
// const isValid = () => {
//   if (!inputEditName.validity.valid) {
//     // Если поле не проходит валидацию, покажем ошибку
//     // Передадим сообщение об ошибке вторым аргументом
//     showInputError(inputEditName, inputEditName.validationMessage);
//   } else {
//     // Если проходит, скроем
//     hideInputError(inputEditName);
//   }
// };
// // const isValid = () => {
// //  inputsAll.forEach(input => {
// //   if (!input.validity.valid) {
// //     // Если поле не проходит валидацию, покажем ошибку
// //     // Передадим сообщение об ошибке вторым аргументом
// //     showInputError(input, input.validationMessage);
// //   } else {
// //     // Если проходит, скроем
// //     hideInputError(input);
// //   }
// // });
// // }

// formProfile.addEventListener('submit', function (evt) {
//   // Отменим стандартное поведение по сабмиту // !! Выбрана только 1 форма из 2-х
//   evt.preventDefault();
// });

// // Вызовем функцию isValid на каждый ввод символа
// inputEditName.addEventListener('input', isValid);
// // inputsAll.forEach(input => {
// //   input.addEventListener('input', isValid)
// // } )

// #################### =============================================



