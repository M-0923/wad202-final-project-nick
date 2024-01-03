import { Account } from '../helpers/Account.js';
import { store } from '../index.js';

/**
 * get accounts from the server.
 * If the request is successful, the data will be rendered in the select tag of the Account section.
 */
export const fetchAccounts = () => {
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
export const createNewAccount = (username) => {
  if (!(username && username.length > 0)) {
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
