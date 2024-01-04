import { Store } from './store.js';
import { Renderer } from './renders.js';
import { fetchAccounts, createNewAccount } from './apis/account.js';
import { fetchCategories, createNewCategory } from './apis/category.js';
import { fetchTransactions } from './apis/transactions.js';

// this is the store instance.
// This store is singleton.
const renderer = new Renderer();
export const store = new Store(renderer);

$(() => {
  //Start coding here!

  // fetch accounts and categories initial data from the server.
  fetchAccounts();
  fetchCategories();
  fetchTransactions();

  // create a new account.
  $('#create-new-account').on('submit', function (e) {
    e.preventDefault();
    const usernameInput = $(this).find('input');
    const username = usernameInput.val();
    createNewAccount(username);
    usernameInput.val('');
  });

  $('#create-new-category').on('submit', function (e) {
    e.preventDefault();
    const categoryInput = $(this).find('input');
    createNewCategory(categoryInput.val());
    categoryInput.val('');
  });
});
