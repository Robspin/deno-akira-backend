import { config as env } from "https://deno.land/std@0.158.0/dotenv/mod.ts"
import { cron } from 'https://deno.land/x/deno_cron/cron.ts'
import { FtxClient } from "./src/exchanges/ftx/client.ts"
import { getStrategyInfo } from "./src/strategies/ogStrategy.ts"
export const VARIABLES = await env()


// const ftxClient = new FtxClient(VARIABLES.FTX_API_KEY, VARIABLES.FTX_API_SECRET, VARIABLES.FTX_SUBACCOUNT)
//
// console.log(await ftxClient.hasOpenPosition())

cron('00 * * * * *', async () => {
    const data = await getStrategyInfo()
    console.log(data.signalDetails)
})
