import React from 'react';
import './App.css';
import Filter from'./components/Filter/Filter'
import Text from "./components/Text/Text"
import Planet from "./components/Planet/Planet"
import Hologram from "./components/Hologram/Hologram"
import { useState } from 'react';

function App() {
  
  const [filter, setFilter] = useState<string>("")
  const [planetId, setPlanetID] = useState<number>(0)
  const [charging, setCharging] = useState<boolean>(false)

  const changeFilter = (filter: string) => {
    setFilter(filter)
  }

  const changeIdPlanet = (id: number) => {
    setPlanetID(id)
  }

  const changeCharging = (change: boolean) => {
    setCharging(change)
  }
  
  return (
    <div >
      <Filter changeFilter={changeFilter}></Filter>
      {filter !== "" && <Planet filter={filter} changeIdPlanet={changeIdPlanet} changeCharging={changeCharging}></Planet>}
      {filter !== "" && <Text planetId={planetId} charging={charging}></Text>}
      <Hologram planetIndex={planetId} changeFilter={changeFilter}/>
      <div className="spacecraft"></div>
      <div className="deathStar"></div>
      <div className="planetBackground"></div>
      <div className="spaceBackground"></div>
      <div className="windowSpacecraft"></div>
    </div>
  );
}

export default App;
