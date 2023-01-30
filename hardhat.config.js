require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
//import 'dotenv/config';

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
  solidity: "0.8.16",
  paths: {
    artifacts: "./metadata/artifacts",
    sources: "./contracts",
    cache: "./metadata/cache",
  },
  networks: {
    goerli: {
        url: "https://goerli.infura.io/v3/11f1469accbc473884fa50e686eef6cc",
        accounts:["d1150c6bf723bb8ebf95d8c4534f73a998357049b89e9208026d72ef8b468d76"] //0x712626e129FaE7753b0B515cF862e80F481f41f7
      },
    bsctest: {
      //url: "https://rough-soft-pool.bsc-testnet.discover.quiknode.pro/ca3b4c2f10f019903190e1e5fb32ce9a39c1c86d/",
      url:"https://bsc-testnet.public.blastapi.io",
      accounts:["d1150c6bf723bb8ebf95d8c4534f73a998357049b89e9208026d72ef8b468d76"]
    },
    
  },
  etherscan: {
    apiKey: '5X8PTH7UXXP1AANUF66I5WIYXH931KGB5I' //eth
    //apiKey:'E7W916YZYNZD5W9T4JXIMU38Q2Z2M8QTSI'  //bsc
  },
};
