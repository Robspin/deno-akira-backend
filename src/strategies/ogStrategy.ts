import { config as env } from "https://deno.land/std@0.158.0/dotenv/mod.ts"
import { williamsFractals } from "../indicators/fractals.ts"
import { ichimoku } from "../indicators/ichimoku.ts"
import { FtxClient } from "../exchanges/ftx/client.ts"

export const VARIABLES = await env()

const exchange = new FtxClient(VARIABLES.FTX_API_KEY, VARIABLES.FTX_API_SECRET, VARIABLES.FTX_SUBACCOUNT)

const getStrategyInfo = async () => {
    const fractals = await williamsFractals(VARIABLES.STRATEGY_FRACTAL_TIMEFRAME)
    const ichimokuSignal = await ichimoku(VARIABLES.STRATEGY_ICHIMOKU_TIMEFRAME)
    const { signal, signalDetails } = ichimokuSignal

    console.log(signalDetails)
    console.log('Signal: ', signal)

    return { fractals, signal, signalDetails }
}


export const runStrategy = async () => {
    const { fractals, signal, signalDetails } = await getStrategyInfo()
    const hasOpenPosition = await exchange.hasOpenPosition()

    console.log(await exchange.apiRequest('GET', '/positions'))

    if (!signal || hasOpenPosition) return
    const risk = Number(VARIABLES.STRATEGY_RISK_PERCENTAGE) / 100
    const accountBalance = await exchange.getAccountBalance()
    const sizeInDollars = Number((risk * accountBalance).toFixed(2))

    switch (signal) {
        case 'LONG':
            const res = await exchange.openPosition('buy', sizeInDollars)
            if (!res.success) return
            // setStop
        case 'SHORT':
            await exchange.openPosition('sell', sizeInDollars)
            if (!res.success) return
            // setStop
    }

    console.log(`Entered ${signal} position`)
}

// {
//     success: true,
//         result: {
//     id: 188758654285,
//         clientId: null,
//         market: "BTC-PERP",
//         type: "market",
//         side: "buy",
//         price: null,
//         size: 0.0005,
//         status: "new",
//         filledSize: 0,
//         remainingSize: 0.0005,
//         reduceOnly: false,
//         liquidation: null,
//         avgFillPrice: null,
//         postOnly: false,
//         ioc: true,
//         createdAt: "2022-10-08T16:51:00.883341+00:00",
//         future: "BTC-PERP"
// }

