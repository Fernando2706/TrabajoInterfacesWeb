// @ts-ignore
import {Application} from 'https://deno.land/x/oak@v6.3.1/mod.ts'
import "https://deno.land/x/dotenv/load.ts"
// @ts-ignore
import { MongoClient } from "https://deno.land/x/mongo@v0.12.1/mod.ts"
// @ts-ignore
import router from "./routesCenter.ts"

const port: number = Number(Deno.env.get("PORT")) || 8000
const app: Application = new Application()

try{
    const DB_URL = Deno.env.get("DB_URL")
    const DB_NAME = Deno.env.get("DB_NAME")
  
    if (!DB_URL || !DB_NAME) {
      throw Error("Please define DB_URL and DB_NAME on .env file")
    }
  
    const client = new MongoClient()
    client.connectWithUri(DB_URL)
    const db = client.database(DB_NAME)
  
    app.use(async (ctx, next) => {
      ctx.state.db = db
      await next();
    });
  
    app.use(router.allowedMethods())
    app.use(router.routes())
  
    app.addEventListener("listen", () => {
        console.log(`Listening on: localhost:${port}`)
    })
  
    await app.listen({port: port})
  }catch(e){
    console.log(e)
  }