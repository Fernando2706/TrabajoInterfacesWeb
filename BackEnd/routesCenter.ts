// @ts-ignore
import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts"
// @ts-ignore
import { getPeople } from "./controllers/getPeople.ts"
// @ts-ignore
import { getPlanetName } from "./controllers/getPlanetName.ts"
// @ts-ignore
import { getStatus } from "./controllers/status.ts"

const router = new Router()

router.get("/status", getStatus)
router.get("/people/:ID", getPeople)
router.get("/planets/:NAME", getPlanetName)

export {router as default}