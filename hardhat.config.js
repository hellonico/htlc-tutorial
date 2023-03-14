require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
//import 'dotenv/config';

/**
* @type import('hardhat/config').HardhatUserConfig
*/

// Hardhat documentation
// https://docs.bnbchain.org/docs/hardhat-new/

// Alchemy documentation
// https://docs.alchemy.com/docs/choosing-a-web3-network
module.exports = {
  solidity: "0.8.16",
  paths: {
    artifacts: "./metadata/artifacts",
    sources: "./contracts",
    cache: "./metadata/cache"
  },
  networks: {
    goerli: {
        // https://dashboard.alchemy.com/apps/empp6stbw890phut
        url: "https://eth-goerli.g.alchemy.com/v2/PzslU0eo1O-jORjgIsVrfNmk3zm6X_36",
        // this is my metamask private key
        accounts:["13a33974b68392d0bf0bdb8839dc1393bdfc5b6ba5019e1245d12a7f802efe73"]
      },
    bsctest: {
      url:"https://bsc-testnet.public.blastapi.io",
      // this is my metamask private key
      accounts:["b44d27f5d9964bba73e3691b0afda88486d25f2a0b381be898de551775e4d974"]
    }
  },
  etherscan: {
    // https://etherscan.io/myapikey
    apiKey: 'ACVCD1DN2JYHNXX4DPEYCG5H4VBXNAWUU1' //  nico's
  }
};
