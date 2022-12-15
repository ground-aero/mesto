// index.js - Корневая точка проекта. Файл содержит только инициализацию необходимых главной странице модулей — функций и классов
// В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.
// import './index.css';
import {Api, apiConfig} from '../components/Api.js'
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

const api = new Api(apiConfig)

const userSelectors = {
    nameSelector: '.profile__name',
    jobSelector: '.profile__job',
    avatarSelector: '.profile__avatar'
}

let myId = null;// а уже внутри Promise.all
const userInfo = new UserInfo(userSelectors)
console.log(userInfo.getUserInfo())

api.getUser()
    .then((userData) => {
         // console.log(userData)
        userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
         // console.log(userInfo)
        userInfo.updateUserInfo(userData.name, userData.about, userData.avatar)
        // const newUser = new UserInfo({
        //     userData,
        //     nameSelector: '.profile__name',
        //     jobSelector: '.profile__job',
        // }); // name: '.profile__name', // job: '.profile__job'
        // console.log(newUser)
        // newUser.setUserInfo(userData); //
        myId = userData._id//возвращает мой Id с сервера
        console.log(userData)
    })
    .catch((err) => {
        console.log('ошибка при получении данных юзера', err)
    })
    .finally(()=>{}) // зд можно удалить прелоадер(загрузка-кружочек) (который долэен передаваться наверху)

// Section ---------------------------------------- (cardsList = section)
// Ф-ция говорит что нужно сделать для одной карточки когда получим данные, то что вернет createCard() -готовую разметку. // Выгружаю начальные карточки. Инициализирую класс Section, передаю: {initialCards, renderer}, containerSelect
const section = new Section(
    {
        renderer: (cardItem, container) => {
            //описывает что сделать с данными при переборе в цикле. //cardItem, container - просто параметры

            section.addItem(createCard(cardItem, container));//##############################################
        },
    },
    '.elements__list'
);


// api.getAllInfo()
//     .then(([userData,getAllCards]) => {//деструктурируем массив, чтоб достать данные
//         // console.log(userData, getAllCards)
//         myId = userData._id;//переприсваиваем значение, ранее объявили ее в глобальной области
//         // section.renderItems(getAllCards) //МОЖНО ВКЛЮЧИТЬ ЭТОТ КОД !!!!!! вместо api.getAllCards() ...
//         section.renderItems({ data: getAllCards, id: userData._id}) //МОЖНО ВКЛЮЧИТЬ ЭТОТ КОД !!!!!! вместо api.getAllCards() ...
//         userInfo.setUserInfo(userData.name, userData.about); // сохраняем в DOM данные вводимые <- из
//     })
//     .catch((err) => {console.log(err.status)})

//с сервера запрос карточек в лист-секцию
api.getAllCards()
    .then((cardList) => {
        // console.log(cardList, Array.isArray(cardList))
        cardList.forEach(dataCard => {
            // console.log(dataCard)
             const card = createCard({
                 name: dataCard.name,
                 link: dataCard.link,
                 likes: dataCard.likes,
                 id: dataCard._id,
                 myId: myId,
                 ownerId: dataCard.owner._id,
             })
            // console.log(card)//разметка карточки
            section.addItem(card)//рендеринг карточек в лист-секцию
        })
    })
    .catch((err) => {console.log(err.status)})
// api.getAllCards() //2-й способ
//     .then((cardList) => {
//         // console.log(cardList, Array.isArray(cards))
//         section.renderItems(cardList)//рендеринг карточек в лист-секцию
//     })
//     .catch((err) => {console.log(err.status)})

//----------NEW UserInfo ------------------------------------------------
// const newUser = new UserInfo({
//     userData,
//     nameSelector: '.profile__name',
//     jobSelector: '.profile__job',
// }); // name: '.profile__name', // job: '.profile__job'
// console.log(newUser)
// // function initialiseUser() {
// // const { nameSelector, jobSelector } = userInfo;
// const newUser = new UserInfo({
//     nameSelector: '.profile__name',
//     jobSelector: '.profile__job',
// }); // name: '.profile__name', // job: '.profile__job'
//----------------------------------------------------------------------

//----- new POPUPs -------------------------------------------------------------
//При создании экземпляра PopupWithForm под попап "редактирования" ты в него передаешь колбэк, который будет рулить сабмитом формы "редактирования".
const popupEditProfile = new PopupWithForm(
    '#overlay_edit',
    '#form-add-profile',
    handleFormProfileSubmit
);

const popupAddPlace = new PopupWithForm(
    '#overlay_add-place',
    '#form-place',
    handleFormCardSubmit
);

const popupConfirmDelete = new PopupWithForm(
    '#overlay_delete',
    '#form-confirm',
    // handleFormConfirmDelSubmit
)

const popupWithImage = new PopupWithImage('#overlay_img-zoom');



