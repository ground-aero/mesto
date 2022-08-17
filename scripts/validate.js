// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'btn_status_disabled', // 'popup__button_disabled',
//   inputErrorClass: 'popup__input-span_type_error', // display: none; // <span>"Вы пропустили это поле"
//   errorClass: 'popup__error_visible'
// });

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};
// p.s - Теперь функция isValid принимает сразу два параметра. Это делает ее универсальной !
// 1. formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
// 2. inputElement — проверяемое поле ввода.

// NEXT. Сразу изменим функции showInputError и hideInputError — научим их принимать и обрабатывать входящие параметры:

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('popup__input_line_error'); // red line
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-span_error_active'); // span error style
};
// p.s - Теперь обе функции не берут DOM-элемент ошибки из внешней области видимости.
// Они находят нужный элемент формы для поля, которое проверяется в данный момент.
//  Чтобы знать, где искать такой элемент, мы передаём функции параметр formElement и ищем элемент ошибки в нём.

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('popup__input_line_error');
  errorElement.classList.remove('popup__input-span_error_active');
  errorElement.textContent = '';
};

// вместо точечного addEL, на одно поле ввода, теперь добавляем его ВСЕМ полям.
// Для этого создадим функцию setEventListeners, которая примет параметром элемент формы и добавит её полям нужные обработчики:

// Ф-ция добавления обработчиков всем полям формы
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input')); // +
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.btn_submit'); // ??
  // обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};
// Функция setEventListeners добавит обработчики сразу всем полям формы.
// Осталось функцию вызвать. Для этого нужно разобраться, как добавить обработчики всем формам.

// NEXT. Добавление обработчиков всем формам.
// Теперь нужно найти все формы в DOM и вызвать для них функцию setEventListeners.

// Ф-ция добавление обработчиков всем формам
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form')); // +

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

// Функция enableValidation найдёт на странице и обработает все формы с классом form.
// Теперь валидация работает и для всех форм.

// Каждое поле формы проверяется отдельно.

// - - - 

// Функция принимает массив полей
// и проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
// Но она ничего не делает с самой кнопкой «Отправить»:
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // результат вызова some: true/false
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};
//
// p.s - Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
// Но она ничего не делает с самой кнопкой «Отправить». !!!

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('btn_status_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('btn_status_disabled');
  }
};

page.addEventListener('click', handlerClosePopupClick);