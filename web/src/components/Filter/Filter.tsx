import React, {useState, useEffect, FC} from "react"
import "./Filter.css"

interface FilterProps {
    changeFilter: Function;
}

const Filter: FC<FilterProps> = (props) => {

    const[text,setText]= useState<string>("");

    return (
        <div className="filterContainer">
            <input type="text" className="inputText " placeholder="Busca un planeta..." onChange={(e)=>setText(e.target.value)}/>
            <button className="filterButton" onClick={(e)=>props.changeFilter(text)}>Buscar</button>
        </div>
    )
}

export default Filter;