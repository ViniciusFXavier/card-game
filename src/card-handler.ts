import { Card } from './card';

export class CardsHandler {
  card: Card;
  connectedCard: Card | null = null;
  productionTimeoutId: number | null = null;

  constructor(card: Card) {
    this.card = card;
  }

  getAllConnectedCards(): Card[] {
    const connectedCards: Card[] = [this.card];
    if (this.connectedCard) {
      connectedCards.push(...this.connectedCard.handler.getAllConnectedCards());
    }
    return connectedCards;
  }

  canConnectWith(otherCard: Card): boolean {
    return (this.card.item?.canConnectTo || []).includes(otherCard.item);
  }

  showConnectables() {
    this.card.game.cards
      .filter((c) => !this.isConnectedTo(c))
      .forEach((c) => {
        if (c !== this.card && this.canConnectWith(c) && !c.handler.hasConnectedCard()) {
          c.element.style.outline = '5px dashed white';
          c.element.style.outlineOffset = '5px';
          c.element.style.transition = 'outline 0.1s linear';
        }
      });
  }

  removeBorders() {
    this.card.game.cards.forEach((c) => {
      c.element.style.outline = 'none';
      c.element.style.outlineOffset = '0px';
    });
  }

  updateZIndex() {
    let currentZIndex = this.card.game.cards.length;
    const assignZIndex = (card: Card) => {
      if (card.handler.connectedCard) {
        assignZIndex(card.handler.connectedCard);
      }
      if (card.element) {
        card.element.style.zIndex = (currentZIndex--).toString();
      }
    };
    assignZIndex(this.card);
    this.card.game.cards.forEach((c) => {
      if (!this.isConnectedTo(c)) {
        c.element.style.zIndex = (currentZIndex--).toString();
      }
    });
  }

  isConnectedTo(otherCard: Card): boolean {
    if (!this.connectedCard) return false;
    if (this.connectedCard === otherCard) return true;
    return this.connectedCard.handler.isConnectedTo(otherCard);
  }

  updateConnectedPositionMove(deltaX: number, deltaY: number) {
    const connectedCard = this.connectedCard;
    if (connectedCard) {
      setTimeout(() => {
        connectedCard.x += deltaX;
        connectedCard.y += deltaY;
        connectedCard.updateElement();
        connectedCard.handler.updateConnectedPositionMove(deltaX, deltaY);
      }, 40);
    }
  }

  updateZoom(value: number) {
    if (this.connectedCard) {
      this.connectedCard.zoom = value;
      this.connectedCard.updateElement();
      this.connectedCard.handler.updateZoom(value);
    }
  }

  checkCollision() {
    if (!this.card.element) return;
    const rect1 = this.card.element.getBoundingClientRect();

    const sortedCards = this.card.game.cards
      .filter((c) => c !== this.card && c.element !== this.card.element)
      .filter((c) => !this.isConnectedTo(c))
      .map((c) => ({
        card: c,
        distance: this.calculateDistance(c),
      }))
      .sort((a, b) => a.distance - b.distance);

    for (const { card: otherCard } of sortedCards) {
      const rect2 = otherCard.element.getBoundingClientRect();
      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {
        if (this.canConnectWith(otherCard) && !otherCard.handler.hasConnectedCard()) {
          this.card.x = otherCard.x;
          this.card.y = otherCard.y + 20;
          this.updateConnectedPosition(this.card.x, this.card.y + 20);
          otherCard.handler.addConnectedCard(this.card);
          return;
        } else {
          this.removeConnectedCard();
        }
      } else {
        this.removeConnectedCard();
      }
    }
  }

  updateConnectedPosition(deltaX: number, deltaY: number) {
    if (this.connectedCard) {
      this.connectedCard.x = deltaX;
      this.connectedCard.y = deltaY;
      this.connectedCard.updateElement();
      this.connectedCard.handler.updateConnectedPosition(deltaX, deltaY);
    }
  }

  hasConnectedCard(): boolean {
    return this.connectedCard !== null;
  }

  addConnectedCard(card: Card) {
    if (!this.connectedCard) {
      this.connectedCard = card;
    }
    this.checkForProduction();
  }

  removeConnectedCard() {
    this.card.game.cards.forEach((c) => {
      if (c.handler.connectedCard === this.card) {
        c.handler.connectedCard = null;
      }
    });

    this.clearProductionTimeout();
  }

  checkForProduction() {
    const allConnectedCards = this.getAllConnectedCards();
    const blueprint = this.findMatchingBlueprint(allConnectedCards);
    if (blueprint) {
      this.startProduction(blueprint, allConnectedCards);
    }
  }

  findMatchingBlueprint(allConnectedCards: Card[]): Blueprint | null {
    return (
      this.card.game.cardSystem.productionBlueprints.find((blueprint) => {
        return blueprint.inputs.every((input) => {
          const connectedCard = allConnectedCards.find(
            (c) => c.item === input.resource
          );
          return (
            connectedCard &&
            connectedCard.item === input.resource &&
            this.countResourceInCards(connectedCard, input.amount)
          );
        });
      }) || null
    );
  }

  countResourceInCards(card: Card, amount: number): boolean {
    let totalAmount = 0;
    let currentCard: Card | null = card;
    while (currentCard) {
      if (currentCard.item === card.item) {
        totalAmount++;
      }
      currentCard = currentCard.handler.connectedCard ?? null;
    }
    return totalAmount >= amount;
  }

  startProduction(blueprint: Blueprint, allConnectedCards: Card[]) {
    const { duration, inputs, outputs } = blueprint;

    this.clearProductionTimeout();

    this.productionTimeoutId = setTimeout(() => {
      this.removeConsumedCards(inputs, allConnectedCards);
      this.handleProductionComplete(outputs);
    }, duration * 1000);

    allConnectedCards.forEach((c) => (c.handler.productionTimeoutId = this.productionTimeoutId));
  }

  removeConsumedCards(
    inputs: { resource: CardObject; amount: number; consumed: boolean }[],
    allConnectedCards: Card[]
  ) {
    inputs.forEach((input) => {
      if (input.consumed) {
        allConnectedCards.forEach((c) => {
          if (c.item === input.resource) {
            this.card.game.canvas.removeCard(c);
          }
        });
      }
    });
  }

  handleProductionComplete(
    outputs: { resource: CardObject; amount: number; probability: number }[]
  ) {
    outputs.forEach((output) => {
      if (Math.random() <= output.probability) {
        this.card.game.canvas.addCard(output.resource.key);
      }
    });
  }

  clearProductionTimeout() {
    if (this.productionTimeoutId) {
      clearTimeout(this.productionTimeoutId);
      this.productionTimeoutId = null;
    }
  }

  calculateDistance(otherCard: Card): number {
    const dx = this.card.x - otherCard.x;
    const dy = this.card.y - otherCard.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
