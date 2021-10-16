 const express = require('express');
 const bodyParser = require('body-parser');
 const GBlockChain = require('../blockchain');
 const GP2PServer = require('./p2pServer');
const { GHTTP_PORT } = require('../config');
 
 const HTTP_PORT = process.env.HTTP_PORT || GHTTP_PORT;
 const app = express();
 const bc = new GBlockChain();
 const p2pServer = new GP2PServer(bc);
 app.use(bodyParser.json())

 app.get('/blocks', (req, res) => {
    res.json(bc.gchain);
 });

 app.post('/mine', (req, res) => {
     const block = bc.addBlock(req.body.data);
     console.log(`New block added: ${block.toString()}`);
     p2pServer.syncChains();
     res.redirect('/blocks');
 })

 app.listen(HTTP_PORT, () => {
     console.log('GBlockChain listening on port: ', HTTP_PORT);
 });
// P2P Websocket Server
 p2pServer.listen();