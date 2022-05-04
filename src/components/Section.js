export class Section {
  //items — это массив данных, которые нужно добавить на страницу при инициализации класса
  //renderer — это функция, которая отвечает за создание и отрисовку данных на странице
  //parentsSelector - селектор контейнера, в который нужно добавлять созданные элементы
  constructor({items, renderer}, parentSelector) {
    this._items = items;
    this._renderer = renderer;
    this._parentSelector = parentSelector;
  }

  renderAll() {
    return this._items.map((item) => {
      return this._renderer(item);
    });
  }

  addItem(item) {
    const container = document.querySelector(this._parentSelector);
    container.prepend(item);
  }
}