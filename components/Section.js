export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._containter = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containter.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
