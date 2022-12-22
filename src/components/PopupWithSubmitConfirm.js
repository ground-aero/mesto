import {Popup} from './Popup.js'
// import {PopupWithForm} from "./PopupWithForm.js";

export class PopupWithSubmitConfirm extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    // this._btnConfirmSubmitSelector = btnConfirmSubmitSelector;
    }

    changeSubmitAction(action) {
        this._action = action;
    }

    //1.в попапе нужен метод, который динамически позволяет менять функцию, которая вызывается при нажатии на кнопку сабмита.
    //действие где подтверждение нужно - удаление карточки (каждый раз разные).
    //Поэтому должна быть возможность при открытии попапа переопределять через публичный метод то действие, которое нужно выполнить при нажатии на кнопку.
    //этот попап вы открываете только в одном случае - нажатие на кнопку удаления карточки.
    // соответственно и переопределять выполняемую функцию надо только после нажатия на кнопку удаления (перед непосредственным открытием попапа)
    setEventListeners() {
        this._popup.addEventListener('submit', (e) => {
            e.preventDefault();

            this._action();
        });

        super.setEventListeners();
    }
}