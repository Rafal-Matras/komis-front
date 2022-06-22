import React, {useEffect, useState} from 'react';
import {SearchCar, SimpleCar} from 'types';

import {CarsListContext} from '../../contexts/carsListContext';
import {config} from '../../../config/config';
import {FullCar} from './FullCar/FullCar';
import {Car} from './Car/Car';
import {Spinner} from '../../common/Spinner/Spinner';

import style from './CarsList.module.css';

interface Props {
    branch: string;
    role: string;
    whereFromCarsList: string;
    searchResults?: SearchCar;
}

export const CarsList = ({branch, role, whereFromCarsList, searchResults}: Props) => {

    const [carsListC, setCarsListC] = useState('');
    const [cars, setCars] = useState<SimpleCar[]>([]);
    const [carId, setCarId] = useState<string>('');

    useEffect(() => {
        if (whereFromCarsList === 'list') {
            (async () => {
                const res = await fetch(`${config.URL}cars/views/${branch}`);
                const data = await res.json();
                setCars(data);
            })();
        }
        if (whereFromCarsList === 'search') {
            (async () => {
                const res = await fetch(`${config.URL}cars/views-all`);
                const data = await res.json();
                searchCars(data);
            })();
        }
    }, [carsListC]);

    const searchCars = (data: SimpleCar[]) => {
        if (searchResults) {
            const searchData = data
                .filter(el => searchResults.mark !== 'select' ? el.mark === searchResults.mark : el.mark)
                .filter(el => searchResults.model !== '' ? el.model === searchResults.model : el.model)
                .filter(el => searchResults.type !== '' ? el.type === searchResults.type : el.type)
                .filter(el => searchResults.fuel !== '' ? el.fuel === searchResults.fuel : el.fuel)
                .filter(el => searchResults.transmission !== '' ? el.transmission === searchResults.transmission : el.transmission)
                .filter(el => searchResults.priceFrom !== 0 ? el.price > searchResults.priceFrom : el.price)
                .filter(el => searchResults.priceTo !== 0 ? el.price < searchResults.priceTo : el.price)
                .filter(el => searchResults.mileageFrom !== 0 ? el.mileage > searchResults.mileageFrom : el.mileage)
                .filter(el => searchResults.mileageTo !== 0 ? el.mileage < searchResults.mileageTo : el.mileage)
                .filter(el => searchResults.engineCapacityFrom !== 0 ? el.engineCapacity > searchResults.engineCapacityFrom : el.engineCapacity)
                .filter(el => searchResults.engineCapacityTo !== 0 ? el.engineCapacity < searchResults.engineCapacityTo : el.engineCapacity)
                .filter(el => searchResults.powerFrom !== 0 ? el.power > searchResults.powerFrom : el.power)
                .filter(el => searchResults.powerTo !== 0 ? el.power < searchResults.powerTo : el.power);
            // .filter(el => searchResults.equipment.length > 0 ? el.equipment < searchResults.equipment : el.equipment)


            setCars(searchData);

        }
    };

    const showFullCar = (el: string) => {
        setCarId(el);
    };

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
                        ? searchResults
                            ? <h2 className={style.noResults}>Nie znaleziono pasującego Samochodu</h2>
                            : <Spinner/>
                        : <>
                            <table>
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
                        </>
                    : <FullCar
                        role={role}
                        carId={carId}
                        showFullCar={showFullCar}
                    />}
            </div>
        </CarsListContext.Provider>
    );
};
