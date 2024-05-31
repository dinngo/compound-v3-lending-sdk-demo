import * as apisdk from "@protocolink/api"
import {
  collateralAmount,
  collateralToken,
  debtToken,
  marketId,
  zapAmount,
  zapToken,
} from "./openPosition.config"
import * as common from "@protocolink/common"
import * as lending from "@protocolink/lending"

// step 1: Register lending protocol and swapper
lending.Adapter.registerProtocol(lending.protocols.compoundv3.LendingProtocol)
lending.Adapter.registerSwapper(lending.swappers.paraswapv5.LendingSwapper)

// step 2: Initialze adapter with chainId
const chainId = common.ChainId.base
const adapter = new lending.Adapter(chainId)

const account = "0xa3C1C91403F0026b9dd086882aDbC8Cdbc3b3cfB"
const protocolId = "compound-v3"

;(async () => {
  // step 3: Get account's protfolio, you will need to pass the `protfolio` to each operation
  const portfolio = await adapter.getPortfolio(account, protocolId, marketId)
  console.log("---portfolio---", portfolio)

  // step 4: Open By Collateral enables users to achieve the desired collateral exposure in a single step by using a flash loan.
  const { afterPortfolio, logics } = await adapter.openByCollateral({
    account,
    portfolio,
    zapToken,
    zapAmount,
    collateralToken,
    collateralAmount,
    debtToken,
  })

  console.log("---afterPortfolio---", afterPortfolio)
  console.log("---logics---", JSON.stringify(logics, null, 2))

  const routerData: apisdk.RouterData = {
    chainId,
    account,
    logics,
  }

  // step 5: Estimate Router Data
  //   estimate how much funds will be spent (funds) and how many balances will be obtained (balances) from this transaction.
  //   It will also identify any approvals that the user needs to execute (approvals) before the transaction.
  const estimateResult = await apisdk.estimateRouterData(routerData, {
    permit2Type: "approve",
  })
  const { funds, balances, approvals, permitData, fees } = estimateResult
  console.log("---funds---", funds)
  console.log("---balances---", balances)
  console.log("---approvals---", approvals)
  console.log("---permitData---", permitData)
  console.log("---fees---", fees)

  // step 5-1: Approvals (optional)
  // const signer = provider.getSigner(account);
  // for (const approval of estimateResult.approvals) {
  //   const tx = await signer.sendTransaction(approval);
  // }

  // step: PermitData (optional)
  // const signer = provider.getSigner(account)
  // const permitSig = await signer._signTypedData(
  //   permitData.domain,
  //   permitData.types,
  //   permitData.values
  // )
  // routerData.permitData = estimateResult.permitData;
  // routerData.permitSig = permitSig;

  // step 6: Build Router Transaction
  const transactionRequest = await apisdk.buildRouterTransactionRequest(
    routerData
  )
  console.log(JSON.stringify(transactionRequest))

  // step 7: send transaction
  // const signer = provider.getSigner(account)
  // const tx = await signer.sendTransaction(transactionRequest)
})()
