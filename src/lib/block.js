const SHA256 = require('crypto-js/sha256');

class GBlock {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `GBlock: \n- Timestamp: ${this.timestamp} \n- Hash: ${this.hash} \n- Last Hash: ${this.lastHash} \n- Data: ${this.data}`;
    }

    static genesis() {
        return new this('Genesis Time', '0'.repeat(64), '0'.repeat(64), []);
    }

    static mineGBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = this.hash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = GBlock;