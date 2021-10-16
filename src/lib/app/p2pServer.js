const webSocket = require("ws");
const GBlockChain = require("../blockchain");

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const P2P_PORT = process.env.P2P_PORT || 5001;

class GP2PServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
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
      socket.on('message', message => {
        const data = JSON.parse(message);
        this.blockchain.replaceChain(data);
        console.log('🚀 ~ data', data);
      });
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.gchain));
  }

  syncChains() {
      this.sockets.forEach(socket => {
        this.sendChain(socket);
      });
  }
}

module.exports = GP2PServer;
