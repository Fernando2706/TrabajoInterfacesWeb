import React, {useState, useEffect, FC} from "react"
import axios from "axios"
import "./Text.css"
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/core";

interface TextProps{
    planetId: number;
    charging: boolean;
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

    const override = css`
        position: absolute;
        top: 400px;
        left: 1180px;
        z-index: 100;
        opacity: 0.6;
    `;

    useEffect(() => {
        if(props.planetId !== 0){
            axios.get("http://localhost:8000/people/"+props.planetId).then((response) => {
                setPeopleData(response.data)
            })
        }
    }, [props.planetId])

    if(props.planetId === 0 && props.charging) return <RingLoader color={"#f9d4ff"} css={override} size={100}/>
    else if(props.planetId === 0) return <div></div>
    else if(props.charging) return <RingLoader color={"#f9d4ff"} css={override} size={100}/>
    else return (
       <div className="textContainer">
           <div className="container">
               {peopleData && peopleData.map((person: PeopleData) => {
                   var personData: string = ""
                   if(person.height !== "n/a") personData += person.height + " centimeters tall, "
                   if(person.mass !=="n/a") personData += person.mass + " kg, "
                   if(person.hair_color !== "n/a") personData += person.hair_color + " hair color, "
                   if(person.eye_color !== "n/a") personData += person.eye_color + " eye color, "
                   if(person.skin_color !== "n/a") personData += person.skin_color + " skin color, "
                   if(person.birth_year !== "n/a") personData += person.birth_year + " is its birth year, "
                   if(person.gender !== "n/a") personData += " and " + person.gender + " gender."
                   else personData += " and has no gender."
                   return (
                       <div className="personContainer">
                           <div className="imageAndName">
                               <img src={person.image_url} className="personImage"/>
                               <p className="personName">{person.name}</p>
                           </div>
                           <p>{personData}</p>
                       </div>
                   )
               })}
           </div>
       </div>
    )
}

export default Text;