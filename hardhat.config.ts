import {config as dotEnvConfig} from "dotenv";

dotEnvConfig();

import {HardhatUserConfig} from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-typechain";
import 'hardhat-preprocessor';
// import "@nomiclabs/hardhat-vyper";

import {removeConsoleLog} from "hardhat-preprocessor";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const MNEMONIC = process.env.MNEMONIC;
const config: HardhatUserConfig = {
	defaultNetwork: "hardhat",
	solidity: {
		compilers: [
			{
				version: "0.6.8", settings: {}
			},
			{
				version: "0.6.12", settings: {}
			}
		],
	},
	// vyper: {
	// 	version: "0.2.4"
	// },
	networks: {
		hardhat: {},
		localhost: {},
		rinkeby: {
			url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
			accounts: {
				mnemonic: MNEMONIC
			},
		},
		kovan: {
			url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
			accounts: {
				mnemonic: MNEMONIC
			},
		},
		coverage: {
			url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
		},
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: ETHERSCAN_API_KEY,
	},
	typechain: {
		outDir: "typechain",
		target: "ethers-v5",
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts",
	},
	preprocess: {
		eachLine: removeConsoleLog((bre) => bre.network.name !== 'hardhat' && bre.network.name !== 'localhost'),
	},
};

export default config;
