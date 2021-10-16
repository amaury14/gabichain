const GBlockChain = require('../lib/blockchain');
const GBlock = require('../lib/blockchain/block');

describe('GBlockChain', () => {
    let bc, bc2;
    beforeEach(() => {
        bc = new GBlockChain();
        bc2 = new GBlockChain();
    });

    it('Start with the genesis block', () => {
        expect(bc.gchain[0]).toEqual(GBlock.genesis());
    });

    it('Add a new block', () => {
        const data = 'exmple data';
        bc.addBlock(data);
        expect(bc.gchain[bc.gchain.length - 1].data).toEqual(data);
    });

    it('Validate a chain', () => {        
        bc2.addBlock('foo');
        expect(bc2.isValidChain(bc2.gchain)).toBe(true);
    });

    it('Validate chain with a corrupt genesis block', () => {
        bc2.gchain[0].data = 'error';
        expect(bc.isValidChain(bc2.gchain)).toBe(false);
    });

    it('Invalidate a corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.gchain[1].data = 'error';
        expect(bc.isValidChain(bc2.gchain)).toBe(false);
    });

    it('Replace chain with a valid one', () => {
        bc2.addBlock('foo');
        bc.replaceChain(bc2.gchain);
        expect(bc.gchain).toEqual(bc2.gchain);
    });

    it('Do not replace chain with a invalid one', () => {
        bc.addBlock('foo');
        bc.replaceChain(bc2.gchain);
        expect(bc.gchain).not.toEqual(bc2.gchain);
    });
});