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
   * @return {Account[]}
   */
  get accounts() {
    return this.#accounts;
  }

  /**
   * @return {Category[]}
   */
  get categories() {
    return this.#categories;
  }

  /**
   * @return {Transactions}
   */
  get transactions() {
    return this.#transactions;
  }

  /**
   * find an account from this property.
   * @param {number | Account} accountId - account id or account object.
   * @returns {Account | undefined} - Account object.
   */
  findAccount(accountId) {
    const id = accountId instanceof Account ? accountId.id : accountId;

    return this.#accounts.find((account) => account.id === id);
  }

  /**
   * find a category from this property.
   * @param {number | Category} categoryId - category id or category object.
   * @returns {Category | undefined} - Category object.
   */
  findCategory(categoryId) {
    const id = categoryId instanceof Category ? categoryId.id : categoryId;
    return this.#categories.find((category) => category.id === id);
  }

  /**
   * find transactions of an account from this property.
   * @param {number | Account} accountId - account id or account object.
   * @returns {ITransaction[]} - transactions of the account.
   */
  getTransactionsOfAccount(accountId) {
    const id = accountId instanceof Account ? accountId.id : accountId;
    return this.#transactions.getTransactionsByAccountId(id);
  }

  /**
   * get balance of an account from this property.
   * @param accountId - account id or account object.
   * @returns {number} - balance of the account.
   */
  getBalance(accountId) {
    const id = accountId instanceof Account ? accountId.id : accountId;
    return this.#transactions.getBalance(id);
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
    this.#renderer.accountsTableRenderer(this);
  }

  /**
   * Add a new account.
   * @param {Account} account
   */
  addAccount(account) {
    this.#accounts.push(account);
    this.#renderer.accountRenderer(this.#accounts);
    this.#renderer.accountsTableRenderer(this);
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
    this.#transactions = new Transactions();
    for (const transaction of transactions) {
      this.#transactions.addTransaction(transaction);
    }
    this.#renderer.transactionsTableRenderer(this);
  }

  /**
   * add transactions data.
   * @param {ITransaction[]} transactions
   */
  addTransactions(transactions) {
    for (const transaction of transactions) {
      this.#transactions.addTransaction(transaction);
    }
    this.#renderer.transactionsTableRenderer(this);
    this.#renderer.accountsTableRenderer(this);
  }
}
