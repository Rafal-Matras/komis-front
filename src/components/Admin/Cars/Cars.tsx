import React from "react";

import {AddCars} from "./AddCars";
import {DeleteCar} from "./DeleteCar";

import style from './Cars.module.css';

export const Cars = () => {

    return (
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
    )
}