import {CurveContractV2, CurveContractV2Factory, StableSwap3Pool, StableSwap3PoolFactory} from "../../lib/curvefi"
import {TestToken, TestTokenFactory} from "../../typechain"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {expandDecimals, logDeployedContract, maxUint256} from "./utilities";


export interface ThreePoolFixture {
	dai: TestToken,
	usdt: TestToken,
	usdc: TestToken,
	curve3CrvToken: CurveContractV2,
	stableSwap3Pool: StableSwap3Pool
}

export async function threePoolFixture(signer: SignerWithAddress): Promise<ThreePoolFixture> {

	let account = signer.address
	let testTokenFactory = new TestTokenFactory(signer)
	const factory = new CurveContractV2Factory(signer)
	let dai = await testTokenFactory.deploy()
	await dai.deployed();
	await dai.finalize("DAI", "DAI", 18, expandDecimals(100000, 18));
	logDeployedContract("DAI", dai)

	let usdc = await testTokenFactory.deploy()
	await usdc.deployed();
	await usdc.finalize("USDC", "USDC", 6, expandDecimals(100000, 6))
	logDeployedContract("USDC", usdc)

	let usdt = await testTokenFactory.deploy()
	await usdt.deployed();
	await usdt.finalize("USDT", "USDT", 6, expandDecimals(100000, 6))
	logDeployedContract("USDT", usdt)


	// If we had constructor arguments, they would be passed into deploy()
	let curve3CrvToken: CurveContractV2 = await factory.deploy("Curve.fi DAI/USDC/USDT", "3Crv", 18, 0)
	logDeployedContract("3Crv", curve3CrvToken);
	await curve3CrvToken.deployed();

	// new LiquidityGaugeFactory(wallet).deploy()
	let stableSwap3Pool = await new StableSwap3PoolFactory(signer).deploy(
		account, [dai.address, usdc.address, usdt.address], curve3CrvToken.address, 200, 4000000, 5000000000
	);
	await stableSwap3Pool.deployed();
	await curve3CrvToken.set_minter(stableSwap3Pool.address)
	logDeployedContract("stableSwap3Pool", stableSwap3Pool);
	await dai.approve(stableSwap3Pool.address, maxUint256)
	await usdt.approve(stableSwap3Pool.address, maxUint256)
	await usdc.approve(stableSwap3Pool.address, maxUint256)
	return {
		dai, usdt, usdc, curve3CrvToken, stableSwap3Pool
	}
}

