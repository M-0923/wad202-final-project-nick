import { Account } from './helpers/Account';
import { Renderer } from './renders.js';
import { Category } from './helpers/Category.js';

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
   * @type {Category[]}
   */
  #categories;

  /**
   * @param {Renderer} renderer
   */
  constructor(renderer) {
    this.#accounts = [];
    this.#renderer = renderer;
    this.#categories = [];
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
    this.#renderer.accountsTableRenderer(this.#accounts);
  }

  /**
   * Add a new account.
   * @param {Account} account
   */
  addAccount(account) {
    this.#accounts.push(account);
    this.#renderer.accountRenderer(this.#accounts);
    this.#renderer.accountsTableRenderer(this.#accounts);
  }

  /**
   * Set category data.
   * @param {Category[]} categories
   */
  setCategories(categories) {
    this.#categories = categories;
    this.#renderer.categoryRenderer(this.#categories);
  }

  /**
   * Add a category data
   * @param {Category} category
   */
  addCategory(category) {
    this.#categories.push(category);
    this.#renderer.categoryRenderer(this.#categories);
  }
}
