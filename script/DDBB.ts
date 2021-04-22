import {MongoClient} from "https://deno.land/x/mongo@v0.12.1/mod.ts"
import "https://deno.land/x/dotenv/load.ts"
import type { Database, Collection } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

interface SData {
    count:    number;
    next:     string|null;
    previous: null|string;
    results:  Array<{[key: string]: string | number | number[]| string[]}>;
}

interface PeopleSchema {
    people_id:  number;
    name:       string;
    height:     string;
    mass:       string;
    hair_color: string;
    skin_color: string;
    eye_color:  string;
    birth_year: string;
    gender:     string;
    homeworld:  number;
    films:      number[];
    species:    number[];
    vehicles:   number[];
    starships:  number[];
    image_url:  string;
}

interface PlanetsSchema {
    planets_id:      number;
    name:            string;
    rotation_period: string;
    orbital_period:  string;
    diameter:        string;
    climate:         string;
    gravity:         string;
    terrain:         string;
    surface_water:   string;
    population:      string;
    residents:       number[];
    films:           number;
    image_url:       string;
}

interface FilmsSchema {
    title:          string;
    episode_id:     number;
    opening_crawl:  string;
    director:       string;
    producer:       string;
    release_date:   string;
    characters:     number[];
    planets:        number[];
    starships:      number[];
    vehicles:       number[];
    species:        number[];
    image_url:      string;
}

interface SpeciesSchema {
    species_id: string;
    average_height:   string;
    average_lifespan: string;
    classification:   string;
    designation:      string;
    eye_colors:       string;
    hair_colors:      string;
    homeworld:        number;
    language:         string;
    name:             string;
    people:           number[];
    films:            number[];
    skin_colors:      string;
}

interface VehicleSchema {
    vehicle_id:             number;
    cargo_capacity:         string;
    consumables:            string;
    cost_in_credits:        string;
    crew:                   string;
    length:                 string;
    manufacturer:           string;
    max_atmosphering_speed: string;
    model:                  string;
    name:                   string;
    passengers:             string;
    pilots:                 number[];
    films:                  number[];
    vehicle_class:          string;
}

interface StarshipsSchema {
    starship_id:           number;
    MGLT:                   string;
    cargo_capacity:         string;
    consumables:            string;
    cost_in_credits:        string;
    crew:                   string;
    hyperdrive_rating:      string;
    length:                 string;
    manufacturer:           string;
    max_atmosphering_speed: string;
    model:                  string;
    name:                   string;
    passengers:             string;
    films:                  number[];
    pilots:                 number[];
    starship_class:         string;
}

const url = {
    people: "http://swapi.dev/api/people/",
    planets: "http://swapi.dev/api/planets/",
    films: "http://swapi.dev/api/films/",
    species: "http://swapi.dev/api/species/",
    vehicles: "http://swapi.dev/api/vehicles/",
    starships: "http://swapi.dev/api/starships/",
}

const fetchData = async (url: string): Promise<Array<{[key: string]: string | number | number[]|string[]}>> => {
    let response = await fetch(url)
    let data: SData = await response.json()
    let results = [...data.results]

    while(data.next) {
        response = await fetch(data.next)
        data = await response.json()
        results.push(...data.results)
    }

    return results
}

