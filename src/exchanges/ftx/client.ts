import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts"

export class FtxClient {
    private readonly apiSecret: string
    config: any

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

    async getAccountBalance() : Promise<number> {
        const res = await this.apiRequest('GET', '/account')
        return res.result.totalAccountValue.toFixed(2)
    }

    async openPosition(side: 'buy' | 'sell', size: number) {
        const currentFuture = await this.apiRequest('GET', '/futures/BTC-PERP')
        const convertedSize = size / currentFuture.result.last

        const data = {
            'market': 'BTC-PERP',
            'type': 'market',
            'price': null,
            'reduceOnly': false,
            size: convertedSize,
            side
        }

        return await this.apiRequest('POST', '/orders', data)
    }

    async placeStopLoss(price: number) {
        const res = await this.apiRequest('GET', '/positions')
        const positionSize = res.result[0].size

        // const data = {
        //     'market': 'BTC-PERP',
        //     'type': 'market',
        //     'price': null,
        //     'reduceOnly': true,
        //     size: positionSize,
        //     side
        // }
    }
}
