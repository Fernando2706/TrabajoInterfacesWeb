 import React, {useState, useEffect, FC} from "react"
import "./Planet.css"
import axios from "axios"

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
    const [classPlanet, setClassPlanet] = useState<string>("planet slide-in-fwd-tl")

    useEffect(()=>{
        if(charging===false){
            setClassPlanet("planet slide-out-bck-tr")
        }
        setTimeout(() => {
            axios.get("http://localhost:8000/planets/"+props.filter).then((response) =>{
                setData(response.data)
            });
        }, 3000)
    },[props.filter])

    useEffect(() => {
        if(data !== null){
            setCharging(false)
            setClassPlanet("planet slide-in-fwd-tl")
            console.log(data)
        }
    }, [data])

    if(charging) return (<div className="planetContainer">...charging data</div>)
    return(
        <div className="planetContainer">
            <div className={classPlanet}></div>
        </div>
    )
}

export default Planet