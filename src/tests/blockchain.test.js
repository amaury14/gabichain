const GBlockChain = require('../lib/blockchain');
const GBlock = require('../lib/block');

describe('GBlockChain', () => {
    let bc;
    beforeEach(() => {
        bc = new GBlockChain();
    });

    it('Start with the genesis block', () => {
        expect(bc.gchain[0]).toEqual(GBlock.genesis());
    });

    it('Add a new block', () => {
        const data = 'exmple data';
        bc.addBlock(data);
        expect(bc.gchain[bc.gchain.length - 1].data).toEqual(data);
    });
});