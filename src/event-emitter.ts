export class EventEmitter {
  events: EventsType;

  constructor() {
    this.events = {};
  }

  emit(eventName: string, value?: any) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((event) => {
        event.callback(value);
      });
    }
    return this;
  }

  on(eventName: string, callback: Function, caller?: any) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({ callback, caller });
    return this;
  }

  off(eventName: string, callback: Function) {
    if (this.events[eventName]) {
      this.events[eventName] = [...this.events[eventName]].filter(
        (event) => event.callback !== callback
      );
    }
    return this;
  }
}
