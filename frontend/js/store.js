import { Account } from './helpers/Account';
import { Renderer } from './renders.js';

/**
 * This class hosts all data.
 * If the data is updated, the appropriate render method is called.
 * @class Store
 */
export class Store {
  /**
   * @type {Account[]}
   */
  #accounts;

  /**
   * @type {Renderer}
   */
  #renderer;

  /**
   * @param {Renderer} renderer
   */
  constructor(renderer) {
    this.#accounts = [];
    this.#renderer = renderer;
  }

  /**
   * Set account data.
   * This method is called when the data is fetched from the server.
   * The data is overwritten with the new data.
   * @param {Account[]} accounts
   */
  setAccounts(accounts) {
    this.#accounts = accounts;
    this.#renderer.accountRenderer(this.#accounts);
  }

  /**
   * Add a new account.
   * @param {Account} account
   */
  addAccount(account) {
    this.#accounts.push(account);
    this.#renderer.accountRenderer(this.#accounts);
  }
}
