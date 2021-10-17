const express = require("express");
const bodyParser = require("body-parser");
const GBlockChain = require("../blockchain");
const GP2PServer = require("./p2pServer");
const { GHTTP_PORT } = require("../config");

const HTTP_PORT = process.env.HTTP_PORT || GHTTP_PORT;
const app = express();
const GWallet = require("../wallet");
const GTransactionPool = require("../wallet/transaction-pool");

const wallet = new GWallet();
const tp = new GTransactionPool();
const bc = new GBlockChain();
const p2pServer = new GP2PServer(bc);
app.use(bodyParser.json());

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
    const transaction = wallet.createTransaction(recipient, amount, tp);
    res.redirect("/transactions");
  });

app.listen(HTTP_PORT, () => {
  console.log("GBlockChain listening on port: ", HTTP_PORT);
});
// P2P Websocket Server
p2pServer.listen();
