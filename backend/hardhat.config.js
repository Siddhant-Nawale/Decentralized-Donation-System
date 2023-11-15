require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-goerli.g.alchemy.com/v2/rqYcnp9ldAcdjdRD9W4ntY7-lQXor1pR',
      accounts: ['11dd6384dd8e49c6383d60e74d0bc04ed45b5d70353fbe919f77939b9ebd548d'],
    },
  },
};