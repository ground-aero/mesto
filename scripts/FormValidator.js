//класс который настраивает валидацию полей формы:
export class FormValidator {
  //1) принимает объект настроек с селекторами и классами формы; 2) принимает элемент той формы, которая валидируется
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._isValid = this._isValid.bind(this);
    this._hasInvalidInput = this._hasInvalidInput.bind(this);
    this._showInputError = this._showInputError.bind(this);
    // this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputClass);
    // );
  }

  //ПРОВЕРКА НА ВАЛИЛИДНОСТЬ. Ф-ция принимает formElement и inputElement, а не берёт их из внешней области видимости
  _isValid(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      // showInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage, // хранит текст браузерной текущей ошибки
        settings
      );
    } else {
      // hideInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._hideInputError(formElement, inputElement, settings);
    }
  }

  // Функция принимает массив полей
  _hasInvalidInput(inputList) {
    // по массиву методом some
    return inputList.some((inputElement) => {
      // результат вызова some: true/false. Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  // 1. formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
  // 2. inputElement — проверяемое поле ввода.
  // принятие и обработка входящих параметров:
  _showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // span error
    inputElement.classList.add(this._settings.errorLineClass); // red line
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorInputClass); // span error style
  }

  // Чтобы знать, где искать такой элемент, передаём функции параметр formElement и ищем элемент ошибки в нём.
  // спрятать ошибку
  _hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(this._settings.errorLineClass);
    errorElement.classList.remove(this._settings.errorInputClass);
    errorElement.textContent = '';
  }

  // Ф-ция добавление обработчиков всем формам
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
    // поля внутри формы,
    const inputList = Array.from(
      formElement.querySelectorAll(this._settings.inputClass)
    ); // +
    // в текущей форме кнопка отправки
    const buttonElement = formElement.querySelector(
      this._settings.submitButtonClass
    ); // ??

    // каждому полю обработчик события 'input' (на ввод каждого символа)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        this._isValid(formElement, inputElement, settings);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }

  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState(inputList, buttonElement, settings) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._settings.disabledButtonClass);
      buttonElement.setAttribute('disabled', 'disabled'); // устанавливаем атрибут disabled
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._settings.disabledButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
}
