import React, {useEffect, useState} from "react";
import {SimpleCarEdit} from "types";

import {AddCars} from "./AddCars";
import {DeleteCar} from "./DeleteCar";
import {config} from "../../../config/config";
import {ChangeCarsEditContext} from "../../contexts/changeCarsEditContext";

import style from './Cars.module.css';

export const Cars = () => {

    const [changeCarItem, setChangeCarItem] = useState('');
    const [carMarks, setCarMarks] = useState<SimpleCarEdit[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}cars/edit/all`);
            const data = await res.json();
            setCarMarks(data);
        })();

    }, [changeCarItem]);

    return (
        <ChangeCarsEditContext.Provider value={{changeCarItem, setChangeCarItem}}>

            <div className={style.container}>
                <div className={style.box}>
                    <h2 className={style.title}>Dodaj</h2>
                    <AddCars
                        name='mark'
                        title='Marka'
                    />
                    <AddCars
                        name='model'
                        title='Model'
                        carMarks={carMarks}
                    />
                    <AddCars
                        name='equipment'
                        title='Wyposażenie'
                    />
                    <AddCars
                        name='fuel'
                        title='Typ paliwa'
                    />
                    <AddCars
                        name='type'
                        title='Typ nadwozia'
                    />
                </div>
                <div className={style.box}>
                    <h2 className={style.title}>Usuń</h2>
                    <DeleteCar
                        name='mark'
                        title='Marka'
                    />
                    <DeleteCar
                        name='model'
                        title='Model'
                        carMarks={carMarks}
                    />
                    <DeleteCar
                        name='equipment'
                        title='Wyposażenie'
                    />
                    <DeleteCar
                        name='fuel'
                        title='Typ paliwa'
                    />
                    <DeleteCar
                        name='type'
                        title='Typ nadwozia'
                    />
                </div>
            </div>
        </ChangeCarsEditContext.Provider>
    );
};
