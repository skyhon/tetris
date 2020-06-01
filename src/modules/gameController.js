//--------------------------------------------------------------
// GameController Class - controls piece movements
//--------------------------------------------------------------

// Constructor
export default class GameController {
  constructor() {
    this.enabledKeys = {
      up: {
        code: 87, // w
        key: String.fromCharCode(87),
        name: "up",
      },

      down: {
        code: 83, // s
        key: String.fromCharCode(83),
        name: "down",
      },

      left: {
        code: 65, // a
        key: String.fromCharCode(65),
        name: "left",
      },

      right: {
        code: 68, // d
        key: String.fromCharCode(68),
        name: "right",
      },

      clockwise: {
        code: 69, // e
        key: String.fromCharCode(81),
        name: "clockwise",
      },

      counterclockwise: {
        code: 81, // q
        key: String.fromCharCode(69),
        name: "counterclockwise",
      },

      change: {
        code: 50, // 2
        key: String.fromCharCode(50),
        name: "change",
      },
      last: {
        code: null, // null
        key: null,
        name: null,
      },
    };

    this.disabledKeys = {
      up: {
        code: null,
        key: null,
        name: null,
      },

      down: {
        code: null,
        key: null,
        name: null,
      },

      left: {
        code: null,
        key: null,
        name: null,
      },

      right: {
        code: null,
        key: null,
        name: null,
      },

      clockwise: {
        code: null,
        key: null,
        name: null,
      },

      counterclockwise: {
        code: null,
        key: null,
        name: null,
      },

      change: {
        code: null,
        key: null,
        name: null,
      },
      last: {
        code: null,
        key: null,
        name: null,
      },
    };

    // disable up, remove/comment out the following to enable up
    this.enabledKeys.up = {
      code: null,
      key: null,
      name: null,
    };

    this.key = this.enabledKeys;
    this.isEnabled = true;
  }

  // assigns ASCII key values
  setKeys(up, down, left, right, clockwise, counterclockwise, change) {
    this.enabledKeys.up.code = up;
    this.enabledKeys.down.code = down;
    this.enabledKeys.left.code = left;
    this.enabledKeys.right.code = right;
    this.enabledKeys.clockwise.code = clockwise;
    this.enabledKeys.counterclockwise.code = counterclockwise;
    this.enabledKeys.change.code = change;

    if (this.isEnabled) this.key = this.enabledKeys;
  }

  // enable all keys
  enabled() {
    if (!this.isEnabled) {
      this.key = this.enabledKeys;
      this.isEnabled = true;
    }
  }

  // disable all keys
  disabled() {
    if (this.isEnabled) {
      this.key = this.disabledKeys;
      this.isEnabled = false;
    }
  }

  // get keycode to move up (unusable in actual gameplay)
  up() {
    return this.key.up;
  }

  // get keycode to move down
  down() {
    return this.key.down;
  }

  // get keycode to move left
  left() {
    return this.key.left;
  }

  // get keycode to move right
  right() {
    return this.key.right;
  }

  // get keycode to rotate clockwise
  clockwise() {
    return this.key.clockwise;
  }

  // get keycode to rotate counterclockwise
  counterclockwise() {
    return this.key.counterclockwise;
  }

  // get keycode to rotate counterclockwise
  change() {
    return this.key.change;
  }

  // last key Pressed
  last() {
    return this.key.last;
  }

  // get key name by ASCII code
  setLastKeyPressedByCode(keyCode) {
    this.key.last.code = keyCode;
    this.key.last.key = String.fromCharCode(keyCode);

    switch (keyCode) {
      case this.key.up.code:
        this.key.last.name = this.key.up.name;
        break;

      case this.key.down.code:
        this.key.last.name = this.key.down.name;
        break;

      case this.key.left.code:
        this.key.last.name = this.key.left.name;
        break;

      case this.key.right.code:
        this.key.last.name = this.key.right.name;
        break;

      case this.key.clockwise.code:
        this.key.last.name = this.key.clockwise.name;
        break;

      case this.key.counterclockwise.code:
        this.key.last.name = this.key.counterclockwise.name;
        break;

      case this.key.change.code:
        this.key.last.name = this.key.change.name;
        break;

      default:
        this.key.last.name = "undefined";
    }
  }
}
