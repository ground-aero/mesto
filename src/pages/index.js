// Файл содержит только инициализацию необходимых главной странице модулей — функций и классов. // В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.
import './index.css';
import {Api, apiConfig} from '../components/Api.js'
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import {
    btnEditProfile,
    btnAddPlace,
    btnEditAvatar,
    btnDeleteConfirm,
    inputEditName,
    inputEditJob,
    config,
} from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmitConfirm } from "../components/PopupWithSubmitConfirm.js";

const api = new Api(apiConfig)

let myId = null;// а уже внутри Promise.all
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__job',
    avatarSelector: '.profile__avatar'})//userSelectors

// Section - (cardsList = section). // Ф-ция говорит что нужно сделать для одной карточки когда получим данные, то что вернет createCard() -готовую разметку. // Выгружаю начальные карточки. Инициализирую класс Section, передаю: {initialCards, renderer}, containerSelect
const section = new Section(
    {
        renderer: (cardItem, container) => {//описывает что сделать с данными при переборе в цикле. //cardItem, container - просто параметры

            section.addItem(createCard(cardItem, container));
        },
    },
    '.elements__list'
);

api.getAllInfo()
    .then(([userApi,allCardsApi]) => {//деструктурируем массив, чтоб достать данные

        userInfo.setUserInfo(userApi.name, userApi.about, userApi.avatar); // сохраняем в DOM данные вводимые <- из
        userInfo.updateUserInfo(userApi.name, userApi.about, userApi.avatar);

        myId = userApi._id;//переприсваиваем уникальное id в переменную, как только получим данные профиля. Ранее объявлена глобально

        section.renderItems(allCardsApi.reverse())// !!! ЗАМЕЧАНИЕ !!! В Section метод который примет массив  и отрендерит карточки
    })
    .catch((err) => {console.log(err.status)})

//--- new POPUPs ---
//При создании экземпляра PopupWithForm под попап "редактирования" ты в него передаешь колбэк, который будет рулить сабмитом формы "редактирования".
const popupEditProfile = new PopupWithForm(
    '#overlay_edit',
    '#form-add-profile',
    handleFormProfileSubmit
);

const popupEditAvatar = new PopupWithForm(
    '#overlay_avatar',
    '#form-edit-avatar',
    handleFormAvatarSubmit
);

const popupAddPlace = new PopupWithForm(
    '#overlay_add-place',
    '#form-place',
    handleFormCardSubmit
);

const popupWithImage = new PopupWithImage('#overlay_img-zoom');

const popupSubmitConfirm = new PopupWithSubmitConfirm (//оверлей без формы, только с кнопкой "Вы уверены?"
    '#overlay_delete'
);
// const popupConfirmDelete = new PopupWithForm(//РЕВЬЮ. ЗАМЕНЕНО НА КЛАСС PopupWithSubmitConfirm
//     '#overlay_delete',
//     '#form-confirm',
//     // handleFormConfirmDelSubmit //??
// )

// Card - созд. экз, и возвр. разметку
function createCard(dataCard) {
    const newCard = new Card({
            data: dataCard,
            myId,
            handleCardClick: () => {
                popupWithImage.open(dataCard)
            }, //...что должно произойти при клике на картинку
            handleLikeClick: (id) => {
            // console.log('при клике на лайк', id)
                if (newCard.isLiked()) {
                    api.deleteLike(id)
                        .then(res => {
                            // console.log(res)
                            newCard.setLikes(res.likes)
                        })
                        .catch((err) => {
                            console.log(`ошибка при лайке карточки ${err}`)
                        })
                } else {
                    api.putLike(id)
                        .then((res) => {
                            // console.log(res)
                            newCard.setLikes(res.likes)
                        })
                        .catch((err) => {
                            console.log(`ошибка при лайке карточки ${err}`)
                        })
                }
            },
            handleDeleteClick: (id) => {
                   // console.log('handleDeleteClick, id=', id)
                popupSubmitConfirm.open() //модалка "Вы уверены ?"
                popupSubmitConfirm.changeSubmitAction(() => {

                    api.deleteCard(id)
                        .then((res) => {
                              // console.log(res)
                            newCard.deleteCard()
                            popupSubmitConfirm.close()
                        })
                        .catch((err) => console.log(`ошибка при удалении: ${err}`))
                        .finally(() => {
                            // popupSubmitConfirm.submitBtnTextChange('Сохранить');
                        })
                    })
      }
        },
        '#card-template'
    );
    // console.log(newCard);
    return newCard.getView(); //возвращает разметку карточки, методом на экземпляре класса. вызываем генерацию карточки на том что нам вернул экземпляр класса
}

