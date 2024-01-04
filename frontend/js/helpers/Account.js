export class Account {
  /**
   * @type {number}
   */
  #id;
  /**
   * @type {string}
   */
  #username;

  /**
   * constructor
   * @param {number} id - account id
   * @param {string} username - account username
   */
  constructor(id, username) {
    this.#id = id;
    this.#username = username;
  }

  get id() {
    return this.#id;
  }

  get username() {
    return this.#username;
  }
}
