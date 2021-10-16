const { INITIAL_BALANCE, GTOKEN } = require('../config');
const GChainUtil = require('../utils/chain');

class GWallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = GChainUtil.getKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `GWallet: 
        \n- Public Key: ${this.publicKey} 
        \n- Balance: ${this.balance} ${GTOKEN}`;
    }
}

module.exports = GWallet;