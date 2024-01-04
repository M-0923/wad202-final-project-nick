import { Account } from './helpers/Account';
import { Renderer } from './renders.js';
import { Category } from './helpers/Category.js';
import { Transactions } from './helpers/Transaction.js';

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
   * @type {Category[]}
   */
  #categories;

  /**
   * @type {Transactions}
   */
  #transactions;

  /**
   * @type {Renderer}
   */
  #renderer;

  /**
   * @param {Renderer} renderer
   */
  constructor(renderer) {
    this.#accounts = [];
    this.#categories = [];
    this.#transactions = new Transactions();
    this.#renderer = renderer;
  }

  /**
   *
   * @param {number | Account} accountId
   * @returns {Account} - Account object.
   */
  findAccount(accountId) {
    const id = accountId instanceof Account ? accountId.id : accountId;

    return this.#accounts.find((account) => account.id === id);
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

  /**
   * add init transactions data.
   * @param {ITransaction[]} transactions
   */
  initTransactions(transactions) {
    for (const transaction of transactions) {
      this.#transactions.addTransaction(transaction);
    }
  }

  /**
   * add transactions data.
   * @param {ITransaction[]} transactions
   */
  addTransactions(transactions) {
    for (const transaction of transactions) {
      this.#transactions.addTransaction(transaction);
    }
  }
}
