const GBlock = require('./block');

class GBlockChain {
    constructor() {
        this.gchain = [GBlock.genesis()];
    }

    getLastBlock() {
        return this.gchain[this.gchain.length - 1];
    }

    addBlock(data) {
        const block = GBlock.mineGBlock(this.getLastBlock(), data);
        this.gchain.push(block);
        return block;
    }

    isValidChain(gchain) {
        // Validates genesis block as 1st
        if (JSON.stringify(gchain[0]) !== JSON.stringify(GBlock.genesis())) {
            return false;
        }
        for (let i = 1; i < gchain.length; i++) {
            const block = gchain[i];
            const lastBlock = gchain[i-1];
            if (block.lastHash !== lastBlock.hash || block.hash !== GBlock.blockHash(block)) {
                return false;
            }
        }
        return true;
    }

    replaceChain(newChain) {
        if (newChain.length <= this.gchain.length) {
            // Received chain is not longer than current chain.
            return;
        } else if (!this.isValidChain(newChain)) {
            // Received chain is not valid.
            return;
        }
        // Replacing chain with received...
        this.gchain = newChain;
        // Replaced successfully.
    }
}

module.exports = GBlockChain;