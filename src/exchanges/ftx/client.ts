import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts"

export class FtxClient {
    config: any
    private apiSecret: string

    constructor(apiKey: string, apiSecret: string, subAccount: string) {
        this.config = {
            baseUrl: 'https://ftx.com/api',
            timeout: 5000,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json; utf-8',
                'FTX-KEY': apiKey,
                'FTX-SUBACCOUNT': subAccount
            }
        }
        this.apiSecret = apiSecret
    }

    private makeSignature(method: string, url: string, params?: object) {
        const now = Date.now()
        this.config.headers['FTX-TS'] = now
        let dataQueryString = now + method + '/api' + url
        if (params) dataQueryString += JSON.stringify(params)
        console.log(dataQueryString)
        this.config.headers['FTX-SIGN'] = hmac('sha256', this.apiSecret, dataQueryString, 'utf8', 'hex')
    }

    async apiRequest(method: string, url: string, params?: object) {
        this.makeSignature(method, url, params)
        const body = JSON.stringify(params)

        const res = await fetch(`${this.config.baseUrl}${url}`, { method: method, headers: this.config.headers, body })

        return await res.json()
    }

    async hasOpenPosition() {
        const data = await this.apiRequest('GET', '/positions')
        return data.result.length > 0
    }

    async getAccountBalance() {
        const res = await this.apiRequest('GET', '/account')
        return res.result.totalAccountValue.toFixed(2)
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
