require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
    },
  },

  sepolia: {
    url: `https://sepolia.infura.io/v3/b1308fcadfcf4e49b317f74184bbcd03`,
    accounts: [
      `0166db2948aa539a5fb68e47f04e48e5eaef4ee8405dcae1677070fa9beb0a74`,
    ],
  },
};
