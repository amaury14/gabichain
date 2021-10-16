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
}

module.exports = GBlockChain;