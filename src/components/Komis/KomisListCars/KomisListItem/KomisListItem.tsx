import React from "react";
import {SimpleCar} from "types";

import style from '../KomisListCars.module.css';

interface Props {
    id: number;
    car: SimpleCar;
    showFullCar: (el: string) => void;
}

export const KomisListItem = ({id, car, showFullCar}: Props) => {


    return (
        <tr className={style.body} style={{backgroundColor: car.reserved ? '#cc7d7d' : 'transparent'}}
            onClick={() => showFullCar(`${car.id}`)}>
            <td className={style.listId}>{id}</td>
            <td>{car.mark}</td>
            <td>{car.model}</td>
            <td>{car.type}</td>
            <td>{car.fuel}</td>
            <td className={style.listPrimary}>{car.yearProduction}</td>
            <td>{car.engineCapacity} L</td>
            <td>{car.power} KM</td>
            <td>{car.color}</td>
            <td>{car.mileage}</td>
            <td className={style.listSecondary}>{car.doers}</td>
            <td className={style.listSecondary}>{car.seats}</td>
            <td>{car.price}</td>
        </tr>
    )
}