// Card ----------- создает экз, и возвращает разметку =====================================================
function createCard(dataCard) {
    const newCard = new Card({
            data: dataCard,
            handleCardClick, //handleCardClick: open, handleRemoveCard //...что должно произойти при клике на картинку
            handleLikeClick: (id) => {
            console.log('при клике на лайк', id)
                if (newCard.isLiked()) {
                    api.deleteLike(id)
                        .then(res => {
                            console.log(res)
                            newCard.setLikes(res.likes)
                        })
                        .catch((err) => {
                            console.log(`ошибка при лайке карточки ${err}`)
                        })
                } else {
                    api.putLike(id)
                        .then((res) => {
                            console.log(res)
                            newCard.setLikes(res.likes)
                        })
                        .catch((err) => {
                            console.log(`ошибка при лайке карточки ${err}`)
                        })
                }
            },
            handleDeleteClick: (id) => {
                   console.log('handleDeleteClick, id=', id)
                popupConfirmDelete.open() //модалка "Вы уверены ?"
                popupConfirmDelete.changeSubmitAction(() => {
                    api.deleteCard(id)
                        .then((res) => {
                              // console.log(res)
                            newCard.deleteCard()
                            popupConfirmDelete.close()
                        })
                        .catch((err) => console.log(`ошибка при удалении: ${err}`))
                })
      }
        },
        '#card-template'
    );

    return newCard.getView(); //возвращает разметку карточки, методом на экземпляре класса. вызываем генерацию карточки на том что нам вернул экземпляр класса
}

// обработчик формы Edit / "сохранить" данные из ...сервера
function handleFormProfileSubmit(formDataObject) {//данные из инпутов
     // console.log(formDataObject)
    api.patchUser(formDataObject)
        .then((userInfoFromApi) => {
            // console.log(profileInfoFromApi)
            userInfo.setUserInfo(userInfoFromApi.name, userInfoFromApi.about, userInfoFromApi.avatar); // сохраняем в DOM данные вводимые <- из полей формы профиля // setEditNodeTextContent();
            userInfo.updateUserInfo(userInfoFromApi.name, userInfoFromApi.about, userInfoFromApi.avatar)

            popupEditProfile.close(); // закрываем попап
        })
        .catch((err) => {
            console.log('ошибка при сабмите/патч юзер дата,', err)
        })

}
// обработчик формы Edit / "сохранить" данные из инпутов формы профиля
// function handleFormProfileSubmit(formDataObject) {
//     newUser.setUserInfo(formDataObject); // сохраняем в DOM данные вводимые <- из полей формы профиля // setEditNodeTextContent();
//  // ИЛИ userInfo.setUserInfo(formDataObject); // сохраняем в DOM данные вводимые <- из полей формы профиля // setEditNodeTextContent();
//     popupEditProfile.close(); // закрываем попап
// }

// Обработчик FormPlace - добавить карточку через API
function handleFormCardSubmit(formDataObject) {
    // const newCard = createCard(formDataObject); //создает экз класса и возвращает разметку. Она требует данные (данные реализованы здесь выше)
    // section.addItem(newCard); //добавляется своя карточка в момент нажатия сабмит формы
    ///  вар.2
    // console.log(handleFormCardSubmit)
    //  console.log(formDataObject)
    api.addNewCard(formDataObject)  //1.делаем запрос в АПИ
        .then((newCard) => {
              // console.log(newCard)
            const card = createCard({
                name: newCard.name,
                link: newCard.link,
                likes: newCard.likes,
                id: newCard._id,
                myId: myId,
                ownerId: newCard.owner._id,
            })
              console.log(card)
            section.addItem(card)//2.отрисовываем результат (карточки)

            popupAddPlace.close()
        })
        .catch((error) => {
            console.log('ошибка при создании карточки', error)
        })
}
//////////////////////
function handleFormConfirmDelSubmit(id) {
    console.log('да, хочу удалить')
    api.deleteCard('63985ee6c18fdc1d38473b38')//'63985ee6c18fdc1d38473b38'
        .then(res => {
            console.log(res)
            // newCard.removeCard()
        })
        .catch(err => {console.log('ошибка при удалении', err)})
}

// -- ОБРАБОТЧИКИ НА ОТКРЫТИЕ: -------------------------
// кнопка "edit"
function handleButtonEditClick() {
    // вызв заполнение полей - РЕВЬЮ/ЗАМЕЧАНИЕ.
    const user = userInfo.getUserInfo(); //получаем объект {name:.., job:..}
    inputEditName.value = user.name; //Жак-Ив Кусто
    inputEditJob.value = user.about; //Исследователь

    popupEditProfile.open();
}

// кнопка "+" / add place
function handleButtonAddPlaceClick() {
    popupAddPlace.open();
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

popupEditProfile.setEventListeners(); // слушатель вызываем в прямом потоке кода, после создания экземпляра класса
popupAddPlace.setEventListeners(); //вызываем на экземпляре в прямом потоке кода
popupWithImage.setEventListeners();
popupConfirmDelete.setEventListeners()

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