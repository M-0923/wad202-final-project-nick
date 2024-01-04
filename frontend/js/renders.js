/**
 * Render the data.
 *
 */
export class Renderer {
  /**
   * Render the account data.
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

  // Fill the data in the td tags.
  $(trTag).find('.td-account').text(account);
  $(trTag).find('.td-balance').text(balance);

  return trTag;
};
