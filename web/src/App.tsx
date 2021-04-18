import React from 'react';
import './App.css';
import Filter from'./components/Filter/Filter'
import Text from "./components/Text/Text"
import Planet from "./components/Planet/Planet"
import { useState } from 'react';

function App() {
  
  const [filter, setFilter] = useState<string>("")

  const changeFilter = (filter: string) => {
    setFilter(filter)
  }

  return (
    <div className="App">
      <Filter changeFilter={changeFilter}></Filter>
      {filter !== "" && <Planet filter={filter}></Planet>}
      {filter!==""&&<Text filter={filter}></Text>}
    </div>
  );
}

export default App;
