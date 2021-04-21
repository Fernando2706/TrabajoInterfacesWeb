 import React, {useState, useEffect, FC} from "react"
import "./Planet.css"
import axios from "axios"

interface PlanetProps{
    filter:string;
    changeIdPlanet: Function;
    changeCharging: Function;
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
        if(props.filter !== "") {
            props.changeCharging(true)
            if(charging===false){
                setClassPlanet("planet slide-out-bck-tr")
            }
            setTimeout(() => {
                axios.get("http://localhost:8000/planets/"+props.filter).then((response) =>{
                    setData(response.data)
                });
            }, 3000)
        }
    },[props.filter])

    useEffect(() => {
        if(data){
            props.changeIdPlanet(data?.planets_id)
            setCharging(false)
            setClassPlanet("planet slide-in-fwd-tl")
            setTimeout(() => props.changeCharging(false), 2200)
        }
    }, [data])

    if(charging) return (<div className="planetContainer"></div>)
    else return(
        <div>
            {data?.image_url&&
            <div className="planetContainer">
                <div className={classPlanet} style={{backgroundImage:"url("+data?.image_url+")", width: "450px", height: "450px", borderRadius: "100%"}}></div>
            </div>
            }
        </div>
    )
}

export default Planet