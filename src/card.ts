import { GameObject } from './game-object';
import { CardsHandler } from './card-handler';

export class Card extends GameObject {
  itemName: string;
  x: number;
  y: number;
  zoom: number;
  dragging: boolean = false;
  item: CardObject | null = null;
  handler: CardsHandler;

  constructor(
    itemName: string,
    options: { x?: number; y?: number; zoom?: number } = {}
  ) {
    super();
    this.itemName = itemName;
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.zoom = options.zoom ?? 1;
    this.dragging = false;

    this.handler = new CardsHandler(this);
  }

  initialize() {
    this.item = this.game.cardSystem.cards[this.itemName];
    this.element = document.createElement('div');
    this.element.root = this;
    this.setElementStyles();
    this.element.setAttribute('name', 'card');

    super.initialize();
    this.parent?.element?.appendChild(this.element);
    this.setupEventListeners();
    this.addAdditionalComponents();
    this.updateElement();
  }

  setElementStyles() {
    if (this.element) {
      this.element.style.cursor = 'default';
      this.element.style.position = 'absolute';
      this.element.style.background = this.item?.type.color || '#F0F0F0';
      this.element.style.borderRadius = '10px';
      this.element.style.width = '190px';
      this.element.style.height = '230px';
      this.element.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.5)';
      this.element.style.zIndex = '1';
    }
  }

  addAdditionalComponents() {
    if (!this.element) return;

    const nameElement = document.createElement('div');
    nameElement.style.position = 'absolute';
    nameElement.style.top = '50%';
    nameElement.style.left = '50%';
    nameElement.style.transform = 'translate(-50%, -50%)';
    nameElement.style.fontSize = '16px';
    nameElement.style.fontWeight = 'bold';
    nameElement.style.textAlign = 'center';
    nameElement.style.color = '#000';
    nameElement.innerText = this.item?.name || 'Card';
    this.element.appendChild(nameElement);
  }

  setupEventListeners() {
    this.element?.addEventListener('mouseleave', () => this.onMouseOut());
    this.element?.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mouseup', (e) => this.onMouseUp(e));
  }

  setCursor(cursor: string) {
    if (this.element) {
      this.element.style.cursor = cursor;
    }
  }

  setBoxShadow(shadow: string) {
    if (this.element) {
      this.element.style.boxShadow = shadow;
    }
  }

  updateElement() {
    if (this.element) {
      this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.zoom})`;
    }
  }

  onMouseDown(event: MouseEvent) {
    if (event.ctrlKey || event.button !== 0) return;

    if (!this.handler.hasConnectedCard()) {
      this.handler.removeConnectedCard();
    }

    this.handler.clearProductionTimeout();

    this.dragging = true;
    this.game.canvas.draggingCard = this

    this.updateZoom(1.05);

    this.setBoxShadow("5px 5px 5px rgba(0,0,0,0.5)");
    this.setCursor("grabbing");
    this.updateZIndex();
    this.updateElement();
    this.handler.showConnectables();
  }

  onMouseMove(event: MouseEvent) {
    if (this.dragging) {
      this.setCursor("grabbing");

      const deltaX = event.pageX - this.game.mouse.x;
      const deltaY = event.pageY - this.game.mouse.y;

      this.x += deltaX / this.game.canvas.zoom;
      this.y += deltaY / this.game.canvas.zoom;

      this.handler.updateConnectedPositionMove(deltaX / this.game.canvas.zoom, deltaY / this.game.canvas.zoom);
      this.updateElement();
    } else {
      this.setCursor(event.ctrlKey ? "default" : "grab");
    }
  }

  onMouseUp(event: MouseEvent) {
    if (this.dragging) {
      this.handler.checkCollision();
    }

    this.dragging = false;

    this.updateZoom(1);

    this.setBoxShadow('2px 2px 5px rgba(0,0,0,0.5)');
    this.setCursor(event.ctrlKey ? 'default' : 'grab');
    this.updateElement();
    this.handler.removeBorders();
  }

  onMouseOut() {
    this.zoom = 1;
    this.setBoxShadow('2px 2px 5px rgba(0,0,0,0.5)');
    this.setCursor('default');
    this.updateElement();
  }

  updateZoom(value: number) {
    this.zoom = value;
    this.handler.updateZoom(value);
  }

  updateZIndex() {
    this.handler.updateZIndex();
  }
}
