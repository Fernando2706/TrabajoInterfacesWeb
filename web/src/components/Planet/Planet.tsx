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
            setClassPlanet("planet slide-in-fwd-tl")
            setTimeout(() => {
                setCharging(false)
                props.changeCharging(false)
            }, 2200)
        }
    }, [data])

    if(charging) return (<div className="planetContainer"></div>)
    else return(
        <div>
            {data?.image_url&&
            <div className="planetContainer">
                <div className={classPlanet} style={{backgroundImage:"url("+data?.image_url+")", width: "450px", height: "450px", borderRadius: "100%"}}></div>
            </div>}
            {data?.image_url&&
                <div className="planetText"></div>
            }
            {data?.image_url&&
                <div className="rectangle"></div>
            }
            {data?.image_url&&
                <div className="planetTextInformation">
                    <div className="name">{data.name}</div>
                    <div className="information">
                        <div className="rotationPeriod">{"Rotation period: "+data.rotation_period}</div>
                        <div className="orbitalPeriod">{"Orbital period: "+data.orbital_period}</div>
                        <div className="climate">{"Climate: "+data.climate}</div>
                        <div className="diameter">{"Diameter: "+data.diameter}</div>
                        <div className="gravity">{"Gravity: "+data.gravity}</div>
                        <div className="terrain">{"Terrain: "+data.terrain}</div>
                        <div className="surfaceWater">{"Suface water: "+data.surface_water}</div>
                        <div className="population">{"Population: "+data.population}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Planet