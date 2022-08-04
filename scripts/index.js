// 'use strict';
const page = document.querySelector('.page');
// edit Profile
const popupEditNode = document.querySelector('.popup_type_edit'); // страница POPUP-edit
const btnEditProfile = document.querySelector('.profile__btn-edit'); // кнопка редактировать
const btnSave = document.querySelector('.btn_type_save-profile');
const btnClose = document.querySelector('.popup__btn-close');
let inputEditName = page.querySelector('#popup__input_type_edit-name'); // Воспользуйтесь инструментом .querySelector()
let inputEditJob = page.querySelector('#popup__input_type_job');
let profileNameNode = page.querySelector('.profile__name');
let profileJobNode = page.querySelector('.profile__job');

// ---- обработчик закрытия попапов, по кнопке "Х" и клику на страницу ------
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
  inputEditName.value = profileNameNode.textContent.trim(); // При открытии попапа поля формы заполняются данными из профиля.
  inputEditJob.value = profileJobNode.textContent.trim();
}
function setEditNodeTextContent() {
  profileNameNode.textContent = inputEditName.value; // Вставьте новые значения с помощью textContent
  profileJobNode.textContent = inputEditJob.value; // Получаем значение полей inputEditName  и inputEditJob из свойства value. //  // Выберите элементы, куда должны быть вставлены значения полей.
}
// --- Ф-ция обработчик по форме Edit / "сохранить" и "отправить" данные из строу формы профиля
function handlerSaveSubmitEditForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  setEditNodeTextContent();
  closePopup(popupEditNode);
}
popupEditNode.addEventListener('submit', handlerSaveSubmitEditForm); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка» даже при нажатии на Enter

//-------- к н о п к и
btnEditProfile.addEventListener('click', handlerButtonEditClick);
btnSave.addEventListener('click', handlerSaveSubmitEditForm);
btnClose.addEventListener('click', handlerClosePopupClick); // addEL на кнопку "close"

//
//
// XXXXXXXXXXXXXXXXX  ДОБАВИТЬ МЕСТО - ХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХ
const initialCards = [
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

const selectors = {
  list: '.elements__list', // список карточек
  cardTemplate: '#element-template',
  card: '.element',
  image: '.element__img',
  titleWrapper: '.element__info-wrap',
  title: '.element__title', // title of template card
  btnLike: '.element__btn-like', // like of template card
  btnDel: '.element__btn-del', // del of template card
  like: '.element__btn-like_active', // like
};
const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / раздела profile
const popupAddPlaceNode = document.querySelector('.popup_type_add-place'); // страница add place
const formElementCard = document.querySelector('#popup__container_add-place'); // окно 430px add place

const formAddPlace = document.querySelector('.popup__form'); // input-form
const inputAddPlaceName = page.querySelector(
  '#popup__input_type_add-place-name'
); // поле инпут name / add place
const inputAddPlaceLink = page.querySelector(
  '#popup__input_type_add-place-link'
); // поле инпут link / add place
const btnCreatePlaceCard = document.querySelector('.btn_type_create-place'); // btn "сохранить/создать"

const cardsList = document.querySelector(selectors.list); // список <ul>
const cardTemplate = document.querySelector(selectors.cardTemplate).content; //.querySelector(selectors.card); // темплейт .content, и children

const card = cardTemplate.querySelector(selectors.card);

const popupOfImage = document.querySelector('.popup_type_zoomer'); // страница img popup
const popupImage = document.querySelector('.popup__img'); // img popup
const popupText = document.querySelector('.popup__subtitle'); // текст/подзаголовок img

// ф-ция создания узла/карточки,
function createCard(link, name) {
  // const cardElement = cardTemplate.querySelector(selectors.card).cloneNode(true); // клонир содерж 1 карточки
  const cardElement = cardTemplate
    .querySelector(selectors.card)
    .cloneNode(true); // клонир содерж 1 карточки

  const cardImage = cardElement.querySelector(selectors.image); // объявл переменные дочерн.элементв клонируемой карточки
  const cardTitle = cardElement.querySelector(selectors.title);
  const cardBtnDel = cardElement.querySelector(selectors.btnDel);
  const cardBtnLike = cardElement.querySelector(selectors.btnLike);

  console.log(cardBtnDel);
  // (для клонированной карточки) присваиваем атрибуты с данными со входа
  cardImage.src = link;
  cardTitle.textContent = name;
  cardImage.alt = name;

  // удаление карточки
  cardBtnDel.addEventListener('click', () => cardElement.remove());
  //  cardBtnDel.addEventListener('click', function (evt) {
  //   cardElement.remove();
  //   });

  // лайк
  cardBtnLike.addEventListener('click', () =>
    cardBtnLike.classList.toggle(selectors.like)
  );

  // зум-попап картинки
  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupText.textContent = name;
    popupImage.alt = name;
    popupOpen(popupOfImage);
  });

  return cardElement; // карточка с заполненным содержимым
}
createCard();

// cardBtnDel.addEventListener('click', () => cardElement.remove());

// ф-ция: добавление на страницу. container - лист
function renderCard(container, data, position = 'before') {
  // const card = createCard(data); //node
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
    );
    closePopup(popupAddPlaceNode);
  });
}
addEventListener();

// createInitialCards();
// ---моя версия -------------------------------------------------
function createInitialCards() {
  // initialCards.forEach((item) => card.append(createCard(item.link, item.name)));
  initialCards.forEach(function (item) {
    const cardElements = cardTemplate.cloneNode(true); // клонируем содержимое тега <template> (через объявление переменной)
    cardElements.querySelector(selectors.title).textContent = item.name; // каждому item-у из темплейта присваиваем соотв. значение(я) из перебираемого массива (берем текстовое содержимое тега <>
    cardElements.querySelector(selectors.image).src = item.link;

    cardsList.append(cardElements); // в список на странице втавляем склонированный контент, со всеми св-вами отобранными выше
  });
}
createInitialCards();

// ----------------------------------------------
// открыть (диалоговое окно) add place попап

// --- обработчик кнопки "+" / Place / открыть
function handlerButtonAddPlaceClick(evt) {
  evt.preventDefault();
  openPopup(popupAddPlaceNode);
}
btnAddPlace.addEventListener('click', handlerButtonAddPlaceClick); // слушатель клика на кнопке "+"
// btnAddPlace.addEventListener('click', () => openPopup(popupAddPlaceNode)); // слушатель клика повешен на кнопку "+" ("add")

//-------- к н о п к и
page.addEventListener('click', handlerClosePopupClick);
// const btnLike = page.querySelectorAll('.element__btn-like');

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

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// xxxxxxxxxxxxxxxxx reserved xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

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
//   // Задача ф-ции: добавить на страницу. container - лист
//   const card = createCard(data); // получаем node // передаем эти данные в createCard, которые будут в нее переданы в момент
//   container.append(card); // добавляем ноду на страницу

//   // list.append(cardElement); // момент добавления карточки (ф-ция создания была выше)
// }

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxчччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччччч
//-------------------------------------------------------------------

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

// // sectionElementsCards.innerHTML = initialCards;
