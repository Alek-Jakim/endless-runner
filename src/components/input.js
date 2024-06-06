export class Input {
  constructor() {
    this.pressedKeys = [];

    addEventListener("keypress", (e) => {
      console.log(e.code);
      if (e.code === "Space" && this.pressedKeys.indexOf(e.code) === -1) {
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
