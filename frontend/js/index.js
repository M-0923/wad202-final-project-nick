import { Store } from './store.js';
import { Renderer } from './renders.js';
import { fetchAccounts, createNewAccount } from './apis/account.js';
import { fetchCategories, createNewCategory } from './apis/category.js';

// this is the store instance.
// This store is singleton.
const renderer = new Renderer();
export const store = new Store(renderer);

$(() => {
  //Start coding here!

  // fetch accounts and categories initial data from the server.
  fetchAccounts();
  fetchCategories();

  // create a new account.
  $('#create-new-account').on('submit', function (e) {
    e.preventDefault();
    const usernameInput = $(this).find('input');
    const username = usernameInput.val();
    createNewAccount(username);
    usernameInput.val('');
  });

  // create a new category.
  $('#create-new-category').on('submit', function (e) {
    e.preventDefault();
    const categoryInput = $(this).find('input');
    createNewCategory(categoryInput.val());
    categoryInput.val('');
  });

  // transaction type radio button event handler.
  $('input[type="radio"][name="transaction-type"]').on('change', function (e) {
    const transactionType = $(this).attr('id');
    const accountSelect = $('#account-select');
    const fromSelect = $('#from-select');
    const toSelect = $('#to-select');
    if (transactionType === 'transfer') {
      accountSelect.hide();
      fromSelect.show();
      toSelect.show();
    } else {
      accountSelect.show();
      fromSelect.hide();
      toSelect.hide();
    }
  });

  // Check the deposit radio button by default.
  $('#deposit').attr('checked', true).trigger('change');
});
