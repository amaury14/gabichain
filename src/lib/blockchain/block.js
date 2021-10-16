const SHA256 = require('crypto-js/sha256');
const { GDIFFICULTY } = require('../config');

class GBlock {
    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString() {
        return `GBlock: 
        \n- Timestamp: ${this.timestamp} 
        \n- Hash: ${this.hash} 
        \n- Last Hash: ${this.lastHash} 
        \n- Data: ${this.data} 
        \n- Nonce: ${this.nonce}`;
    }

    static genesis() {
        return new this('Genesis Time', '0'.repeat(64), '0'.repeat(64), [], 0);
    }

    static mineGBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            hash = this.hash(timestamp, lastHash, data, nonce);
        } while (hash.substring(0, GDIFFICULTY) !== '0'.repeat(GDIFFICULTY));
        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block) {
        const {timestamp, lastHash, data, nonce} = block;
        return GBlock.hash(timestamp, lastHash, data, nonce);
    }
}

module.exports = GBlock;