export class GameObject {
  children: any[];
  parent: GameObject | null;
  element: HTMLElement | null;
  game: any;

  constructor() {
    this.children = [];
    this.parent = null;
    this.element = null;
  }

  addChild(child) {
    console.log('GameObject - addChild', this);
    child.parent = this;
    child.game = this.game;
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    console.log('GameObject - removeChild', this);
    this.children = this.children.filter((c) => c !== child);
  }

  update() {
    console.log('GameObject - update', this);
    this.children.forEach(child => {
      child.update()
    });
  }

  initialize() {
    console.log('GameObject - initialize', this);
    this.children.forEach(child => {
      child.initialize()
    });
  }
}
