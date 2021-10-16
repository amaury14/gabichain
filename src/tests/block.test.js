const GBlock = require("../lib/block");

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
});
