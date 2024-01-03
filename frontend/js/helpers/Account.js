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
   * @type {number[]}
   */
  #transactions;

  /**
   * constructor
   * @param {number} id
   * @param {string} username
   * @param {number[]} transactions
   */
  constructor(id, username, transactions = []) {
    this.#id = id;
    this.#username = username;
    this.#transactions = transactions;
  }

  get id() {
    return this.#id;
  }

  get username() {
    return this.#username;
  }

  get balance() {
    return this.#transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }
}
