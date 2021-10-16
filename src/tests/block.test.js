const GBlock = require("../lib/blockchain/block");
const { GDIFFICULTY } = require('../lib/config');

describe("GBlock", () => {
  let data, lastBlock, block;
  beforeEach(() => {
    data = "bar";
    lastBlock = GBlock.genesis();
    block = GBlock.mineGBlock(lastBlock, data);
  });

  it("Set the data in block to match the input", () => {
    expect(block.data).toEqual(data);
  });

  it("Set the lastHash to match the hash of the last block", () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it("Generate the hash to match the difficulty", () => {
    expect(block.hash.substring(0, GDIFFICULTY)).toEqual('0'.repeat(GDIFFICULTY));
  });
});
