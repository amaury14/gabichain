const webSocket = require("ws");
const GBlockChain = require("../blockchain");
const { gpeers, GP2P_PORT, GMESSAGE_TYPE } = require("../config");

const peers = process.env.PEERS ? process.env.PEERS.split(",") : gpeers;
const P2P_PORT = process.env.P2P_PORT || GP2P_PORT;

class GP2PServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.sockets = [];
  }

  listen() {
    const server = new webSocket.Server({ port: P2P_PORT });
    server.on("connection", (socket) => this.connectSocket(socket));
    this.connectToPeers();
    console.log(
      "GBlockChain peer to peer connections listening on port: ",
      P2P_PORT
    );
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("[🚀] Socket Connected");
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new webSocket(peer);
      socket.on("open", () => this.connectSocket(socket));
    });
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      switch (data.type) {
        case GMESSAGE_TYPE.chain:
          this.blockchain.replaceChain(data.payload);
          break;
        case GMESSAGE_TYPE.transaction:
          this.transactionPool.updateOrAddTransaction(data.payload);
          break;
        case GMESSAGE_TYPE.clear_transactions:
          this.transactionPool.clear();
          break;
      }
    });
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        type: GMESSAGE_TYPE.chain,
        payload: this.blockchain.gchain
      })
    );
  }

  sendTransaction(socket, transaction) {
    socket.send(
      JSON.stringify({
        type: GMESSAGE_TYPE.transaction,
        payload: transaction
      })
    );
  }

  syncChains() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }

  syncTransactions(transaction) {
    this.sockets.forEach((socket) => {
      this.sendTransaction(socket, transaction);
    });
  }

  broadcastClearTransactions() {
    this.sockets.forEach((socket) => {
      socket.send(
        JSON.stringify({
          type: GMESSAGE_TYPE.clear_transactions,
          payload: true
        })
      );
    });
  }
}

module.exports = GP2PServer;
