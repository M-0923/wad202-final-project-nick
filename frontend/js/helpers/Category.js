export class Category {
  /**
   * @type {number}
   */
  #id;
  /**
   * @type {string}
   */
  #name;

  /**
   * @param {number} id - category ID.
   * @param {string} name - category name.
   */
  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }
}
