import React, {useEffect, useState} from "react";
import {SimpleCarEdit} from "types";
import {DeleteItems} from "../Cars/DeletePreferences/DeleteItems";
import {config} from "../../../config/config";
import {ChangeCarsEditContext} from "../../contexts/changeCarsEditContext";

import style from './CarsItems.module.css';

export const CarsItems = () => {

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
                    <DeleteItems
                        name='mark'
                        title='Marka'
                    />
                    <DeleteItems
                        name='model'
                        title='Model'
                        carMarks={carMarks}
                    />
                    <DeleteItems
                        name='equipment'
                        title='Wyposażenie'
                    />
                    <DeleteItems
                        name='fuel'
                        title='Typ paliwa'
                    />
                    <DeleteItems
                        name='type'
                        title='Typ nadwozia'
                    />
                </div>
                <div className={style.box}>
                    <h2 className={style.title}>Usuń</h2>
                    <DeleteItems
                        name='mark'
                        title='Marka'
                    />
                    <DeleteItems
                        name='model'
                        title='Model'
                        carMarks={carMarks}
                    />
                    <DeleteItems
                        name='equipment'
                        title='Wyposażenie'
                    />
                    <DeleteItems
                        name='fuel'
                        title='Typ paliwa'
                    />
                    <DeleteItems
                        name='type'
                        title='Typ nadwozia'
                    />
                </div>
            </div>
        </ChangeCarsEditContext.Provider>
    );
};
