import { CardSystem } from './card-system.ts';
import { Card } from './card.ts';
import { EventEmitter } from './event-emitter.ts';
import { GameObject } from './game-object.ts';
import { Canvas } from './canvas.ts';
import { Container } from './container.ts';

export class Game extends GameObject {
  container: Container;
  canvas: Canvas;
  cards: Card[];
  mouse: { x: number; y: number; previus: { x: number; y: number; }; };
  cardSystem: CardSystem;
  events: EventEmitter;
  game: Game;
  element: HTMLElement | null;

  constructor() {
    super()

    this.mouse = {
      x: 0,
      y: 0,
      previus: {
        x: 0,
        y: 0,
      }
    };

    this.game = this
    this.events = new EventEmitter()
    this.cardSystem = new CardSystem();
    this.element = document.getElementById('app');
    this.container = this.addChild(new Container())
    this.canvas = this.container.addChild(new Canvas())
    this.cards = [
      this.canvas.addChild(new Card('vilager')),
      this.canvas.addChild(new Card('wood', { x: 200 })),
      this.canvas.addChild(new Card('wood', { x: 400 })),
      this.canvas.addChild(new Card('wood', { x: 600 })),
      this.canvas.addChild(new Card('berry', { x: 800 })),
      this.canvas.addChild(new Card('tree', { x: 200, y: 250 })),
      this.canvas.addChild(new Card('house', { x: 400, y: 250 })),
      this.canvas.addChild(new Card('berryBush', { x: 600, y: 250 })),
    ]
  }

  initialize() {
    super.initialize()
  }
}
