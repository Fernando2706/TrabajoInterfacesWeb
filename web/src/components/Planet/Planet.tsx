import React, {useState, useEffect, FC} from "react"
import "./Planet.css"
import axios from "axios"
import compact from "lodash/compact"

interface PlanetProps{
    filter:string
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

const Planet: FC<PlanetProps> = (props)=>{

    const [data, setData] = useState<PlanetResponse>()
    const [charging, setCharging] = useState<Boolean>(true)
    const [move, setMove] = useState<Boolean>(false)

    const classPlanet = compact([
        "planet",
        move ? "planet slide-out-bck-tr" : "",
    ]).join(" ")

    useEffect(()=>{
        if(charging===false){
            setMove(true)
        }
        axios.get("http://localhost:8000/planets"+props.filter).then((response) =>{
            setData(response.data)
        });
    },[props.filter])

    useEffect(() => {
        if(data !== null){
            setMove(false)
            setCharging(false)
        }
    }, [data])

    if(charging) return (<div className="planetContainer">...charging data</div>)
    return(
        <div className="planetContainer">
            <img src="https://jkhub.org/wiki/images/0/01/Tatooine.png" className={classPlanet}/>
        </div>
    )
}

export default Planet