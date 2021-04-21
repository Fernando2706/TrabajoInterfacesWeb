import React, {useState, useEffect, FC} from "react"
import './Hologram.css'
import axios from "axios"

interface HologramProps {
    planetIndex: number;
    changeFilter: Function;
}

const Hologram: FC<HologramProps> = (props) => {

    const [data, setData] = useState<string>("")
    var [planetId, setPlanetId] = useState(1)

    useEffect(() => {
        axios.get("http://localhost:8000/planet/"+planetId).then((response) => {            
            setData(response.data)
        })
    }, [planetId])

    useEffect(() => {
        if(props.planetIndex !== 0) setPlanetId(props.planetIndex)
    }, [props.planetIndex])

    const changePlanetId = (num: number) => {
        if(planetId === 1 && num === -1) setPlanetId(60)
        else if(planetId === 60 && num === 1) setPlanetId(1)
        else setPlanetId(planetId += num)
    }

    return (
        <div className="hologramContainer">
            <p className="planetName">{data}</p>
            <div className="cono"></div>
            <div className="prev"></div>
            <div className="prevButton" onClick={(e) => changePlanetId(-1)}>&#10094;</div>
            <div className="next"></div>
            <div className="nextButton" onClick={(e) => changePlanetId(1)}>&#10095;</div>
            <div className="sphere" onClick={(e) => props.changeFilter(data)}></div>
        </div>
    )
}

export default Hologram