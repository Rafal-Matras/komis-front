import React, {useState} from "react";

import {KomisListItem} from "./KomisListItem/KomisListItem";
import {KomisFullCar} from "./KomisFullCar/KomisFullCar";
import {cars} from '../../../data/Data';

import style from './KomisListCars.module.css';

export const KomisListCars = () => {

    const [list, setList] = useState<string>('')

    const showFullCar = (el: string) => {
        setList(el);
    }

    const car = cars.map((car, index) => (
        <KomisListItem
            key={car.id}
            id={index + 1}
            car={car}
            showFullCar={showFullCar}
        />
    ));

    return (
        list === ''
            ? <div className={style.container}>
                <table className={style.table}>
                    <thead className={style.tableHead}>
                    <tr className={style.head}>
                        <th className={style.listId}>lp</th>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Typ nadwozia</th>
                        <th>Paliwo</th>
                        <th className={style.listPrimary}>Rok produkcji</th>
                        <th>Silnik</th>
                        <th>Moc</th>
                        <th>Kolor</th>
                        <th>Przebieg</th>
                        <th className={style.listSecondary}>Liczba dzwi</th>
                        <th className={style.listSecondary}>Ilość siedzeń</th>
                        <th>Cena</th>
                    </tr>
                    </thead>
                    <tbody>
                    {car}
                    </tbody>
                </table>
            </div>
            : <KomisFullCar
                id={list}
                showFullCar={showFullCar}
            />
    )
}