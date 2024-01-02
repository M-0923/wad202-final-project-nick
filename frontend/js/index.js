import { Store, generateOptionTag } from './store.js';
import { Account } from './helpers/Account.js';

// this is the store instance.
const store = new Store();

$(() => {
  //Start coding here!

  // fetch accounts and categories initial data from the server.
  fetchAccounts();
  fetchCategories();

  // create a new account.
  $('#create-new-account').on('submit', function (e) {
    e.preventDefault();
    const username = $('input').val();
    createNewAccount(username);
  });
});

/**
 * get accounts from the server.
 * If the request is successful, the data will be rendered in the select tag of the Account section.
 */
const fetchAccounts = () => {
  fetch('http://localhost:3000/accounts', {
    method: 'GET',
  })
    .then((res) => {
      res.json().then((data) => {
        // update the store with the fetched accounts data.
        const accounts = data.map(
          (account) => new Account(account.id, account.username, account.transaction),
        );
        store.setAccounts(accounts);
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

/**
 * create a new account.
 * If creating is successful, the data will be rendered in the select tag of the Account section.
 * @param {string} username
 */
const createNewAccount = (username) => {
  if (!(username.length > 0)) {
    alert('Username cannot be empty!');
    return;
  }

  fetch('http://localhost:3000/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newAccount: username }),
  })
    .then((res) => {
      res.json().then((data) => {
        store.addAccount(new Account(data.id, data.username, data.transaction));
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

/**
 * call the /categories endpoint to get all categories.
 * Then, display them in the categories list.
 */
const fetchCategories = () => {
  fetch('http://localhost:3000/categories', {
    method: 'GET',
  })
    .then((res) => {
      res.json().then((data) => {
        const categoryList = $('#category');
        categoryList.append(data.map((category) => generateOptionTag(category.id, category.name)));
      });
    })
    .catch((err) => console.error(err));
};