try{
    const dataPromises = [
        fetchData(url.people),
        fetchData(url.planets),
        fetchData(url.films),
        fetchData(url.species),
        fetchData(url.vehicles),
        fetchData(url.starships),
    ]
    const data = await Promise.all(dataPromises);

    const results = {
        people: data[0],
        planets: data[1],
        films: data[2],
        species: data[3],
        vehicles: data[4],
        starships: data[5]
    }

    const DB_URL = Deno.env.get("DB_URL");
    const DB_NAME = Deno.env.get("DB_NAME");

    if(!DB_URL || !DB_NAME){
        throw Error("Please define DB_URL and DB_NAME on .env file");
    }

    const client = new MongoClient();
    
    client.connectWithUri(DB_URL);
    const db: Database = client.database(DB_NAME);

    const peopleCollection: Collection<PeopleSchema> = db.collection<PeopleSchema>("PeopleCollection")
    const planetsCollection: Collection<PlanetsSchema> = db.collection<PlanetsSchema>("PlanetsCollection")
    const filmsCollection: Collection<FilmsSchema> = db.collection<FilmsSchema>("FilmsCollection")
    const speciesCollection: Collection<SpeciesSchema> = db.collection<SpeciesSchema>("SpeciesCollection")
    const vehiclesCollection: Collection<VehicleSchema> = db.collection<VehicleSchema>("VehiclesCollection")
    const starshipsCollection: Collection<StarshipsSchema> = db.collection<StarshipsSchema>("StarshipsCollection")

    await Promise.all([
        peopleCollection.deleteMany({}),
        planetsCollection.deleteMany({}),
        filmsCollection.deleteMany({}),
        speciesCollection.deleteMany({}),
        vehiclesCollection.deleteMany({}),
        starshipsCollection.deleteMany({}),
    ])

    const peopleToInsert: PeopleSchema[] = results.people.map((people: any, index:number) => {
        delete people["created"]
        delete people["edited"]
        delete people["url"]
        return {
            people_id: index+1,
            ...people,
            homeworld:  Number(people.homeworld.split("/").slice(-2)[0]),
            films:      (people.films as string[]).map(film => Number(film.split("/").slice(-2)[0])),
            species:    (people.species as string[]).map(species=>Number(species.split("/").slice(-2)[0])),
            vehicles:   (people.vehicles as string[]).map(vehicles=> Number(vehicles.split("/").slice(-2)[0])),
            starships:  (people.starships as string[]).map(starships=>Number(starships.split("/").slice(-2)[0])),
            image_url:  "https://fmaitsolutions.es/backend/people/"+people.name.replaceAll(" ","_")+".jpg",
        }
    });

    const planetsToInsert : PlanetsSchema[]=results.planets.map((planet:any, index:number)=>{
        delete planet["created"];
        delete planet["edited"];
        delete planet["url"];
        return{
            planets_id: index+1,
            ...planet,
            residents: (planet.residents as string[]).map(resident =>Number(resident.split("/").slice(-2)[0])),
            films:     (planet.films as string[]).map(film =>Number(film.split("/").slice(-2)[0])),
            image_url: "https://fmaitsolutions.es/backend/"+planet.name.replaceAll(" ","_")+".png",
        }
    });

    const filmsToInsert : FilmsSchema[]= results.films.map((films:any, index:number)=>{
        delete films["created"];
        delete films["edited"];
        delete films["url"];
        return{
            ...films,
            characters: (films.characters as string[]).map((character=>Number(character.split("/").slice(-2)[0]))),
            planets:    (films.planets as string[]).map((planet=>Number(planet.split("/").slice(-2)[0]))),
            species:    (films.species as string[]).map(species=>Number(species.split("/").slice(-2)[0])),
            vehicles:   (films.vehicles as string[]).map(vehicles=> Number(vehicles.split("/").slice(-2)[0])),
            starships:  (films.starships as string[]).map(starships=>Number(starships.split("/").slice(-2)[0])),
            image_url:  "",
        }
    })
    
    const speciesToInsert: SpeciesSchema[]= results.species.map((species:any, index:number)=>{
        delete species["created"];
        delete species["edited"];
        delete species["url"];
        return{
            species_id : index+1,
            ...species,
            people: (species.people as string[]).map(people=>Number(people.split("/").slice(-2)[0])),
            films:  (species.films as string[]).map(film =>Number(film.split("/").slice(-2)[0])),
        }
    });

    const vehiclesToInsert: VehicleSchema[]= results.vehicles.map((vehicle:any,index:number)=>{
        delete vehicle["created"];
        delete vehicle["edited"];
        delete vehicle["url"];
        return{
            vehicle_id : index+1,
            ...vehicle,
            pilots:      (vehicle.pilots as string[]).map(pilot=>Number(pilot.split("/").slice(-2)[0])),
            films:       (vehicle.films as string[]).map(film =>Number(film.split("/").slice(-2)[0])),

        }
    });

    const starshipToInsert: StarshipsSchema[]=results.starships.map((starships:any,index:number)=>{
        delete starships["created"];
        delete starships["edited"];
        delete starships["url"];
        return{
            starship_id:   index+1,
            ...starships,
            pilots:      (starships.pilots as string[]).map(pilot=>Number(pilot.split("/").slice(-2)[0])),
            films:       (starships.films as string[]).map(film =>Number(film.split("/").slice(-2)[0])),

        }
    })
    
    await Promise.all([
        peopleCollection.insertMany(peopleToInsert),
        planetsCollection.insertMany(planetsToInsert),
        filmsCollection.insertMany(filmsToInsert),
        speciesCollection.insertMany(speciesToInsert),
        vehiclesCollection.insertMany(vehiclesToInsert),
        starshipsCollection.insertMany(starshipToInsert)
    ])
    
}catch(e) {
    console.log(e)
}