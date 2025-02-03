import { GameObject } from './game-object';
import { Card } from './card';

export class Canvas extends GameObject {
  dragging: boolean;
  draggingCard: Card | null = null;
  x: number;
  y: number;
  zoom: number;

  constructor() {
    super()

    this.dragging = false
    this.x = 0
    this.y = 0
    this.zoom = 1
  }

  initialize() {
    this.element = document.createElement('div');
    this.element.id = 'canvas';
    this.element.style.position = 'absolute';

    super.initialize();
    this.parent?.element?.appendChild(this.element);

    this.setupEventListeners()
  }

  setupEventListeners() {
    window.addEventListener('mouseup', () => this.onMouseUp());
    window.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    this.game.container.element.addEventListener('wheel', (e) => this.onMouseWheel(e));
  }

  onMouseDown(event) {
    if (event.button === 0 || event.button === 1) {
      if (event.target === this.game.container.element || event.ctrlKey) {
        this.dragging = true;
      }
    } else {
      this.game.canvas.addCard('rabbit')
    }

    this.game.mouse.previus.x = this.game.mouse.x
    this.game.mouse.previus.y = this.game.mouse.y
  }

  onMouseUp() {
    this.dragging = false;
  }

  onMouseMove(event) {
    const deltaX = event.pageX - this.game.mouse.x;
    const deltaY = event.pageY - this.game.mouse.y;

    if (this.dragging) {
      this.x += deltaX;
      this.y += deltaY;
      this.updateElement()
    }

    if (this.draggingCard) {
      this.draggingCard.onMouseMove(event)
    }

    this.game.mouse.x = event.pageX
    this.game.mouse.y = event.pageY
  }

  onMouseWheel(event) {
    event.preventDefault();

    const zoomFactor = event.deltaY > 0 ? 0.8 : 1.2;

    const mouseX = event.pageX;
    const mouseY = event.pageY;
    const worldX = (mouseX - this.x) / this.zoom;
    const worldY = (mouseY - this.y) / this.zoom;

    this.zoom *= zoomFactor;
    this.x = mouseX - (worldX * this.zoom);
    this.y = mouseY - (worldY * this.zoom);

    this.updateElement()
  }

  updateElement() {
    if (this.element) {
      this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.zoom})`;
    }
  }

  addCard(itemName: string) {
    const card = this.addChild(new Card(itemName))
    this.game.cards.push(card)
    card.initialize()
  }

  removeCard(card: Card) {
    this.game.cards = this.game.cards.filter(c => c !== card)
    card.handler.removeConnectedCard()
    this.removeChild(card)
    card.element?.remove()
  }
}
