import { config as env } from "https://deno.land/std@0.158.0/dotenv/mod.ts"
import { cron } from 'https://deno.land/x/deno_cron/cron.ts'
import { FtxClient } from "./src/exchanges/ftx/client.ts"
import { getStrategyInfo } from "./src/strategies/ogStrategy.ts"
export const VARIABLES = await env()


const ftxClient = new FtxClient(VARIABLES.FTX_API_KEY, VARIABLES.FTX_API_SECRET, VARIABLES.FTX_SUBACCOUNT)

console.log(await ftxClient.getAccountBalance())

// const data = {
//     "market": "BTC/USD",
//     "side": "buy",
//     "type": "market",
//     "size": 0.0011,
//     "price": null,
//     "reduceOnly": false,
// }
//
// console.log(await ftxClient.apiRequest('POST', '/orders', data))
// const data = await getStrategyInfo()
// console.log(data.signalDetails)
// console.log(data.signal)

// cron('00 */15 * * * *', async () => {
//     const data = await getStrategyInfo()
//     console.log(data.signalDetails)
//     console.log(data.signal)
// })
