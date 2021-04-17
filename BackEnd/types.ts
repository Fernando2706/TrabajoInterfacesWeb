// @ts-ignore
import { Context } from "https://deno.land/x/oak@v6.3.1/mod.ts"

export interface PeopleSchema {
    _id?: { $oid: string },
    people_id?:  number;
    name:       string;
    height:     string;
    mass:       string;
    hair_color: string;
    skin_color: string;
    eye_color:  string;
    birth_year: string;
    gender:     string;
    homeworld:  number;
    films?:      number[];
    species?:    number[];
    vehicles?:   number[];
    starships?:  number[];
    image_url:  string;
}

export interface PlanetsSchema {
    _id?: { $oid: string },
    planets_id?:      number;
    name:            string;
    rotation_period: string;
    orbital_period:  string;
    diameter:        string;
    climate:         string;
    gravity:         string;
    terrain:         string;
    surface_water:   string;
    population:      string;
    residents?:       number[];
    films?:           number;
    image_url:       string;
}

export interface FilmsSchema {
    _id?: { $oid: string },
    title:          string;
    episode_id?:     number;
    opening_crawl:  string;
    director:       string;
    producer:       string;
    release_date:   string;
    characters?:     number[];
    planets?:        number[];
    starships?:      number[];
    vehicles?:       number[];
    species?:        number[];
    image_url:      string;
}

export interface SpeciesSchema {
    _id?: { $oid: string },
    species_id?: number;
    average_height:   string;
    average_lifespan: string;
    classification:   string;
    designation:      string;
    eye_colors:       string;
    hair_colors:      string;
    homeworld:        number;
    language:         string;
    name:             string;
    people?:           number[];
    films?:            number[];
    skin_colors:      string;
}

export interface VehicleSchema {
    _id?: { $oid: string },
    vehicle_id?:             number;
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
    pilots?:                 number[];
    films?:                  number[];
    vehicle_class:          string;
}

export interface StarshipsSchema {
    _id?: { $oid: string },
    starship_id?:           number;
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
    films?:                  number[];
    pilots?:                 number[];
    starship_class:         string;
}

export type IContext = Context<Record<string, any>>