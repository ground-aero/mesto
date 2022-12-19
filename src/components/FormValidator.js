//класс настраивает валидацию полей формы:
export class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._checkValidityInput = this._checkValidityInput.bind(this);
    this._hasInvalidInput = this._hasInvalidInput.bind(this);
    this._showInputError = this._showInputError.bind(this);
    this._hideInputError = this._hideInputError.bind(this);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputClass)
    );
    this._buttonElement = this._form.querySelector(this._config.submitButtonClass);
  }

  //ПРОВЕРКА НА ВАЛИЛИДНОСТЬ.
  _checkValidityInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage // текст браузерной текущей ошибки
      );
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Функция принимает массив полей
  _hasInvalidInput() {
    // по массиву методом some
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // span-error
    inputElement.classList.add(this._config.errorLineClass); // red line
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorInputClass); // span error style
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(this._config.errorLineClass);
    errorElement.classList.remove(this._config.errorInputClass);
    errorElement.textContent = '';
  }

  enableValidation() {
    this._setEventListeners();
  }
  // enableValidation(settings/config) - вызываем в index.js, сразу после создания экземпляра форм(ы)

  // addEL ВСЕМ полям
  _setEventListeners() {
    // поля внутри формы
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        this._checkValidityInput(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this.toggleButtonState();
      });
    });
  }

  toggleButtonState() {// Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._config.disabledButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled'); // устанавливаем атрибут disabled
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._config.disabledButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
}
