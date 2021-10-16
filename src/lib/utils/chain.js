const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { v1: uuidv1 } = require('uuid');

class GChainUtil {
    static getKeyPair() {
        return ec.genKeyPair();
    }
    static id() {
        return uuidv1();
    }
    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }
}

module.exports = GChainUtil;