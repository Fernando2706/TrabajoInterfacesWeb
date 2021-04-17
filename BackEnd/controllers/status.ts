// @ts-ignore
import type { IContext } from "../types.ts";

export const getStatus = (ctx:IContext)=>{
    try {
        ctx.response.status=200;
        ctx.response.body="Server Online"
    } catch (error) {
        ctx.response.status=500;
        ctx.response.body=`Unexpected Error: ${error.message}`
    }
}