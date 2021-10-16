const GChainUtil = require('../utils/chain');

class GTransaction {
    constructor() {
        this.id = GChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    static newTransaction(sender, recipient, amount) {
        const transaction = new this();
        if (amount > sender.balance) {
            console.log(`Amount ${amount} exceeds balance`);
            return;
        }
        transaction.outputs.push(...[
            { amount: sender.balance - amount, adress: sender.publicKey },
            { amount, adress: recipient }
        ]);
        this.signTransaction(transaction, sender);
        return transaction;
    }

    static signTransaction(transaction, sender) {
        transaction.input = {
            timestamp: Date.now(),
            amount: sender.balance,
            address: sender.publicKey,
            signature: sender.sign(GChainUtil.hash(this.outputs))
        };
    }
}

module.exports = GTransaction;