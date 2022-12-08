// index.js - Корневая точка проекта. Файл содержит только инициализацию необходимых главной странице модулей — функций и классов
// В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.
// import './index.css';
import {Api} from '../components/Api.js'
import {apiConfig} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import {
    btnEditProfile,
    btnAddPlace,
    // initialCards,
    inputEditName,
    inputEditJob,
    config,
} from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

// Section ---------------------------------------- (cardsList = section)
// Ф-ция говорит что нужно сделать для одной карточки когда получим данные, то что вернет initialiseCard() -готовую разметку. // Выгружаю начальные карточки. Инициализирую класс Section, передаю: {initialCards, renderer}, containerSelect
const section = new Section(
    {
        renderer: (cardItem, container) => {
            //описывает что сделать с данными при переборе в цикле. //cardItem, container - просто параметры
            section.addItem(initialiseCard(cardItem, container));//##############################################
        },
    },
    '.elements__list'
);

const api = new Api(apiConfig)

api.getAllInfo()
    .then(([userData,getAll]) => {//деструктурируем массив, чтоб достать данные
        console.log(userData, getAll)
    })
    .catch(err => console.log(err))

//с сервера запрос карточек в лист-секцию
api.getAllCards()
    .then((cards) => {
        // console.log(cards, Array.isArray(cards))
        section.renderItems(cards)//рендеринг карточек в лист-секцию
    })
    .catch((err) => {console.log(err.status)})

api.getUser()
    .then((userData) => {
        console.log(userData)
    })
    .catch((err) => {
        console.log(err)
    })

//----- new POPUPs ----------------------------
//При создании экземпляра PopupWithForm под попап "редактирования" ты в него передаешь колбэк, который будет рулить сабмитом формы "редактирования".
const newPopupProfile = new PopupWithForm(
    '#overlay_edit',
    '#form-add-profile',
    handleFormProfileSubmit
);

const newPopupAddPlace = new PopupWithForm(
    '#overlay_add-place',
    '#form-place',

    handleFormPlaceSubmit
);

const popupWithImage = new PopupWithImage('#overlay_img-zoom');

//----------NEW UserInfo ---------------------------------------
const newUser = new UserInfo({
    profileName: '.profile__name',
    jobSelector: '.profile__job',
}); // name: '.profile__name', // job: '.profile__job'
console.log(newUser)
// // function initialiseUser() {
// // const { nameSelector, jobSelector } = userInfo;
// const newUser = new UserInfo({
//     nameSelector: '.profile__name',
//     jobSelector: '.profile__job',
// }); // name: '.profile__name', // job: '.profile__job'

// Card ----------- создает экз, и возвращает разметку =====================================================
function initialiseCard(dataCard) {
    const newCard = new Card({
            data: dataCard,
            handleCardClick, //handleCardClick: open, handleRemoveCard //...что должно произойти при клике на картинку
            handleLikeClick: (likes) => {
            console.log('при клике на лайк', likes)
                api.likeCard(likes)
                    .then((likes) => {
                        console.log(likes)
                        // section.addItem(initialiseCard(newCard));//2.отрисовываем результат (карточки)
                    })
                    .catch((err) => {
                        console.log(`ошибка при лайке карточки' ${err}`)
                    })
            },
            handleCardDelete: (id) => {
              console.log('handleCardDelete, id=', id)
            api.deleteCard(id)
                .then(() => {
                    // console.log(res)
                    newCard.removeCard()
                })
                .catch((err) => console.log(`ошибка при удалении: ${err}`))
            }
        },
        '#card-template'
    );

    return newCard.generateCard(); //возвращает разметку карточки, методом на экземпляре класса. вызываем генерацию карточки на том что нам вернул экземпляр класса
}

// обработчик формы Edit / "сохранить" данные из ...сервера
function handleFormProfileSubmit(formDataObject) {
    newUser.setUserInfo(formDataObject); // сохраняем в DOM данные вводимые <- из полей формы профиля // setEditNodeTextContent();
    newPopupProfile.close(); // закрываем попап
}
// обработчик формы Edit / "сохранить" данные из инпутов формы профиля
// function handleFormProfileSubmit(formDataObject) {
//     newUser.setUserInfo(formDataObject); // сохраняем в DOM данные вводимые <- из полей формы профиля // setEditNodeTextContent();
//     newPopupProfile.close(); // закрываем попап
// }

// Обработчик Form Place
function handleFormPlaceSubmit(formDataObject) {
    // const newCard = initialiseCard(formDataObject); //создает экз класса и возвращает разметку. Она требует данные (данные реализованы здесь выше)
    // section.addItem(newCard); //добавляется своя карточка в момент нажатия сабмит формы
    ///  вар.2
    // console.log(handleFormPlaceSubmit)
    console.log(formDataObject)
    api.addNewCard(formDataObject)  //1.делаем запрос в АПИ
        .then((newCard) => {
            console.log(newCard)
            section.addItem(initialiseCard(newCard));//2.отрисовываем результат (карточки)
        })
        .catch((error) => {
            console.log('ошибка при создании карточки', error)
        })
}

// -- ОБРАБОТЧИКИ НА ОТКРЫТИЕ: ------------
// кнопка "edit"
function handleButtonEditClick() {
    // вызв заполнение полей - РЕВЬЮ/ЗАМЕЧАНИЕ.
    const userInfo = newUser.getUserInfo(); //получаем объект {name:.., job:..}
    inputEditName.value = userInfo.name; //Жак-Ив Кусто
    inputEditJob.value = userInfo.job; //Исследователь

    newPopupProfile.open();
}

// кнопка "+" / add place
function handleButtonAddPlaceClick() {
    newPopupAddPlace.open();
    // formPlaceValid.toggleButtonState(); // ИСПРАВЛЕНО. методы класса FormValidator активир / деактивир кнопку сабмита и очищают ошибки
    formValidators['place'].toggleButtonState(); //'profile' - атрибут name, формы
}

function handleCardClick(data) {
    popupWithImage.open(data);
}

// section.renderItems(initialCards); ////////////////////////////////////////////////////////////////

//-------- СЛУШАТЕЛИ
btnEditProfile.addEventListener('click', handleButtonEditClick); // "edit profile"
btnAddPlace.addEventListener('click', handleButtonAddPlaceClick); // "+" ("add")

newPopupProfile.setEventListeners(); // слушатель вызываем в прямом потоке кода, после создания экземпляра класса
newPopupAddPlace.setEventListeners(); //вызываем на экземпляре в прямом потоке кода
popupWithImage.setEventListeners();

// Включение валидации // --- Вар - 1 ---------------------------------------------

// const formProfileValid = new FormValidator(formProfile, config);
// formProfileValid.enableValidation();

// const formPlaceValid = new FormValidator(formPlace, config);
// formPlaceValid.enableValidation();

// Включение валидации // --- Вар - 2 --- ===================================================================
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