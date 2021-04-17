// @ts-ignore
import { Database, Collection } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
// @ts-ignore
import type { IContext } from "../types.ts";
// @ts-ignore
import { PlanetsSchema } from "../types.ts"
// @ts-ignore
import { helpers } from "https://deno.land/x/oak@v6.3.1/mod.ts";


export const getPlanetName = async (ctx: IContext) => {
    try{
        const db: Database = ctx.state.db
        const planetsCollection: Collection<PlanetsSchema> = db.collection<PlanetsSchema>("PlanetsCollection")

        const { NAME } = helpers.getQuery(ctx, {mergeParams: true})

        let planet: PlanetsSchema | null = await planetsCollection.findOne({name: NAME})
        if(planet){
            delete planet["_id"]
            delete planet["residents"]
            delete planet["films"]
        }

        ctx.response.status = 200
        ctx.response.body = planet
    }catch(e) {
        ctx.response.status = 500
        ctx.response.body = `Unexpected Error: ${e.message}`
    }
}