/// <reference types="vite/client" />

interface HTMLElement {
  [key: string]: any;
}

interface EventType {
  callback: Function;
  caller: any;
}

type EventsType = { [key: string]: EventType[] };
type CardType = {
  key: string;
  name: string;
  color: string;
};

type CardObject = {
  key: string;
  name: string;
  type: CardType;
  canConnectTo?: Card[];
};

type ResourceInput = {
  resource: Card;
  amount: number;
  consumed: boolean;
};

type Output = {
  resource: Card;
  amount: number;
  probability: number;
};

type Blueprint = {
  duration: number;
  inputs: ResourceInput[];
  outputs: Output[];
};

