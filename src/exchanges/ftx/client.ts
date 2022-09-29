import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts"

class FtxClient {
    instance: any
    fetchConfig: any

    constructor(apiKey, apiSecretKey, subaccount) {
        this.fetchConfig = {
            baseURL: 'https://ftx.com/api/',
            timeout: 5000,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json; utf-8',
                'FTX-KEY': apiKey,
                'FTX-SUBACCOUNT': subaccount
            }
        }
    }

    private makeSignature(method: string) {
        const now = Date.now()
        // const { data, params } = config
        let sign = now + method
    }
}
