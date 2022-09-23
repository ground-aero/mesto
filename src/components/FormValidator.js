//класс настраивает валидацию полей формы:
export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._checkValidityInput = this._checkValidityInput.bind(this);
    this._hasInvalidInput = this._hasInvalidInput.bind(this);
    this._showInputError = this._showInputError.bind(this);
    this._hideInputError = this._hideInputError.bind(this);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputClass)
    );
    this._buttonElement = form.querySelector(this._settings.submitButtonClass);
  }

  //ПРОВЕРКА НА ВАЛИЛИДНОСТЬ. 
  _checkValidityInput(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {

      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage, // текст браузерной текущей ошибки
        settings
      );
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  }

  // Функция принимает массив полей
  _hasInvalidInput() {
    // по массиву методом some
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // span-error
    inputElement.classList.add(this._settings.errorLineClass); // red line
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorInputClass); // span error style
  }

  _hideInputError(formElement, inputElement, settings) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(this._settings.errorLineClass);
    errorElement.classList.remove(this._settings.errorInputClass);
    errorElement.textContent = '';
  }

 enableValidation(settings) {
    const formList = Array.from(
      document.querySelectorAll(this._settings.formClass)
    );
    formList.forEach((formElement) => {
      this._setEventListeners(formElement, settings);
    });
  }
  // enableValidation(settings) - вызываем в index.js, сразу после создания экземпляра форм(ы)

  // addEL ВСЕМ полям
  _setEventListeners(formElement, settings) {
    // поля внутри формы
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        this._checkValidityInput(formElement, inputElement, settings);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(this._inputList, this._buttonElement, settings);
      });
    });
  }

  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._settings.disabledButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled'); // устанавливаем атрибут disabled
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._settings.disabledButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
}
