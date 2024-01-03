import { Account } from './helpers/Account';

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

  constructor() {
    this.#accounts = [];
  }

  /**
   * Set account data.
   * This method is called when the data is fetched from the server.
   * The data is overwritten with the new data.
   * @param {Account[]} accounts
   */
  setAccounts(accounts) {
    this.#accounts = accounts;
    accountRenderer(this.#accounts);
  }

  /**
   * Add a new account.
   * @param {Account} account
   */
  addAccount(account) {
    this.#accounts.push(account);
    accountRenderer(this.#accounts);
  }
}

/**
 * Render the account data.
 * @param {Account[]} accounts
 */
const accountRenderer = (accounts) => {
  // generate option tags
  const optionTags = () =>
    accounts.map((account) => generateOptionTag(account.id, account.username));

  // grab the account select tag from the DOM.
  const accountFilterSelectTag = $('#account-filter');
  accountFilterSelectTag.empty(); // clear the select tag.
  // generate default option tag.
  const accountNotSelected = generateOptionTag(0, 'ALL');
  accountFilterSelectTag.append([accountNotSelected, ...optionTags()]);

  // grab the account select tag from the DOM.
  const accountSelectTag = $('#account');
  accountSelectTag.empty(); // clear the select tag.
  // add option tags to the select tag.
  accountSelectTag.append(optionTags());

  // grab the 'from' select tag from the DOM.
  const fromSelectTag = $('#from');
  fromSelectTag.empty(); // clear the select tag.
  fromSelectTag.append(optionTags());

  // grab the 'to' select tag from the DOM.
  const toSelectTag = $('#to');
  toSelectTag.empty(); // clear the select tag.
  toSelectTag.append(optionTags);
};

/**
 * generate option tags for the select tag.
 * @param {number} id
 * @param {string} name
 * @returns {HTMLOptionElement} optionTag
 */
// TODO: to private after the category is updated.
export const generateOptionTag = (id, name) => {
  const optionTag = document.createElement('option');
  optionTag.value = id.toString();
  optionTag.innerText = name;
  return optionTag;
};
