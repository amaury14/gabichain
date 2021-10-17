const express = require("express");
const bodyParser = require("body-parser");
const GBlockChain = require("../blockchain");
const GP2PServer = require("./p2pServer");
const GMiner = require("./miner");
const GWallet = require("../wallet");
const GTransactionPool = require("../wallet/transaction-pool");
const { GHTTP_PORT } = require("../config");
const HTTP_PORT = process.env.HTTP_PORT || GHTTP_PORT;

// App
const app = express();
app.use(bodyParser.json());

// Variables
const wallet = new GWallet();
const tp = new GTransactionPool();
const bc = new GBlockChain();
const p2pServer = new GP2PServer(bc, tp);
const miner = new GMiner(bc, tp, wallet, p2pServer);

// Endpoints
app.get("/blocks", (req, res) => {
  res.json(bc.gchain);
});

app.post("/mine", (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  p2pServer.syncChains();
  res.redirect("/blocks");
});

app.get("/transactions", (req, res) => {
  res.json(tp.transactions);
});

app.post("/transact", (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);
  p2pServer.syncTransactions(transaction);
  res.redirect("/transactions");
});

app.get("/public-key", (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

app.post("/mine-transactions", (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect("/blocks");
});

app.get("/balance", (req, res) => {
  res.json(wallet.calculateBalance(bc, wallet.publicKey));
});

app.post("/address-balance", (req, res) => {
  const { address } = req.body;
  res.json(wallet.calculateBalance(bc, address));
});

app.listen(HTTP_PORT, () => {
  console.log("GBlockChain listening on port: ", HTTP_PORT);
});
// P2P Websocket Server
p2pServer.listen();
