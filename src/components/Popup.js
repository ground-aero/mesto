/* Popup ОТВЕЧАЕТ ЗА: открытие и закрытие попапа. */
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  //содержит логику закрытия попапа клавишей Esc.
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose); // Закрыли попап -- листенер можно удалить ****
  }

// добавляет слушатель клика иконке закрытия попапа.  // -- слушатели клика на попап-оверлеи и на "Х"
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('popup__btn-close' || evt.target.classList.contains('popup'))) {
        this.close();
      }
    });
  }
}