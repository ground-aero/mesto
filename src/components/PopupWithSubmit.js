import {Popup} from './Popup.js'

export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    //в попапе нужен метод, который динамически позволяет менять функцию, которая вызывается при нажатии на кнопку сабмита.

    setEventListeners() {

        //Теперь сюда ничего не надо передавать, а просто вызывать функцию при сабмите.
        super.setEventListeners()
    }
}