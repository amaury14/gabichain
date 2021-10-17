const GTransaction = require('../wallet/transaction');

class GTransactionPool {
    constructor() {
        this.transactions = [];
    }

    updateOrAddTransaction(transaction) {
        let transactionWithId = this.transactions.find(item => item.id === transaction.id);
        if (transactionWithId) {
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }

    existingTransaction(address) {
        return this.transactions.find(item => item.input.address === address);
    }

    validTransactions() {
        return this.transactions.filter(item => {
            const outputTotal = item.outputs.reduce((total, output) => {
                return total + output.amount;
            }, 0);
            if (item.input.amount !== outputTotal) {
                console.log(`Invalid transaction from ${item.input.address}`);
                return;
            }
            if (!GTransaction.verifyTransaction(item)) {
                console.log(`Invalid signature from ${item.input.address}`);
                return;
            }
            return item;
        })
    }

    clear() {
        this.transactions = [];
    }
}

module.exports = GTransactionPool;