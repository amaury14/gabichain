// Mining test
// const GBlockChain = require("../lib/blockchain");

// const bc = new GBlockChain();

// for (let i = 1; i <= 10; i++) {
//   console.log(bc.addBlock(`Block ${i}`).toString());
// }

// Wallet test
// const GWallet = require('../lib/wallet');
// const wallet = new GWallet();
// console.log(wallet.toString());

// Wallet test
const GWallet = require("../lib/wallet");
const GTransaction = require("../lib/wallet/transaction");
const w1 = new GWallet();
const w2 = new GWallet();

const tx = GTransaction.newTransaction(w1, w2.publicKey, 100000);
tx.update(w1, w2.publicKey, 2000000);
tx.update(w1, w2.publicKey, 3000000);
console.log('🚀 ~ tx', tx);
console.log('Verification of transaction is: ', GTransaction.verifyTransaction(tx));
