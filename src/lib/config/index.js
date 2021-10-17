const GDIFFICULTY = 2;
const GHTTP_PORT = 3000;
const gpeers = [];
const GP2P_PORT = 5001;
const GMINE_RATE = 3000; // milliseconds

const GINITIAL_BALANCE = 1000;
const GPOOL_BALANCE = 1000000;
const GTOKEN = "GABI";
const GMESSAGE_TYPE = {
  chain: "CHAIN",
  transaction: "TRANSACTION",
  clear_transactions: "CLEAR_TRANSACTIONS"
};
const GMINING_REWARD = 50;
const GBLOCKCHAIN_WALLET = "GWallet-0";

module.exports = {
  GDIFFICULTY,
  GHTTP_PORT,
  gpeers,
  GP2P_PORT,
  GMINE_RATE,
  GINITIAL_BALANCE,
  GTOKEN,
  GMESSAGE_TYPE,
  GMINING_REWARD,
  GBLOCKCHAIN_WALLET,
  GPOOL_BALANCE
};
