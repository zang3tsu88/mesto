export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._containter = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containter.prepend(element);
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
