const { GINITIAL_BALANCE, GTOKEN, GBLOCKCHAIN_WALLET } = require('../config');
const GChainUtil = require('../utils/chain');
const GTransaction = require('./transaction');

class GWallet {
    constructor() {
        this.balance = GINITIAL_BALANCE;
        this.keyPair = GChainUtil.getKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `GWallet: 
        \n- Public Key: ${this.publicKey} 
        \n- Balance: ${this.balance} ${GTOKEN}`;
    }

    sign(datahash) {
        return this.keyPair.sign(datahash);
    }

    createTransaction(recipient, amount, blockchain, transactionPool) {
        this.balance = this.calculateBalance(blockchain, this.publicKey);
        if (amount > this.balance) {
            console.log(`Amount ${amount} exceeds balance ${this.balance}`);
            return;
        }
        let transaction = transactionPool.existingTransaction(this.publicKey);
        if (transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = GTransaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }
        return transaction;
    }

    createTransactionForWallet(senderWallet, recipient, amount, blockchain, transactionPool) {
        const balance = this.calculateBalance(blockchain, senderWallet.publicKey);
        if (amount > balance) {
            console.log(`Amount ${amount} exceeds balance ${balance}`);
            return;
        }
        let transaction = transactionPool.existingTransaction(senderWallet.publicKey);
        if (transaction) {
            transaction.update(senderWallet, recipient, amount);
        } else {
            transaction = GTransaction.newTransaction(senderWallet, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }
        return transaction;
    }

    static blockchainWallet() {
        const blockchainWallet = new this();
        // Here we have issues
        blockchainWallet.address = GBLOCKCHAIN_WALLET;
        return blockchainWallet;
    }

    calculateBalance(blockchain, address) {
        let balance = this.balance;
        let transactions = [];
        if (blockchain.gchain.length <= 1) {
            return balance;
        } else {
            const bcCopy = blockchain.gchain.slice(1, blockchain.gchain.length);
            bcCopy.forEach(block => {
                block.data.forEach(transaction => {
                    transactions.push(transaction);
                });                
            });
        }
        const walletInputs = transactions.filter(transaction => transaction.input.address === address);
        let startTime = 0;
        if (walletInputs.length > 0) {
            const recentInputs = walletInputs.reduce((prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current);
            balance = recentInputs.outputs.find(output => output.address === address).amount;
            startTime = recentInputs.input.timestamp;
        }
        transactions.forEach(transaction => {
            if (transaction.input.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if (output.address === address) {
                        balance += output.amount;
                    }
                })
            }
        });
        return balance;
    }
}

module.exports = GWallet;