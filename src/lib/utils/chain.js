const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

class GChainUtil {
    static getKeyPair() {
        return ec.genKeyPair();
    }
}

module.exports = GChainUtil;