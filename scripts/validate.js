const settings = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.btn_submit',
  disabledButtonClass: 'btn_status_disabled', // button disabled style
  errorInputClass: 'popup__input-span_error_active', // <span> error
  errorLineClass: 'popup__input_line_error',
};

// добавляем addEL ВСЕМ полям
function setEventListeners(formElement, settings) {
  // поля внутри формы,
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputClass)
  ); // +
  // в текущей форме кнопка отправки
  const buttonElement = formElement.querySelector(settings.submitButtonClass); // ??

  // каждому полю добавим обработчик события 'input' (на ввод каждого символа)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, settings);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}
// Осталось функцию вызвать. Для этого нужно добавить обработчики всем формам.

// Ф-ция добавление обработчиков всем формам
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formClass));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}
enableValidation(settings);

// Функция принимает formElement и inputElement, а не берёт их из внешней области видимости
function isValid(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage, // хранит текст браузерной текущей ошибки
      settings
    );
  } else {
    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, settings);
  }
}

// 1. formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
// 2. inputElement — проверяемое поле ввода.

// принятие и обработка входящих параметров:
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // span error
  inputElement.classList.add(settings.errorLineClass); // red line
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorInputClass); // span error style
}
// DOM-элемент ошибки из внутренней области видимости.
// Они находят нужный элемент формы для поля, которое проверяется в данный момент.
// Чтобы знать, где искать такой элемент, мы передаём функции параметр formElement и ищем элемент ошибки в нём.

// спрятать ошибку
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
  inputElement.classList.remove(settings.errorLineClass);
  errorElement.classList.remove(settings.errorInputClass);
  errorElement.textContent = '';
}

// Функция принимает массив полей
function hasInvalidInput(inputList) {
  // проходим по массиву методом some
  return inputList.some((inputElement) => {
    // результат вызова some: true/false
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}
// p.s - Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
// Но она ничего не делает с самой кнопкой «Отправить».

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, buttonElement, settings) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.disabledButtonClass);
    buttonElement.setAttribute('disabled', 'disabled'); // устанавливаем атрибут disabled
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.disabledButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
