// export const initialCards = [
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

export const selectors = {
  card: '.card', // карточка
  image: '.card__img', // img/card
  title: '.card__title', // title/card
  btnLike: '.card__btn-like', // like/card
  btnDel: '.card__btn-del', // del/card
  like: '.card__btn-like_active', // like/card
};
//КОНФИГИ ФОРМ
export const config = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.btn_submit',
  disabledButtonClass: 'btn_status_disabled', // button disabled style
  errorInputClass: 'popup__input-span_error_active', // <span> error
  errorLineClass: 'popup__input_line_error',
};

export const userInfo = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
};

export const popupSelectorsImage = {
  popupClass: 'popup_img-bg',
  popupActiveClass: 'popup_opened',
};

export const cardsListSelector = '.elements__list';
export const cardsList = document.querySelector('.elements__list');

// buttons
export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / секции profile
export const btnEditAvatar = document.querySelector('.profile__avatar-edit-btn'); // "кнопка-cover" обновить автар

// forms (430px)
export const formProfile = document.forms.profile;// по св-ву name
export const inputEditName = formProfile.elements.name; // по св-ву name // page.querySelector('#popup__input_type_edit-name');
export const inputEditJob = formProfile.elements.about; // // page.querySelector('#popup__input_type_job');

export const formAvatar = document.forms.avatar;// по св-ву name
export const inputEditAvatar = formAvatar.elements.linkavatar;

export const profileNameNode = document.querySelector('.profile__name');
export const profileJobNode = document.querySelector('.profile__job');

export const formPlace = document.forms.place
export const inputAddPlaceName = formPlace.elements.name; // ('#input-name'); // input/field/name/ add place
export const inputAddPlaceLink = formPlace.elements.link; // page.querySelector('#input-link'); // input/field/link/ add place