import { config as env } from "https://deno.land/std@0.158.0/dotenv/mod.ts";
import { FtxClient } from "./src/exchanges/ftx/client.ts"

const VARIABLES = await env()

// const config = {
//     headers: {
//         'accept': 'application/json',
//         'Content-Type': 'application/json; utf-8',
//         'FTX-KEY': VARIABLES.FTX_API_KEY,
//         'FTX-SUBACCOUNT': VARIABLES.FTX_SUBACCOUNT
//     }
// }

// const now = Date.now()
// config.headers['FTX-TS'] = now
// const dataQueryString = now + 'GET' + '/api/subaccounts'
// console.log(dataQueryString)
// config.headers['FTX-SIGN'] = hmac('sha256', VARIABLES.FTX_API_SECRET, dataQueryString, 'utf8', 'hex')

const ftxClient = new FtxClient(VARIABLES.FTX_API_KEY, VARIABLES.FTX_API_SECRET, VARIABLES.FTX_SUBACCOUNT)

console.log(await ftxClient.apiRequest('GET', '/subaccounts'))
