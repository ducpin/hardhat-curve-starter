import {ethers} from "hardhat"
import {CurveContractV2, CurveContractV2Factory, LiquidityGaugeFactory, StableSwap3PoolFactory} from "../lib/curvefi"
import {TestTokenFactory} from "../typechain"
import {expandDecimals, logDeployedContract, maxUint256, toEther} from "../test/shared/utilities"
import {threePoolFixture} from "../test/shared/fixtures";


async function main() {
	const signers = await ethers.getSigners()
	await threePoolFixture(signers[0])
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})