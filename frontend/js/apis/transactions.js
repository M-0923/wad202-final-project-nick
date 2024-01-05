import { store } from '../index.js';

export const fetchTransactions = () => {
  fetch('http://localhost:3000/transactions', {
    method: 'GET',
  }).then((res) => {
    res
      .json()
      .then((data) => {
        const transactions = [];

        for (const transactionsFromApi of data) {
          if (transactionsFromApi.length === 0) continue;
          for (const transaction of transactionsFromApi) {
            transactions.push(transaction);
          }
        }

        store.initTransactions(transactions);
      })
      .catch((e) => {
        console.error(e);
      });
  });
};

/**
 * @typedef IAddTransactionInput
 * @param {number | null} accountId
 * @param {number | null} accountIdFrom
 * @param {number | null} accountIdTo
 * @param {'Deposit' | 'Withdrow' | 'Transfer'} type
 * @param {number} amount
 * @param {number} categoryId
 * @param {string} description
 */

/**
 * Add transaction to the account.
 * @param {IAddTransactionInput} input - IAddTransactionInput object.
 */
export const addNewTransaction = (input) => {
  const { accountId, accountIdFrom, accountIdTo, type, amount, categoryId, description } = input;

  const transactionPayload = {
    newTransaction: {
      accountId: accountId ? Number(accountId) : null,
      accountIdFrom: accountIdFrom ? Number(accountIdFrom) : null,
      accountIdTo: accountIdTo ? Number(accountIdTo) : null,
      type,
      amount,
      categoryId: Number(categoryId),
      description,
    },
  };

  fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactionPayload),
  })
    .then((res) => {
      res.json().then((data) => {
        store.addTransactions(data);
      });
    })
    .catch((e) => {
      console.error(e);
    });
};
