 const express = require('express');
 const bodyParser = require('body-parser');
 const GBlockChain = require('../blockchain');
 
 const HTTP_PORT = process.env.HTTP_PORT || 3000;
 const app = express();
 const bc = new GBlockChain();
 app.use(bodyParser.json())

 app.get('/blocks', (req, res) => {
    res.json(bc.gchain);
 });

 app.post('/mine', (req, res) => {
     console.log(req.body);
     const block = bc.addBlock(req.body.data);
     console.log(`New block added: ${block.toString()}`);
     res.redirect('/blocks');
 })

 app.listen(HTTP_PORT, () => {
     console.log('GBlockChain listening on port: ', HTTP_PORT);
 });