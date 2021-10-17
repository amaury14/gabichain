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
        // Create a block of the valid transactions
        // Syncronize the chains on the p2p server
        // Clear the transaction pool
        // Broadcast to every miner to clear the transaction pool
    }
}

module.exports = GMiner;