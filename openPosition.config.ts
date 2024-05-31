import * as common from "@protocolink/common"

const usdcToken = new common.Token(
  8453,
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  6,
  "USDC",
  "USD Coin"
)

const cbEthToken = new common.Token(
  8453,
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
  18,
  "cbETH",
  "Coinbase Wrapped Staked ETH"
)

const ethToken = new common.Token(
  8453,
  "0x0000000000000000000000000000000000000000",
  18,
  "ETH",
  "Ethereum"
)

export const marketId = "ETH"
export const zapToken = usdcToken
export const zapAmount = "40"
export const collateralToken = cbEthToken
export const collateralAmount = "0.04"
export const debtToken = ethToken
export const slippage = 100
