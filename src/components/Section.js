export class Section {
    constructor({ items, renderer }, selector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._renderedItems.forEach(this._renderer);
    }

    addItem(item) {
        this._container.prepend(item);
    }
}