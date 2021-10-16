const SHA256 = require('crypto-js/sha256');
const { GDIFFICULTY, MINE_RATE } = require('../config');

class GBlock {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty, processTime) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || GDIFFICULTY;
        this.processTime = processTime;
    }

    toString() {
        return `GBlock: 
        \n- Timestamp: ${this.timestamp} 
        \n- Hash: ${this.hash} 
        \n- Last Hash: ${this.lastHash} 
        \n- Data: ${this.data} 
        \n- Nonce: ${this.nonce}
        \n- Difficulty: ${this.difficulty}
        \n- Process Time: ${this.processTime}`;
    }

    static genesis() {
        return new this('Genesis Time', '0'.repeat(64), '0'.repeat(64), [], 0, 0);
    }

    static mineGBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        const t1 = Date.now();
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = this.adjustDifficulty(lastBlock, timestamp);
            hash = this.hash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        const t2 = Date.now();
        const processTime = t2 - t1;
        return new this(timestamp, lastHash, hash, data, nonce, difficulty, processTime);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const {timestamp, lastHash, data, nonce, difficulty} = block;
        return GBlock.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = GBlock;