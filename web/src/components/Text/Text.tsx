import React, {useState, useEffect, FC} from "react"
import axios from "axios"
import "./Text.css"

interface TextProps{
    planetId: number;
}

interface PlanetResponse{
    planets_id:number,
    name:string,
    rotation_period: string,
    orbital_period:string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water:string,
    population:string,
    image_url:string,
}

interface PeopleData {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: Films[];
    species: Species[];
    vehicles: Vehicles[];
    starships: Starships[];
    image_url: string;
}

interface Films{
    title:string,
    opening_crawl:string,
    director:string,
    producer:string,
    release_date:string,
    image_url:string,
}

interface Species{
    name:string,
    classification:string,
    average_height:string,
    skin_colors:string,
    hair_color:string,
    eye_color:string,
    average_lifespan:string,
    homeworld:string,
    language:string
}

interface Vehicles {
    name:string,
    model:string,
    manufacturer:string,
    cost_in_credits:string,
    lenght:string,
    max_atmosphering_speed:string,
    crew:string,
    passengers:string,
    cargo_capacity:string,
    consumables:string,
    vehicle_class:string
}

interface Starships {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
}

const Text: FC<TextProps> = (props) => {
    
    const [peopleData, setPeopleData] = useState<PeopleData[]>()
    const [charging, setCharging] = useState<Boolean>(true)

    useEffect(() => {
        axios.get("http://localhost:8000/people/"+props.planetId).then((response) => {
            setPeopleData(response.data)
            setCharging(false)
        })
    }, [props.planetId])

    if(charging) return (<div className="textContainer">...charging data</div>)
    else return (
        <div className="textContainer">
            <div className="container">
                {peopleData && peopleData.map((person: PeopleData) => {
                    return (
                        <div className="personContainer">
                            <div className="imageAndName">
                                <img src={person.image_url} className="personImage"/>
                                <p className="personName">{person.name}</p>
                            </div>
                            <p>{}</p>
                            <div>
                                {person.films && person.films.map((film) => {
                                    return (
                                        <div></div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Text;