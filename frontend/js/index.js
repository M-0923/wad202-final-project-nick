import { Store } from './store.js';
import { Renderer } from './renders.js';
import { fetchAccounts, createNewAccount } from './apis/account.js';
import { fetchCategories, createNewCategory } from './apis/category.js';
import { addNewTransaction, fetchTransactions } from './apis/transactions.js';

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

  // create a new category.
  $('#create-new-category').on('submit', function (e) {
    e.preventDefault();
    const categoryInput = $(this).find('input');
    createNewCategory(categoryInput.val());
    categoryInput.val('');
  });

  $('#add-new-transaction').on('submit', function (e) {
    e.preventDefault();

    const selectedRadio = $(this).find('input[type="radio"]:checked').attr('id');
    const type = `${selectedRadio.charAt(0).toUpperCase()}${selectedRadio.slice(1)}`;

    const account = $('#account-select option:selected').val();

    const from = $('#from-select option:selected').val();
    const to = $('#to-select option:selected').val();

    const category = $(this).find('#category option:selected').val();

    const amountElement = $('#amount-input');

    const descriptionElement = $('#description-input');

    // must be selected
    if (!amountElement.val()) {
      return;
    }

    // cannot transfer between same account.
    if (type === 'Transfer' && from === to) {
      return;
    }

    addNewTransaction({
      accountId: account,
      accountIdFrom: type === 'Transfer' ? from : null, // when type not transfer, accountIdFrom is null.
      accountIdTo: type === 'Transfer' ? to : null, // when type not transfer, accountIdTo is null.
      type,
      amount: amountElement.val(),
      categoryId: category,
      description: descriptionElement.val(),
    });

    /// initialize input
    $('#to-select select').val(0); // account ID TO

    descriptionElement.val('');
    amountElement.val('');
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

  $('#account-filter').on('change', function (e) {
    renderer.transactionsTableRenderer(store);
  });
});
