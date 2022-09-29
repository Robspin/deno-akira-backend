import { config as env } from "https://deno.land/std@0.158.0/dotenv/mod.ts";
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts"
import { app } from "./server.ts"

const VARIABLES = await env()

const config = {
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json; utf-8',
        'FTX-KEY': VARIABLES.FTX_API_KEY,
        'FTX-SUBACCOUNT': VARIABLES.FTX_SUBACCOUNT
    }
}

const now = Date.now()
config.headers['FTX-TS'] = now
const dataQueryString = now + 'GET' + '/api/subaccounts'
console.log(dataQueryString)
config.headers['FTX-SIGN'] = hmac('sha256', VARIABLES.FTX_API_SECRET, dataQueryString, 'utf8', 'hex')

const response = await fetch(`https://ftx.com/api/subaccounts`, { headers: config.headers })
console.log(response.status);  // e.g. 200
console.log(response.statusText); // e.g. "OK"
const jsonData = await response.json();
console.log(jsonData)
