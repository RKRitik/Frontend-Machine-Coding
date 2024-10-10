class Emitter {
  constructor() {
    this.lastId = 0;
    this.events = {};
  }

  // Called by subscribers, 'event_name' and a callback
  subscribe(event_name, callback) {
    if (typeof event_name !== "string")
      throw new TypeError("incorrect event name");
    if (typeof callback !== "function")
      throw new TypeError("incorrect callback");

    if (!this.events[event_name]) {
      this.events[event_name] = [];
    }

    const subscriber = {
      id: this.lastId,
      cb: callback,
      event_name,
    };

    this.events[event_name].push(subscriber);
    this.lastId++;

    return {
      ...subscriber,
      release: () => this.release(event_name, subscriber.id),
    };
  }

  // Only called by emitter, 'event_name', ...args
  emit(event_name, ...args) {
    if (!this.events.hasOwnProperty(event_name)) {
      return;
    }
    this.events[event_name].forEach((subscriber) => subscriber.cb(...args));
  }

  // Called by subscriber. Remove it from subscribers
  release(event_name, id) {
    if (this.events[event_name]) {
      this.events[event_name] = this.events[event_name].filter(
        (subscriber) => subscriber.id !== id
      );
    }
  }
}
const emitter = new Emitter();
console.log(emitter);

const p1 = emitter.subscribe("click", (...args) => {
  console.log("got args", args, "on click for p1");
});

const p2 = emitter.subscribe("click", (...args) => {
  console.log("got args", args, "on click for p2");
});

emitter.emit("click", 1, 2, 3);

p1.release();

emitter.emit("click", 1, 2, 3);

emitter.emit("click2", 1, 2, 3);
