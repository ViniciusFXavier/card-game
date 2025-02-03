import { GameObject } from './game-object';

export class Container extends GameObject {
  initialize() {
    this.element = document.createElement('div');
    this.element.id = 'container';
    this.element.style.position = 'fixed';
    this.element.style.minWidth = '100%';
    this.element.style.minHeight = '100%';

    super.initialize();
    this.parent?.element?.appendChild(this.element);
  }
}
