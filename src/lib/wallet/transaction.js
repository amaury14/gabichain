const GChainUtil = require('../utils/chain');

class GTransaction {
    constructor() {
        this.id = GChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    update(senderWallet, recipientAddress, amount) {
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);
        if (amount > senderOutput.amount) {
            console.log(`Amount ${amount} exceeds balance`);
            return;
        }
        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({ amount, address: recipientAddress});
        GTransaction.signTransaction(this, senderWallet);
    }

    static newTransaction(senderWallet, recipientAddress, amount) {
        const transaction = new this();
        if (amount > senderWallet.balance) {
            console.log(`Amount ${amount} exceeds balance`);
            return;
        }
        transaction.outputs.push(...[
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipientAddress }
        ]);
        GTransaction.signTransaction(transaction, senderWallet);
        return transaction;
    }

    static signTransaction(transaction, senderWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(GChainUtil.hash(transaction.outputs))
        };
    }

    static verifyTransaction(transaction) {
        return GChainUtil.verifySignature(transaction.input.address, transaction.input.signature, GChainUtil.hash(transaction.outputs));
    }
}

module.exports = GTransaction;