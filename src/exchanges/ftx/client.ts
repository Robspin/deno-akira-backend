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

    private makeSignature(method: string, url: string) {
        const now = Date.now()
        this.config.headers['FTX-TS'] = now
        const dataQueryString = now + method + '/api' + url
        this.config.headers['FTX-SIGN'] = hmac('sha256', this.apiSecret, dataQueryString, 'utf8', 'hex')
    }

    async apiRequest(method: string, url: string, body?: object) {
        this.makeSignature(method, url)
        const response = await fetch(`${this.config.baseUrl}${url}`, { method: method, headers: this.config.headers })
        return await response.json()
    }

    async hasOpenPosition() {
        const data = await this.apiRequest('GET', '/positions')
        return data.result.length > 0
    }


}
