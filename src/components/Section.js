export class Section {
  //renderer — это функция, которая отвечает за создание и отрисовку данных на странице
  //parentsSelector - селектор контейнера, в который нужно добавлять созданные элементы
  constructor(renderer, parentSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(parentSelector);
  }

  renderAll(items) {
    return items.map((item) => {
      return this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}