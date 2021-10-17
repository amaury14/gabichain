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

    createTransaction(recipient, amount, transactionPool) {
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

    static blockchainWallet() {
        const blockchainWallet = new this();
        // Here we have issues
        blockchainWallet.address = GBLOCKCHAIN_WALLET;
        return blockchainWallet;
    }
}

module.exports = GWallet;