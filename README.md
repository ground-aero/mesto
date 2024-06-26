# Проект: Место

**Ссылка на сайт**

- [weblink: https://ground-aero.github.io/mesto](https://ground-aero.github.io/mesto/)

### Обзор

- Использованые языки и технологии:
  - HTML5, CSS
  - JavaScript
  - WebPack
- Реализована адаптивность размера экранов до 320px
- Реализованы модальные окна (popups) , на кнопках и элементах: "edit avatar", "edit user/profile", "add place", "zoom image"
- Файловая структура проекта построена по БЭМ/CSS
- Сайта сверстан на основе дизайнерского макета из Figma, пиксельность проверена на PixelPerfect
- Размер картинок оптимизирован для быстроты загрузки
- Для всех полей ввода в формах включена лайв-валидация;
- модальное окно закрывается по клику в любом месте вне этого окна и по нажатию на Esc
##
- Данное приложение подключено к серверу
##
- Код объектно-ориентирован:
    - Использованы ES6-классы и импортированы в точку сборки index.js
    - используется слабое связывание для описания взаимодействия между классами
- Реализованы все запросы к серверу, указанные в описании проектной работы
- Создан класс Api , внутри которого описаны запросы к серверу
    - каждый промис содержит обработку ошибок после обращения к серверу.
    - все операции над DOM включены внутрь цепочки промисов.
- Карточки отображаются на странице только после получения id пользователя.
- У карточек отображается количество лайков.
- Доступность интерфейса:
    - все ссылки и интерактивные элементы имеют состояние наведения :hover .



##
**Figma**

- [Ссылка-1 на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
- [Ссылка-2 на макет в Figma](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)
- [Ссылка-3 на макет в Figma](https://www.figma.com/file/PSdQFRHoxXJFs2FH8IXViF/JavaScript.-Sprint-9?node-id=109%3A75&t=utRAqLFJpQou2DiL-0)

**ТЗ / Описание**

- [к ПР#4](https://concrete-web-bad.notion.site/4-cf8a0bbad14c4327ac51192c33a04fcd)
- [к ПР#5](https://concrete-web-bad.notion.site/5-05e706b22e584b63b85c7187db302ac8)
- [к ПР#6](https://concrete-web-bad.notion.site/6-52aad679d21241f69cd4306afb252e8b)
- [к ПР#8](https://concrete-web-bad.notion.site/8-b4da86cf48854922bef2b0525d74c7cf)
- [к ПР#9](https://concrete-web-bad.notion.site/9-7e6c0c783b9940588275cb37037e7ae9)

- [Чек-лист к ПР9](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-9.pdf)

