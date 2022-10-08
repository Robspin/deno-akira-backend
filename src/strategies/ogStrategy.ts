import { config as env } from "https://deno.land/std@0.158.0/dotenv/mod.ts"
import { williamsFractals } from "../indicators/fractals.ts"
import { ichimoku } from "../indicators/ichimoku.ts"
import { FtxClient } from "../exchanges/ftx/client.ts"

export const VARIABLES = await env()

const exchange = new FtxClient(VARIABLES.FTX_API_KEY, VARIABLES.FTX_API_SECRET, VARIABLES.FTX_SUBACCOUNT)

export const getStrategyInfo = async () => {
    const fractals = await williamsFractals(VARIABLES.STRATEGY_FRACTAL_TIMEFRAME)
    const ichimokuSignal = await ichimoku(VARIABLES.STRATEGY_ICHIMOKU_TIMEFRAME)
    const { signal, signalDetails } = ichimokuSignal

    return { fractals, signal, signalDetails }
}


export const runStrategy = async () => {
    const { fractals, signal, signalDetails } = await getStrategyInfo()

    if (!signal) return
    const risk = VARIABLES.STRATEGY_RISK_PERCENTAGE
    // const accountBalance = exchange.getAccountBalance()


    switch (signal) {
        case 'LONG':

        case 'SHORT':

    }

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
}
