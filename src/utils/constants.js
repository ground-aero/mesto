export const initialCards = [
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

export const selectors = {
  card: '.card', // карточка
  image: '.card__img', // img/card
  title: '.card__title', // title/card
  btnLike: '.card__btn-like', // like/card
  btnDel: '.card__btn-del', // del/card
  like: '.card__btn-like_active', // like/card
};
//КОНФИГИ ФОРМ
export const settings = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.btn_submit',
  disabledButtonClass: 'btn_status_disabled', // button disabled style
  errorInputClass: 'popup__input-span_error_active', // <span> error
  errorLineClass: 'popup__input_line_error',
};

export const userInfo = {
  name: 'Вас',
  job: 'bb',
}

export const popupSelectorsImage = {
  popupClass: 'popup_img-bg',
  popupActiveClass: 'popup_opened',
};

export const cardsListSelector = '.elements__list';
export const cardsList = document.querySelector('.elements__list'); 

// // forms (430px)
// export const formElement = document.querySelectorAll()
export const formProfile = document.forms.profile; // по св-ву name
export const inputEditName = formProfile.elements.name; // по св-ву name // page.querySelector('#popup__input_type_edit-name');
export const inputEditJob = formProfile.elements.job; // // page.querySelector('#popup__input_type_job');

// POPUPS & inputs - ----------------------

// edit Profile (open)
// export const popupEdit = document.querySelector('#overlay_edit'); // оверлей popup Edit
// export const btnEditProfile = document.querySelector('.profile__btn-edit'); // кнопка редактировать
// export const btnSaveProfile = document.querySelector('.btn_type_save-profile');

export const formPlace = document.forms.place
export const inputAddPlaceName = formPlace.elements.name; // ('#input-name'); // input/field/name/ add place
export const inputAddPlaceLink = formPlace.elements.link; // page.querySelector('#input-link'); // input/field/link/ add place
// // add place (open)
// export const popupAddPlace = document.querySelector('#overlay_add-place'); // оверлей add place

// export const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / секции profile
// export const btnCreatePlaceCard = document.querySelector('.btn_type_create-place'); // btn "сохранить/создать" место

// //in template
// export const btnDel = document.querySelector('.card__btn-del');
//   console.log(btnDel);
// export const btnLike = document.querySelector('.card__btn-like');

// // image popup -------------------
// export const popupOfImage = document.querySelector('#overlay_img-zoom'); // оверлей img popup
// export const popupImage = document.querySelector('.popup__img'); // img popup
// export const popupText = document.querySelector('.popup__subtitle'); // текст/подзаголовок img

// export const popupCloseButton = document.querySelectorAll('.popup__btn-close');