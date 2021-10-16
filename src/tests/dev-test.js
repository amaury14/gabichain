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

// Wallet transaction verification and update
// const GWallet = require("../lib/wallet");
// const GTransaction = require("../lib/wallet/transaction");
// const w1 = new GWallet();
// const w2 = new GWallet();
// const tx = GTransaction.newTransaction(w1, w2.publicKey, 100000);
// tx.update(w1, w2.publicKey, 200000);
// tx.update(w1, w2.publicKey, 300000);
// console.log('🚀 ~ tx', tx);
// console.log('Verification of transaction is: ', GTransaction.verifyTransaction(tx));

// Verify transaction pool
// const GWallet = require("../lib/wallet");
// const GTransactionPool = require("../lib/wallet/transaction-pool");
// const GTransaction = require("../lib/wallet/transaction");

// const w1 = new GWallet();
// const tp = new GTransactionPool();
// const tx = GTransaction.newTransaction(w1, '0000', 30);
// tp.updateOrAddTransaction(tx);
// console.log(tp.transactions.find(item => item.id === tx.id) === tx);
// const newTx = tx.update(w1, '0000', 50);
// tp.updateOrAddTransaction(newTx);
// console.log(tp.transactions.find(item => item.id === newTx.id) === newTx);
// console.log(tp.transactions.length);
