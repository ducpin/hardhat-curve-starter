import {Contract, BigNumber, BigNumberish} from 'ethers'
export const maxUint256 = BigNumber.from(2).pow(256).sub(1)
export const maxInt128 = BigNumber.from(2).pow(128).sub(1)
export function logDeployedContract(name: string, contract: Contract) {
	console.log(`Deployed contract:${name} address=${contract.address}, tx:${contract.deployTransaction.hash}`)
}

export function toWei(n: BigNumberish): BigNumber {
	return BigNumber.from(n).mul(BigNumber.from(10).pow(18))
}

export function toEther(n: BigNumberish): BigNumber {
	return BigNumber.from(n).div(BigNumber.from(10).pow(18))
}

export function expandDecimals(n: BigNumberish, decimals = 18): BigNumber {
	return BigNumber.from(n).mul(BigNumber.from(10).pow(decimals))
}

export function collapseDecimals(n: BigNumberish, decimals = 18): BigNumber {
	return BigNumber.from(n).div(BigNumber.from(10).pow(decimals))
}

export async function mineBlock(provider: any, timestamp: number): Promise<void> {
	await new Promise(async (resolve, reject) => {
		;(provider.sendAsync as any)(
			{jsonrpc: '2.0', method: 'evm_mine', params: [timestamp]},
			(error: any, result: any): void => {
				if (error) {
					reject(error)
				} else {
					resolve(result)
				}
			}
		)
	})
}