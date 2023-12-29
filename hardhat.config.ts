import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
require("hardhat-contract-sizer");
import dotenv from "dotenv";

dotenv.config();

const { PRIVATE_KEY, POLYGON_END_POINT, POLYGONSACN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [],
      chainId: 31337,
    },
    polygon_mumbai: {
      url: POLYGON_END_POINT,
      accounts: [PRIVATE_KEY !== undefined ? PRIVATE_KEY : ""],
    },
  },
};

export default config;
