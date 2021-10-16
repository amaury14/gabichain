 const express = require('express');
 const GBlockChain = require('../blockchain');
 const HTTP_PORT = process.env.HTTP_PORT || 3000;
 const app = express();
 const bc = new GBlockChain();

 app.get('/blocks', (req, res) => {
    res.json(bc.gchain);
 });

 app.listen(HTTP_PORT, () => {
     console.log('GBlockchain listening on port: ', HTTP_PORT);
 });