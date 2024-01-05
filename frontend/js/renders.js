/**
 * Render the data.
 */
export class Renderer {
  /**
   * Render the options for the account selection tags.
   * @param {Account[]} accounts
   */
  accountRenderer = (accounts) => {
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
   * render to the ID, #category
   * @param {Category[]} categories
   */
  categoryRenderer = (categories) => {
    const categoryList = $('#category');
    categoryList.empty();
    categoryList.append(
      categories.map((category) => generateOptionTag(category.id, category.name)),
    );
  };

  /**
   * Render the table body for the accounts table.
   * @param {Store} store
   */
  accountsTableRenderer = (store) => {
    const accounts = store.accounts;
    const accountsTable = $('#accounts-table').find('tbody');

    // Remove all the tr tags in the tbody tag except the template tr.
    accountsTable.find('tr:not(#account-row-template)').remove();
    // Append the tr tags to the tbody tag.
    accountsTable.append(
      accounts.map((account) =>
        generateAccountTrTag(account.username, store.getBalance(account.id)),
      ),
    );
  };

  /**
   * Render the table body for the transactions table.
   * @param {Store} store
   * @param {number} accountId
   */
  transactionsTableRenderer = (store, accountId) => {
    if (store.transactions.transactions.length === 0) return;
    const transactions = store.transactions.transactions;
    const transactionsTable = $('#transactions-table').find('tbody');

    // Remove all the tr tags in the tbody tag except the template tr.
    transactionsTable.find('tr:not(#transaction-row-template)').remove();

    // Append the tr tags to the tbody tag.
    transactionsTable.append(
      transactions.map((transaction) => {
        // Skip the transaction if the account is not the filter target.
        if (accountId && transaction.accountId !== accountId) return;

        // Define the variables for the td tags.
        const id = transaction.id;
        const account = store.findAccount(transaction.accountId).username;
        const type = transaction.type;
        const category = store.findCategory(transaction.categoryId).name;
        const description = transaction.description;
        const from = store.findAccount(transaction.accountIdFrom)?.username;
        const to = store.findAccount(transaction.accountIdTo)?.username;
        const amount =
          ((account === from) | (type === 'Withdraw') ? '-' : '') + String(transaction.amount);

        // Generate the tr tag.
        return generateTransactionTrTag(id, account, type, category, description, from, to, amount);
      }),
    );
  };
}

/**
 * generate option tags for the select tag.
 * @param {number} id
 * @param {string} name
 * @returns {HTMLOptionElement} optionTag
 */
const generateOptionTag = (id, name) => {
  const optionTag = document.createElement('option');
  optionTag.value = id.toString();
  optionTag.innerText = name;
  return optionTag;
};

/**
 * Generate tr tag for the accounts table.
 * @param {string} account
 * @param {number} balance
 * @returns {HTMLTableRowElement} trTag
 */
export const generateAccountTrTag = (account, balance) => {
  // Grab the template of the tr tag from the DOM and hide it.
  const template = $('#account-row-template')[0];
  const trTag = template.cloneNode(true);
  $(trTag).removeAttr('id');
  $(trTag).removeAttr('hidden');

  // Fill the data in the td tags.
  $(trTag).find('.td-account').text(account);
  $(trTag).find('.td-balance').text(balance);

  return trTag;
};

/**
 * Generate tr tag for the transactions table.
 * @param {number} id
 * @param {string} username
 * @param {'Deposit' | 'Withdraw' | 'Transfer'} type
 * @param {string} category
 * @param {string} description
 * @param {string} from
 * @param {string} to
 * @param {number} amount
 * @returns {HTMLTableRowElement} trTag
 */
export const generateTransactionTrTag = (
  id,
  username,
  type,
  category,
  description,
  from,
  to,
  amount,
) => {
  // Grab the template of the tr tag from the DOM and hide it.
  const template = $('#transaction-row-template')[0];
  const trTag = template.cloneNode(true);
  $(trTag).removeAttr('id');
  $(trTag).removeAttr('hidden');

  // Fill the data in the td tags.
  $(trTag).find('.td-id').text(id);
  $(trTag).find('.td-account').text(username);
  $(trTag).find('.td-type').text(type);
  $(trTag).find('.td-category').text(category);
  $(trTag).find('.td-description').text(description);
  $(trTag).find('.td-from').text(from);
  $(trTag).find('.td-to').text(to);
  $(trTag).find('.td-amount').text(amount);

  return trTag;
};
