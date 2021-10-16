const GBlockChain = require("../lib/blockchain");

const bc = new GBlockChain();

for (let i = 1; i <= 10; i++) {
  console.log(bc.addBlock(`Block ${i}`).toString());
}
