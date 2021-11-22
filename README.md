# GabiChain
### Lite Blockchain based on Node and Javascript
### Author: Amaury Chong Rodríguez

    Using Node.js, Javascript, CORS, Elliptic, Express, UUID, ws (for websocket).

## Development server

Run `npn run start` for a dev server. Use the `http://localhost:3000/` endpoint to consume services.
### To open several instances on same PC
```cmd
 set peers=ws://localhost:5001,ws://localhost:5002,ws://localhost:5003
 set P2P_PORT=5004
 set HTTP_PORT=3003
 npm run start
```