import { config as env } from "https://deno.land/std@0.158.0/dotenv/mod.ts";
import { FtxClient } from "./src/exchanges/ftx/client.ts"
import { williamsFractals } from "./src/indicators/fractals.ts"
import { ichimoku } from "./src/indicators/ichimoku.ts"

const VARIABLES = await env()

const ftxClient = new FtxClient(VARIABLES.FTX_API_KEY, VARIABLES.FTX_API_SECRET, VARIABLES.FTX_SUBACCOUNT)

console.log(await ichimoku('4h'))

// console.log(await ftxClient.apiRequest('GET', '/markets/BTC-PERP'))
