import { config as env } from "https://deno.land/std@0.158.0/dotenv/mod.ts"
import { cron } from 'https://deno.land/x/deno_cron/cron.ts'
import { runStrategy } from "./src/strategies/ogStrategy.ts"
export const VARIABLES = await env()

await runStrategy()

cron('00 */15 * * * *', async () => {
})
