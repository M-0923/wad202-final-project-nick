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

        store.addTransactions(transactions);
      })
      .catch((e) => {
        console.error(e);
      });
  });
};
