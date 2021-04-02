import React, {useContext, useState} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlask, faTrashAlt, faServer, faMapMarkerAlt, faLeaf, faQuestion} from "@fortawesome/free-solid-svg-icons";

import {storeContext} from "../store";

const Form = ({locations, numberForm, delSet}) => {
    const store = useContext(storeContext);
    const [locationID, setLocationID] = useState(1);
    const [envID, setEnvID] = useState(1);

    const handleLocation = (key, value) => {
        return locations[numberForm][key] = value
    }

    const handleDel = () => {
        delSet(true)
    }

    const handleLocationID = event => {
        const data = +event.target.options[event.target.selectedIndex].getAttribute("data-local-id")
        setLocationID(data )
        if (data !== 1)  {
            setEnvID(2)
            handleLocation('envID', 2)

        }
        handleLocation('locationID', data)
    }

    const handleEnvID = event => {
        const data = +event.target.options[event.target.selectedIndex].getAttribute("data-env-id")
        setEnvID(data)
        handleLocation('envID', data)
    }

    const handleComment = event => {
        handleLocation('hint', event.target.value)
    }

    const currentServer = () => {
        let arrServer = [];
        store.servers.forEach(function (server) {
            if (server["locationID"] === locationID && server["envID"] === envID)
                arrServer.push(server)
        })
        return arrServer
    }

    return (
        <div className={'container-form'}>
            <h3 className={'form-name'}>
                <FontAwesomeIcon icon={faFlask}/>
                Тестовая локация {numberForm + 1}</h3>
            <div className={'button-del'} onClick={handleDel}>
                <FontAwesomeIcon icon={faTrashAlt} color={"orange"}/>
            </div>
            <div className={"d-flex"}>
                <label htmlFor="location">Локация</label>
                <div className="d-relative">
                    <div className={'select-mark'}>
                        <FontAwesomeIcon icon={faMapMarkerAlt}/>
                    </div>
                    <select name="location" id="location" onChange={handleLocationID}>
                        {store.locations.map((value, index) => {
                            return <option value={value["name"]}
                                           key={`option-loc_${index}`}
                                           data-local-id={value["locationID"]}
                            >{value["name"]}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className={"d-flex"}>
                <label htmlFor="environment">Среда</label>
                <div className="d-relative">
                    <div className={'select-mark'}>
                        <FontAwesomeIcon icon={faLeaf}/>
                    </div>
                    <select name="environment" id="environment" onChange={handleEnvID}>
                        {store.envs.map((value, index) => {
                            return (locationID === 1 ?
                                <option value={value["name"]} key={`option-env_${index}`}
                                        data-env-id={value["envID"]}>{value["name"]}</option> :
                                (locationID === 2 || locationID === 3 || locationID === 4) && index === store.envs.length - 1 ?
                                    <option value={value["name"]} key={`option-env_${index}`}
                                            data-env-id={value["envID"]}>{value["name"]}</option> : null)
                        })}
                    </select>
                </div>
            </div>
            {/*TODO: - Сделать запятые при перечеслении*/}
            {/*     -   Удаление элементов*/}
            {/*     -   Правильный вывод в консоль и косметические изменения ну и код проверить*/}
            <div className={"d-flex"}>
                <div className={'container-server'}>
                    <p>Серверы:</p>
                    <div className={'list-server'}>

                        <FontAwesomeIcon icon={faServer}/>
                        {currentServer().map((value, index) => {
                            return (
                                currentServer().length !== index + 1 ?
                                    <div key={`option_${index}`}>
                                        {value["name"]},
                                    </div> :
                                    <div key={`option_${index}`}>
                                        {value["name"]}
                                    </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={"d-flex container-comment"}>
                <div>Подсказка</div>
                <div className="d-relative">
                    <div className={'select-mark'}>
                        <FontAwesomeIcon icon={faQuestion}/>
                    </div>
                    <input
                        placeholder={'Комментарий по локации'}
                        onChange={handleComment}
                    />
                </div>
            </div>
        </div>
    )
};

export default Form;