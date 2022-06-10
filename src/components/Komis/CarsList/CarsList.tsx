import React, {useEffect, useState} from "react";
import {SimpleCar} from "types";

import {CarsListContext} from '../../contexts/carsListContext';
import {config} from "../../../config/config";
import {FullCar} from "./FullCar/FullCar";
import {Car} from "./Car/Car";
import {Spinner} from "../../common/Spinner/Spinner";

import style from './CarsList.module.css';

interface Props {
    branch: string;
}

export const CarsList = ({branch}: Props) => {

    const [carsListC, setCarsListC] = useState('');
    const [cars, setCars] = useState<SimpleCar[]>([]);
    const [carId, setCarId] = useState<string>('');

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}cars/views/${branch}`);
            const data = await res.json();
            setCars(data);
        })();
    }, [carsListC]);

    const showFullCar = (el: string) => {
        setCarId(el);
    }

    const car = cars.map((car, index) => (
        <Car
            key={car.id}
            lp={index + 1}
            car={car}
            showFullCar={showFullCar}
        />
    ));

    return (
        <CarsListContext.Provider value={{carsListC, setCarsListC}}>

            <div className={style.container}>
                {carId === ''
                    ? cars.length < 1
                        ? <Spinner/>
                        : <table>
                            <thead className={style.tableHead}>
                            <tr className={style.head}>
                                <th>lp</th>
                                <th>Marka</th>
                                <th>Model</th>
                                <th>Typ nadwozia</th>
                                <th>Paliwo</th>
                                <th>Rok produkcji</th>
                                <th>Silnik</th>
                                <th>Moc</th>
                                <th>Kolor</th>
                                <th>Przebieg</th>
                                <th>Liczba dzwi</th>
                                <th>Ilość siedzeń</th>
                                <th>Cena</th>
                            </tr>
                            </thead>
                            <tbody className={style.tableBody}>
                            {car}
                            </tbody>
                        </table>

                    : <FullCar
                        carId={carId}
                        showFullCar={showFullCar}
                    />}
            </div>
        </CarsListContext.Provider>
    )
}
