// @ts-ignore
import { Database, Collection } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
// @ts-ignore
import type { IContext } from "../types.ts";
// @ts-ignore
import { PeopleSchema, PlanetsSchema, FilmsSchema, SpeciesSchema, VehicleSchema, StarshipsSchema } from "../types.ts"
// @ts-ignore
import { helpers } from "https://deno.land/x/oak@v6.3.1/mod.ts";

export const getPeople = async (ctx: IContext) => {
    try{
        const db: Database = ctx.state.db
        const peopleCollection: Collection<PeopleSchema> = db.collection<PeopleSchema>("PeopleCollection")
        const planetsCollection: Collection<PlanetsSchema> = db.collection<PlanetsSchema>("PlanetsCollection")
        const filmsCollection: Collection<FilmsSchema> = db.collection<FilmsSchema>("FilmsCollection")
        const speciesCollection: Collection<SpeciesSchema> = db.collection<SpeciesSchema>("SpeciesCollection")
        const vehiclesCollection: Collection<VehicleSchema> = db.collection<VehicleSchema>("VehiclesCollection")
        const starshipsCollection: Collection<StarshipsSchema> = db.collection<StarshipsSchema>("StarshipsCollection")

        const { ID } = helpers.getQuery(ctx, {mergeParams: true})

        const people: (PeopleSchema | null)[] = await peopleCollection.find({homeworld: Number(ID)})

        const parsedPeople = people.map(async (person) => {
            let homeworld: PlanetsSchema | null = await planetsCollection.findOne({planets_id: Number(ID)})

            let films: (FilmsSchema | null)[] = await filmsCollection.find({episode_id:{$in: person?.films}})
            if(films.length !== 0){
                films = films.map(film => {
                    if(film){
                        delete film["_id"]
                        delete film["characters"]
                        delete film["planets"]
                        delete film["species"]
                        delete film["starships"]
                        delete film["vehicles"]
                        delete film["episode_id"]
                    }
                    return film
                })
            }
            
            let index = person?.species
            let indexAux
            if(index) indexAux = index[0]
            else indexAux = -1
            let species: SpeciesSchema | null = await speciesCollection.findOne({species_id: indexAux})
            if(species) {
                delete species["_id"]
                delete species["people"]
                delete species["films"]
                delete species["species_id"]
            }

            let vehicles: (VehicleSchema | null)[] = await vehiclesCollection.find({vehicle_id: {$in: person?.vehicles}})
            if(vehicles.length !== 0){
                vehicles = vehicles.map(vehicle => {
                    if(vehicle){
                        delete vehicle["_id"]
                        delete vehicle["pilots"]
                        delete vehicle["films"]
                        delete vehicle["vehicle_id"]
                    }
                    return vehicle
                })
            }

            let starships: (StarshipsSchema | null)[] = await starshipsCollection.find({starship_id: {$in: person?.starships}})
            if(starships.length !== 0) {
                starships = starships.map(starship => {
                    if(starship){
                        delete starship["_id"]
                        delete starship["pilots"]
                        delete starship["films"]
                        delete starship["starship_id"]
                    }
                    return starship
                })
            }
            
            if(person!==null) {
                delete person["people_id"]
                delete person["_id"]
            }
            return {
                ...person,
                homeworld: (!homeworld) ? "Unknown" : homeworld.name,
                films:     (!films) ? "No films" : films,
                species:   (!species) ? "Unknown" : species,
                vehicles:  (!vehicles) ? "No vehicles" : vehicles,
                starships: (!starships) ? "No starships" : starships,
            }
        })

        ctx.response.status = 200;
        ctx.response.body = await Promise.all(parsedPeople)
    }catch(e) {
        ctx.response.status = 500
        ctx.response.body = `Unexpected Error: ${e.message}`
    }
}