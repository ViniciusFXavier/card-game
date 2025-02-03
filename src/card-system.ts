export class CardSystem {
  cardTypes: { [key: string]: CardType; };
  cards: { [key: string]: CardObject; };
  productionBlueprints: Blueprint[];

  constructor() {
    this.cardTypes = {
      food: { key: 'food', name: "Food", color: "orange" },
      entity: { key: 'entity', name: "Entity", color: "lightblue" },
      material: { key: 'material', name: "Material", color: "lightcoral" },
      construction: { key: 'construction', name: "Construction", color: "lightgreen" },
      resourceNode: { key: 'resourceNode', name: "Resource Node", color: "lightyellow" },
    };

    this.cards = {
      rawMeat: { key: 'rawMeat', name: "Raw Meat", type: this.cardTypes.food },
      cookedMeat: { key: 'cookedMeat', name: "Cooked Meat", type: this.cardTypes.food },
      apple: { key: 'apple', name: "Apple", type: this.cardTypes.food },
      berry: { key: 'berry', name: "Berry", type: this.cardTypes.food },
      vilager: { key: 'vilager', name: "Vilager", type: this.cardTypes.entity },
      baby: { key: 'baby', name: "Baby", type: this.cardTypes.entity },
      rabbit: { key: 'rabbit', name: "Rabbit", type: this.cardTypes.entity },
      stick: { key: 'stick', name: "Stick", type: this.cardTypes.material },
      stone: { key: 'stone', name: "Stone", type: this.cardTypes.material },
      flint: { key: 'flint', name: "Flint", type: this.cardTypes.material },
      ironOre: { key: 'ironOre', name: "Iron Ore", type: this.cardTypes.material },
      wood: { key: 'wood', name: "Wood", type: this.cardTypes.material },
      bone: { key: 'bone', name: "Bone", type: this.cardTypes.material },
      house: { key: 'house', name: "House", type: this.cardTypes.construction },
      campfire: { key: 'campfire', name: "Campfire", type: this.cardTypes.construction },
      ironMine: { key: 'ironMine', name: "Iron Mine", type: this.cardTypes.construction },
      rock: { key: 'rock', name: "Rock", type: this.cardTypes.resourceNode },
      berryBush: { key: 'berryBush', name: "Berry Bush", type: this.cardTypes.resourceNode },
      tree: { key: 'tree', name: "Tree", type: this.cardTypes.resourceNode },
      ironDeposit: { key: 'ironDeposit', name: "Iron Deposit", type: this.cardTypes.resourceNode },
    };

    this.defineConnections();
    this.productionBlueprints = this.defineBlueprints();
  }

  defineConnections() {
    const { cards } = this;
    cards.rawMeat.canConnectTo = [cards.rawMeat, cards.campfire];
    cards.cookedMeat.canConnectTo = [cards.cookedMeat, cards.vilager];
    cards.berry.canConnectTo = [cards.berry, cards.vilager];
    cards.apple.canConnectTo = [cards.apple, cards.vilager];
    cards.berryBush.canConnectTo = [cards.berryBush];
    cards.tree.canConnectTo = [cards.tree];
    cards.rock.canConnectTo = [cards.rock];
    cards.ironDeposit.canConnectTo = [cards.ironDeposit];
    cards.flint.canConnectTo = [cards.flint, cards.stick];
    cards.ironOre.canConnectTo = [cards.ironOre];
    cards.stick.canConnectTo = [cards.stick, cards.flint];
    cards.stone.canConnectTo = [cards.stone, cards.wood];
    cards.wood.canConnectTo = [cards.wood, cards.stone];
    cards.bone.canConnectTo = [cards.bone];
    cards.baby.canConnectTo = [cards.house];
    cards.vilager.canConnectTo = [
      cards.wood,
      cards.stick,
      cards.tree,
      cards.stone,
      cards.rock,
      cards.flint,
      cards.berryBush,
      cards.house,
      cards.vilager,
      cards.rabbit,
      cards.ironMine,
      cards.ironDeposit,
    ];
  }

  defineBlueprints() {
    return [
      {
        duration: 5,
        inputs: [
          { resource: this.cards.tree, amount: 1, consumed: true },
          { resource: this.cards.vilager, amount: 1, consumed: false },
        ],
        outputs: [
          { resource: this.cards.wood, amount: 1, probability: 1 },
          { resource: this.cards.apple, amount: 1, probability: 0.2 },
        ],
      },
      {
        duration: 10,
        inputs: [
          { resource: this.cards.berryBush, amount: 1, consumed: true },
          { resource: this.cards.vilager, amount: 1, consumed: false },
        ],
        outputs: [{ resource: this.cards.berry, amount: 1, probability: 1 }],
      },
      {
        duration: 5,
        inputs: [
          { resource: this.cards.rock, amount: 1, consumed: true },
          { resource: this.cards.vilager, amount: 1, consumed: false },
        ],
        outputs: [
          { resource: this.cards.stone, amount: 1, probability: 1 },
          { resource: this.cards.ironDeposit, amount: 1, probability: 0.05 },
        ],
      },
      {
        duration: 5,
        inputs: [
          { resource: this.cards.wood, amount: 1, consumed: true },
          { resource: this.cards.vilager, amount: 1, consumed: false },
        ],
        outputs: [
          { resource: this.cards.stick, amount: 2, probability: 1 },
          { resource: this.cards.stick, amount: 1, probability: 0.1 },
        ],
      },
      {
        duration: 20,
        inputs: [
          { resource: this.cards.vilager, amount: 1, consumed: false },
          { resource: this.cards.wood, amount: 2, consumed: true },
          { resource: this.cards.stone, amount: 1, consumed: true },
        ],
        outputs: [{ resource: this.cards.house, amount: 1, probability: 1 }],
      },
      {
        duration: 30,
        inputs: [
          { resource: this.cards.vilager, amount: 2, consumed: false },
          { resource: this.cards.house, amount: 1, consumed: false },
        ],
        outputs: [{ resource: this.cards.baby, amount: 1, probability: 1 }],
      },
      {
        duration: 10,
        inputs: [
          { resource: this.cards.stick, amount: 2, consumed: true },
          { resource: this.cards.flint, amount: 1, consumed: true },
        ],
        outputs: [{ resource: this.cards.campfire, amount: 1, probability: 1 }],
      },
      {
        duration: 60,
        inputs: [
          { resource: this.cards.house, amount: 1, consumed: false },
          { resource: this.cards.baby, amount: 1, consumed: true },
        ],
        outputs: [{ resource: this.cards.vilager, amount: 1, probability: 1 }],
      },
      {
        duration: 60,
        inputs: [
          { resource: this.cards.rawMeat, amount: 1, consumed: true },
          { resource: this.cards.campfire, amount: 1, consumed: false },
        ],
        outputs: [{ resource: this.cards.cookedMeat, amount: 1, probability: 1 }],
      },
      {
        duration: 45,
        inputs: [
          { resource: this.cards.ironMine, amount: 1, consumed: false },
          { resource: this.cards.vilager, amount: 1, consumed: false },
        ],
        outputs: [
          { resource: this.cards.ironOre, amount: 1, probability: 1 }
        ],
      },
      {
        duration: 45,
        inputs: [
          { resource: this.cards.ironDeposit, amount: 1, consumed: true },
          { resource: this.cards.vilager, amount: 1, consumed: false },
        ],
        outputs: [
          { resource: this.cards.ironOre, amount: 1, probability: 1 }
        ],
      },
      {
        duration: 30,
        inputs: [
          { resource: this.cards.rabbit, amount: 1, consumed: true },
          { resource: this.cards.vilager, amount: 1, consumed: false },
        ],
        outputs: [
          { resource: this.cards.rawMeat, amount: 1, probability: 0.5 },
          { resource: this.cards.bone, amount: 1, probability: 0.5 }
        ],
      },
    ];
  }
}
