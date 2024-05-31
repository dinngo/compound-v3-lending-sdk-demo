import * as apisdk from '@protocolink/api';
import {
  collateralAmount,
  collateralToken,
  debtToken,
  marketId,
  zapAmount,
  zapToken,
} from './openPosition.config';
import * as common from '@protocolink/common';
import * as lending from '@protocolink/lending';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const readlineQuestion = (question: string) =>
  new Promise((resolve) => rl.question(question, (answer) => resolve(answer)))

// Step 1: Register the Compound V3 lending protocol and Paraswap V5 swapper
lending.Adapter.registerProtocol(lending.protocols.compoundv3.LendingProtocol)
lending.Adapter.registerSwapper(lending.swappers.paraswapv5.LendingSwapper)
console.log(
  "Step 1: Registered Compound V3 lending protocol, Paraswap V5 Swap protocol"
)

// Step 2: Initialize the lending adapter with the base chain ID
const chainId = common.ChainId.base
const adapter = new lending.Adapter(chainId)
console.log("Step 2: Initialized adapter with base chain ID")

const account = "0xa3C1C91403F0026b9dd086882aDbC8Cdbc3b3cfB"
const protocolId = "compound-v3"

;(async () => {
  // Step 3: Get the account's portfolio on the specified lending protocol and market
  await readlineQuestion(`Step 3: Press enter to get portfolio(${account}):`)
  const portfolio = await adapter.getPortfolio(account, protocolId, marketId)
  console.log(portfolio)

  // Step 4: Build Logics - open a position by providing collateral using a flash loan
  await readlineQuestion(
    "Step 4: Press enter to build logics by call openByCollateral:"
  )
  const { logics } = await adapter.openByCollateral({
    account,
    portfolio,
    zapToken,
    zapAmount,
    collateralToken,
    collateralAmount,
    debtToken,
  })
  console.log(logics, JSON.stringify(logics, null, 2))

  // Step 5: Estimate the required funds, balances, approvals, permit data, and fees for the transaction
  await readlineQuestion(
    "Step 5: Press enter to estimate and get initial funds, approvals"
  )
  const routerData: apisdk.RouterData = { chainId, account, logics }
  const estimateResult = await apisdk.estimateRouterData(routerData, {
    permit2Type: "approve",
  })
  const { funds, approvals, permitData } = estimateResult
  console.log("---funds---", funds)
  console.log("---approvals---", approvals)
  console.log("---permitData---", permitData)

  // Step 5-1: Execute the required approvals (optional)
  // const signer = provider.getSigner(account);
  // for (const approval of estimateResult.approvals) {
  //   const tx = await signer.sendTransaction(approval);
  // }

  // step 5-2: Sign the permit data (optional)
  // const signer = provider.getSigner(account)
  // const permitSig = await signer._signTypedData(
  //   permitData.domain,
  //   permitData.types,
  //   permitData.values
  // )
  // routerData.permitData = estimateResult.permitData;
  // routerData.permitSig = permitSig;

  // Step 6: Build the transaction request for executing the position open operation
  await readlineQuestion("Step 6: Press enter to build transaction request")
  const transactionRequest = await apisdk.buildRouterTransactionRequest(
    routerData
  )
  console.log(JSON.stringify(transactionRequest))

  // Step 7: send transaction
  await readlineQuestion(
    "Step 7: And now you can send the transaction by using the above result"
  )
  // const signer = provider.getSigner(account)
  // const tx = await signer.sendTransaction(transactionRequest)
})()
