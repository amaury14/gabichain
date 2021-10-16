const GWallet = require('./index');
const GTransaction = require('./transaction');

const myWallet = new GWallet();
const recipient = 'another';
const amount = 200000;
console.log(myWallet.toString());
const tx = GTransaction.newTransaction(myWallet, recipient, amount);
console.log(tx);