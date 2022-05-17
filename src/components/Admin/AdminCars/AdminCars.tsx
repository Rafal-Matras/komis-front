import React, {useState} from "react";
import {CarsEdit} from 'types';

import {AdminCarsAdd} from "./AdminCarsAdd";
import {AdminCarsDelete} from "./AdminCarsDelete";

import style from './AdminCars.module.css';

export const AdminCars = () => {

    const [car, setCar] = useState<CarsEdit>({
        carMark: '',
        carModel: '',
        carEquipment: '',
        carFuel: '',
        carType: '',
    })

    const handleInputValue = (value: string, name: string) => {
        console.log('event--', value);
        console.log('name--', name)
        setCar(car => ({
            ...car,
            [name]: value
        }))
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <h2 className={style.title}>Dodaj</h2>
                <AdminCarsAdd
                    car={car.carMark}
                    name='carMark'
                    title='Marka'
                    change={handleInputValue}
                />
                <AdminCarsAdd
                    car={car.carModel}
                    name='carModel'
                    title='Model'
                    change={handleInputValue}
                />
                <AdminCarsAdd
                    car={car.carEquipment}
                    name='carEquipment'
                    title='Wyposażenie'
                    change={handleInputValue}
                />
                <AdminCarsAdd
                    car={car.carFuel}
                    name='carFuel'
                    title='Typ paliwa'
                    change={handleInputValue}
                />
                <AdminCarsAdd
                    car={car.carType}
                    name='carType'
                    title='Typ nadwozia'
                    change={handleInputValue}
                />
            </div>
            <div className={style.box}>
                <h2 className={style.title}>Usuń</h2>
                <AdminCarsDelete
                    name='carMark'
                    title='Marka'
                />
                <AdminCarsDelete
                    name='carModel'
                    title='Model'
                />
                <AdminCarsDelete
                    name='carEquipment'
                    title='Wyposażenie'
                />
                <AdminCarsDelete
                    name='carFuel'
                    title='Typ paliwa'
                />
                <AdminCarsDelete
                    name='carType'
                    title='Typ nadwozia'
                />
            </div>
        </div>
    )
}