// обработчик формы Edit Profile / "сохранить" данные из ...сервера
function handleFormProfileSubmit(formDataObject) {//данные из инпутов

    popupEditProfile.submitBtnTextChange('Сохранение...');

    api.patchUser(formDataObject)
        .then((userDataApi) => {

            userInfo.setUserInfo(userDataApi.name, userDataApi.about, userDataApi.avatar); // сохраняем в DOM данные вводимые <- из полей формы профиля // setEditNodeTextContent();
            userInfo.updateUserInfo(userDataApi.name, userDataApi.about, userDataApi.avatar)

            popupEditProfile.close(); // закрываем попап
        })
        .catch((err) => {
            console.log('ошибка при сабмите/патч юзер дата,', err)
        })
        .finally(() => {
            popupEditProfile.submitBtnTextChange('Сохранить');
        })

}

// Обработчик FormPlace - добавить карточку через API
function handleFormCardSubmit(formDataObject) {

    popupAddPlace.submitBtnTextChange('Сохранение...');

    api.addNewCard(formDataObject)  //1.запрос в АПИ
        .then((newCard) => {// console.log(newCard)

            section.addItem(createCard(newCard))//2.отрисовываем результат (карточки)

            popupAddPlace.close()
        })
        .catch((error) => {
            console.log('ошибка при создании карточки', error)
        })
        .finally(() => {
            popupAddPlace.submitBtnTextChange('Создать');
        })
}

function handleFormAvatarSubmit(formDataObject) {
      // console.log({avatar: formDataObject.linkavatar})
    popupEditAvatar.submitBtnTextChange('Сохранение...'); //method: КНОПКА.TextContent = ''  ПОМЕНЯТЬ ТЕКСТ В КНОПКЕ

    api.patchAvatar({avatar: formDataObject.linkavatar})//{avatar: formDataObject.link}
        .then((userDataApi) => {
            // console.log('сабмит изменить аватар', userInfoFromApi)
            userInfo.setUserInfo(userDataApi.name, userDataApi.link, userDataApi.avatar);
            userInfo.updateUserInfo(userDataApi.name, userDataApi.link, userDataApi.avatar);

    popupEditAvatar.close();
        })
        .catch((error) => {
            console.log('ошибка при сабмите изм аватара', error)
        })
        .finally(() => {
            popupEditAvatar.submitBtnTextChange('Сохранить')
        })
}

// -- ОБРАБОТЧИКИ КНОПОК НА ОТКРЫТИЕ:
function handleButtonEditClick() {// кнопка "edit"

    const user = userInfo.getUserInfo(); //получаем объект {name:.., job:..}
    inputEditName.value = user.name; //Жак-Ив Кусто
    inputEditJob.value = user.about; //Исследователь

    popupEditProfile.open();
}

function handleButtonEditAvatarClick() {// "кнопка" cover-avatar edit"
    popupEditAvatar.open();
    formValidators['avatar'].toggleButtonState(); //'profile' - атрибут name, формы
}

function handleButtonAddPlaceClick() {// кнопка "+" / add place
    popupAddPlace.open();
    formValidators['place'].toggleButtonState(); //'place' - атрибут name, формы
}

function handleBtnDeleteConfirm() {
    popupSubmitConfirm.open();
}

// section.renderItems(initialCards);

//-------- СЛУШАТЕЛИ
btnEditProfile.addEventListener('click', handleButtonEditClick); // "edit profile"
btnAddPlace.addEventListener('click', handleButtonAddPlaceClick); // "+" ("add")
btnEditAvatar.addEventListener('click', handleButtonEditAvatarClick); // edit avatar
btnDeleteConfirm.addEventListener('click', handleBtnDeleteConfirm);

popupEditProfile.setEventListeners(); // слушатель вызываем в прямом потоке кода, после создания экземпляра класса
popupEditAvatar.setEventListeners();
popupAddPlace.setEventListeners(); //вызываем на экземпляре в прямом потоке кода
popupWithImage.setEventListeners();
popupSubmitConfirm.setEventListeners();

// Включение валидации
const formValidators = {};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formClass));
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config);
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name');

        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);