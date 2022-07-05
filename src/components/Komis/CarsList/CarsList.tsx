import React, {SetStateAction, useEffect, useState} from 'react';
import {SearchCar, SimpleCar} from 'types';

import {CarsListContext} from '../../contexts/carsListContext';
import {config} from '../../../config/config';
import {FullCar} from './FullCar/FullCar';
import {Car} from './Car/Car';
import {Button} from '../../common/Button/Button';

import style from './CarsList.module.css';

interface Props {
    branch: string;
    role: string;
    whereFromCarsList: string;
    searchResults?: SearchCar;
    goBack?: React.Dispatch<SetStateAction<boolean>>;
}

export const CarsList = ({branch, role, whereFromCarsList, searchResults, goBack}: Props) => {

    const [carsListContext, setCarsListContext] = useState('');
    const [cars, setCars] = useState<SimpleCar[]>([]);
    const [carId, setCarId] = useState<string>('');

    useEffect(() => {
        if (whereFromCarsList === 'list') {
            (async () => {
                const res = await fetch(`${config.URL}cars/views/${branch}`);
                const data = await res.json();
                if (data) {
                    setCars(data);
                }
            })();
        }
        if (whereFromCarsList === 'search') {
            (async () => {
                const res = await fetch(`${config.URL}cars/views-all`);
                const data = await res.json();
                searchCars(data);
            })();
        }
    }, [carsListContext]);

    const searchCars = (data: SimpleCar[]) => {
        if (searchResults) {
            const searchData = data
                .filter(el => searchResults.mark === 'select' ? el.mark : el.mark === searchResults.mark)
                .filter(el => searchResults.model === '' ? el.model : el.model === searchResults.model)
                .filter(el => searchResults.type === '' ? el.type : el.type === searchResults.type)
                .filter(el => searchResults.fuel === '' ? el.fuel : el.fuel === searchResults.fuel)
                .filter(el => searchResults.transmission === '' ? el.transmission === el.transmission : searchResults.transmission)
                .filter(el => searchResults.priceFrom === 0 ? el.price : el.price > searchResults.priceFrom)
                .filter(el => searchResults.priceTo === 0 ? el.price : el.price < searchResults.priceTo)
                .filter(el => searchResults.mileageFrom === 0 ? el.mileage : el.mileage > searchResults.mileageFrom)
                .filter(el => searchResults.mileageTo === 0 ? el.mileage : el.mileage < searchResults.mileageTo)
                .filter(el => searchResults.engineCapacityFrom === 0 ? el.engineCapacity : el.engineCapacity > searchResults.engineCapacityFrom)
                .filter(el => searchResults.engineCapacityTo === 0 ? el.engineCapacity : el.engineCapacity < searchResults.engineCapacityTo)
                .filter(el => searchResults.powerFrom === 0 ? el.power : el.power > searchResults.powerFrom)
                .filter(el => searchResults.powerTo === 0 ? el.power : el.power < searchResults.powerTo)
                .filter(el => searchResults.equipment.length === 0 ? el.equipment : (
                    searchResults.equipment.filter(eq => el.equipment.includes(eq)).join(';')
                ));
            setCars(searchData);
        }
    };

    const showFullCar = (el: string) => {
        setCarId(el);
    };

    const car = cars.length > 0
        ? cars.map((car, index) => (
            <Car
                key={car.id}
                lp={index + 1}
                car={car}
                showFullCar={showFullCar}
            />
        ))
        : null;

    return (
        <CarsListContext.Provider value={{carsListContext, setCarsListContext}}>
            <div className={style.container}>
                {carId === ''
                    ? cars.length < 1
                        ? searchResults
                            ? <div>
                                <h2 className={style.noResults}>Nie znaleziono pasującego Samochodu</h2>
                                <div className={style.btnBack}>
                                    <Button
                                        type="button"
                                        textName="powrót do wyszukiwarki"
                                        click={() => goBack && goBack(false)}
                                    />
                                </div>
                            </div>
                            : <h2 className={style.noResults}>Brak samochodów </h2>
                        : <div>
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

                            {whereFromCarsList === 'search'
                                ? <div className={style.btnBack}>
                                    <Button
                                        type="button"
                                        textName="powrót do wyszukiwarki"
                                        click={() => goBack && goBack(false)}
                                    />
                                </div>
                                : null
                            }
                        </div>
                    : <FullCar
                        role={role}
                        carId={carId}
                        showFullCar={showFullCar}
                    />}
            </div>
        </CarsListContext.Provider>
    );
};
