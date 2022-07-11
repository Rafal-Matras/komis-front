import React from "react";
import {SimpleCar} from "types";

import style from '../CarsList.module.css';

interface Props {
    lp: number;
    car: SimpleCar;
    showFullCar: (el: string) => void;
}

export const Car = ({lp, car, showFullCar}: Props) => {

    return (
        <tr className={car.reserved.length > 1 ? style.bodyR : style.body}
            onClick={() => showFullCar(`${car.id}`)}
        >
            <td>{lp}</td>
            <td>{car.mark}</td>
            <td>{car.model}</td>
            <td>{car.type}</td>
            <td>{car.fuel}</td>
            <td>{car.yearProduction}</td>
            <td>{car.engineCapacity}</td>
            <td>{car.power}</td>
            <td>{car.color}</td>
            <td>{car.mileage}</td>
            <td>{car.doers}</td>
            <td>{car.seats}</td>
            <td>{car.price}</td>
        </tr>
    );
};