const GWallet = require("../wallet");
const GTransaction = require("../wallet/transaction");

class GMiner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine() {
        const validTransactions = this.transactionPool.validTransactions();
        // Include reward for miner
        validTransactions.push(GTransaction.rerwardTransaction(this.wallet, GWallet.blockchainWallet()));
        // Create a block of the valid transactions
        const block = this.blockchain.addBlock(validTransactions);
        // Syncronize the chains on the p2p server
        this.p2pServer.syncChains();
        // Clear the transaction pool
        this.transactionPool.clear();
        // Broadcast to every miner to clear the transaction pool
        this.p2pServer.broadcastClearTransactions();
        return block;
    }
}

module.exports = GMiner;