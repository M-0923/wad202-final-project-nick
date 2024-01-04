/**
 * @typedef ITransaction
 * @property {number} id
 * @property {number} accountId
 * @property {number} accountIdFrom
 * @property {number} accountIdTo
 * @property {'Deposit' | 'Withdraw' | 'Transfer'} type
 * @property {number} amount
 * @property {number} categoryId
 * @property {string} description
 */
class Transactions {
  /**
   * @type {ITransaction[]} - Array of Transaction objects.
   */
  #transactions = [];

  /**
   * @return {ITransaction[]}
   */
  get transactions() {
    return this.#transactions;
  }

  /**
   * add a new transaction to the array of transactions in this class property.
   * @param {ITransaction} transaction - Transaction object.
   */
  addTransaction(transaction) {
    this.#transactions.push(transaction);
  }

  /**
   * get a balance of the account.
   * @param {Account} account - Account object.
   * @return {number} - Balance of the account.
   */
  getBalance(account) {
    const accountId = account.id;
    const relatedTransaction = this.#transactions.filter(
      (transaction) => transaction.accountId === accountId,
    ); // filter transaction by the account

    // account's amount.
    // this is calculated by the sum of the transfer, deposits and withdraws of the account.
    let accountsAmount = 0;

    for (const transaction of relatedTransaction) {
      if (transaction.type === 'Deposit') {
        accountsAmount += transaction.amount;
        continue;
      }

      if (transaction.type === 'Withdraw') {
        accountsAmount -= transaction.amount;
        continue;
      }

      // the following code is for transfer transaction.
      transaction.accountIdFrom === accountId
        ? (accountsAmount -= transaction.amount)
        : (accountsAmount += transaction.amount);
    }

    return accountsAmount;
  }

  /**
   * get all transactions of the account.
   * @param {Account} account - Account instance.
   * @return {ITransaction[]} - Array of Transaction objects.
   */
  getTransactionsByAccountId(account) {
    return this.#transactions.filter((transaction) => transaction.accountId === account.id);
  }
}
