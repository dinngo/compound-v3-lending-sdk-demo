import * as common from '@protocolink/common';

export const marketId = "USDbC"

export const zapToken = new common.Token(
  8453,
  "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
  6,
  "USDbC",
  "USD Base Coin"
)
export const zapAmount = "5"

export const collateralToken = new common.Token(
  8453,
  "0x0000000000000000000000000000000000000000",
  18,
  "ETH",
  "Ethereum"
)
export const collateralAmount = "0.001"

export const debtToken = new common.Token(
  8453,
  "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
  6,
  "USDbC",
  "USD Base Coin"
)

export const slippage = 100
