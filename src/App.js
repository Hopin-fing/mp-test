import React, { useContext, useState } from "react";

import { observer } from "mobx-react-lite";
import { storeContext } from "./store";
import Form from "./Components/Form";
import {faExclamation, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function App() {
  return (
    <div className="App">
      <TestLocationsList />
    </div>
  );
}

const TestLocationForm = observer(function TestLocationForm({locations, numberFrom, removeForm}) {
  const store = useContext(storeContext);
  const [delForm, setDelForm] = useState(false)

    // removeForm(locations.slice(0, 1))
    // console.log(locations)

    // if(!delForm) removeForm([...locations].slice(numberFrom))


    if (!store.isLoaded) {
    return <div>Данные не загружены</div>;
  }
  return  (!delForm ?<Form locations={locations} numberForm={numberFrom}
               delSet={setDelForm}
  /> : null)
});

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState([{locationID: 1, envID: 1, hint: ""}]);


  return (
    <>
      {locationsList.map((location, index) => {
         return <TestLocationForm locations = {locationsList} numberFrom = {index} removeForm = {setLocationsList} key={`location-${index}` }/>
      })}
      <div className={'container-btn'}>
          <button
              className={"btn btn-blue"}
            onClick={() => {
              setLocationsList([...locationsList, {locationID: 1, envID: 1, hint: ""}]);
            }}
          >
              <FontAwesomeIcon icon={faPlus} color={"blue"} />Добавить тестовую локацию
          </button>
          <button
              className={"btn btn-green"}
              onClick={() => {
              console.log(locationsList);
            }}
          >
              <FontAwesomeIcon icon={faExclamation} color={"green"} /> Вывести результат в консоль
          </button>
      </div>
    </>
  );
};
