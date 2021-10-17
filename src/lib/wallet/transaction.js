const GChainUtil = require('../utils/chain');
const { GMINING_REWARD } = require('../config');

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
        return senderOutput;
    }

    static transactionWithOutputs(senderWallet, outputs) {
        const transaction = new this();
        transaction.outputs.push(...outputs);
        GTransaction.signTransaction(transaction, senderWallet);
        return transaction;
    }

    static newTransaction(senderWallet, recipientAddress, amount) {
        if (amount > senderWallet.balance) {
            console.log(`Amount ${amount} exceeds balance`);
            return;
        }
        return GTransaction.transactionWithOutputs(senderWallet, [
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipientAddress }
        ]);
    }

    static rewardTransaction(minerWallet, senderWallet) {
        return GTransaction.transactionWithOutputs(senderWallet, [
            { amount: GMINING_REWARD, address: minerWallet.publicKey }
        ]);
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