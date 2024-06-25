export class Input {
  static allowedKeys = ["Space", "KeyK"];

  constructor() {
    this.pressedKeys = [];

    addEventListener("keypress", (e) => {
      if (
        Input.allowedKeys.includes(e.code) &&
        this.pressedKeys.indexOf(e.code) === -1
      ) {
        this.pressedKeys.unshift(e.code);
      }
    });

    addEventListener("keydown", (e) => {
      if (
        Input.allowedKeys.includes(e.code) &&
        this.pressedKeys.indexOf(e.code) === -1
      ) {
        this.pressedKeys.unshift(e.code);
      }
    });

    addEventListener("keyup", (e) => {
      if (this.pressedKeys.indexOf(e.code) !== -1) {
        this.pressedKeys.splice(this.pressedKeys.indexOf(e.code), 1);
      }
    });
  }

  get pressedKey() {
    return this.pressedKeys[0];
  }
}
