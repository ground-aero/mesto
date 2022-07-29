'use strict';
const page = document.querySelector('.page');

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
// let btnLike = page.querySelectorAll('.element__btn-like');
// profile - поля
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');

// открытие формы попапа
function popupFormOpen() {
  popupForm.classList.add('popup_opened'); // форме попап добавлен класс-модификатор открытия
  inputName.value = profileName.textContent; // При открытии попапа поля формы заполняются данными из профиля.
  inputJob.value = profileJob.textContent;
}

btnEdit.addEventListener('click', popupFormOpen); // слушатель клика повешен на кнопку "edit"

// закрытие формы попапа
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
  // Функция Сохранения popup__btn-save и «отправки» данных из строк формы профиля, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.

  profileName.textContent = inputName.value; // Получите значение полей inputName  и inputJob из свойства value
  profileJob.textContent = inputJob.value; // Выберите элементы, куда должны быть вставлены значения полей.
  // Вставьте новые значения с помощью textContent

  popupFormClose();
}

popupForm.addEventListener('submit', formSubmitHandler); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

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

initialCards.forEach(function (element) {
  // перебираем массив
  const cardElement = cardTemplate.cloneNode(true); // клонируем содержимое тега <template> (через объявление переменной)

  cardElement.querySelector(selectors.title).textContent = element.name; // теперь из темплейта берем текстовое содержимое тега <>, и присваиваем соотв. значение(я) из перебираемого массива
  cardElement.querySelector(selectors.image).src = element.link; // из темплейта берем текстовое содержимое тега <>, и присваиваем соотв. значение(я) из перебираемого массива

  cardsList.append(cardElement); // в список на странице втавляем склонированный контент, со всеми св-вами отобранными выше
});

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

// function createInitialCards() {
//   // перебираем массив методом map или forEach
//   initialCards.forEach((card) => renderCard(card, list)); // и каждый элемент массива прокидываем через ф-цию createCard по-очереди
//   // image.src = initialCards.link; // ???
// }
// createInitialCards();

// // addEventListener();
// createInitialCards();

// function addEventListener('click', btnAdd);  // НУЖНО ПОВЕСИТЬ СЛУШАТЕЛЬ НА ДЛИННУЮ КНОПКУ "+"

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxx - openPopup(popupImageContainer) - xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function openPopup(modal) {
  // p.s - одна общая кнопка закрытия и один addEventListener ......
  modal.classList.add('popup_visible');
}

function closePopup(evt) {
  const closeBtn = evt.target;

  if (closeBtn.classList.contains('popup__close-buttonm')) {
    closeBtn.closest('popup').classList.remove('popup_visible');
  }
}

// дополнительно !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// root.addEventListener('click', closePopup);

//
//
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

// // sectionElementsCards.innerHTML = initialCards;
