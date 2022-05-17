import React from "react";
import {carsFull} from "../../../../data/Data";

import style from './KomisFullCar.module.css';

interface Props {
    id: string
    showFullCar: (el: string) => void;
}

export const KomisFullCar = ({id, showFullCar}: Props) => {

    const car = carsFull.find(el => el.id === id);

    return (
        <div className={style.container}>
            <div className={style.carInfoBox}>
                <div className={style.box}><p>Marka:</p> <span>{car?.mark}</span></div>
                <div className={style.box}><p>Model:</p> <span>{car?.model}</span></div>
                <div className={style.box}><p>Typ nadwozia:</p> <span>{car?.type}</span></div>
                <div className={style.box}><p>Rodzaj paliwa:</p> <span>{car?.fuel}</span></div>
                <div className={style.box}><p>Rok produkcji:</p> <span>{car?.yearProduction}</span></div>
                <div className={style.box}><p>Silnik:</p> <span>{car?.engineCapacity}</span></div>
                <div className={style.box}><p>Ilość koni:</p> <span>{car?.power} KM</span></div>
                <div className={style.box}><p>Skrzynia biegów:</p> <span>{car?.transmission}</span></div>
                <div className={style.box}><p>Kolor:</p> <span>{car?.color}</span></div>
                <div className={style.box}><p>Przebieg:</p> <span>{car?.mileage} km</span></div>
                <div className={style.box}><p>Liczba dzwi:</p> <span>{car?.doers}</span></div>
                <div className={style.box}><p>Liczba miejsc:</p> <span>{car?.seats}</span></div>
                <div className={style.box}><p>Cena:</p> <span>{car?.price} zł</span></div>
                <div className={style.box}><p>Cena zakupu:</p> <span>{car?.pricePurchase} zł</span></div>
                <div className={style.box}><p>VIN:</p> <span>{car?.vin}</span></div>
                <div className={style.box}><p>Data kolejnego przeglądu:</p> <span>{car?.dateOverview}</span></div>
                <div className={style.box}><p>Data końca polisy OC:</p> <span>{car?.dateOC}</span></div>
                <div className={style.box}><p>Data zakupu:</p> <span>{car?.datePurchase}</span></div>
                <div className={style.box}><p>Wyposarzenie:</p></div>
                <div className={style.equipment}>{car?.equipment.map((el, index) => <p className={style.equipmentName}
                                                                                       key={index}>- {el}</p>)}</div>
                <div className={style.description}>
                    <p className={style.descriptionTitle}>Opis:</p>
                    <p className={style.descriptionText}> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Blanditiis molestias non obcaecati odio odit quasi ratione tempora. Dolorum eligendi facilis,
                        fugiat minima quasi ratione reprehenderit soluta vel. Animi aspernatur aut consectetur corporis
                        cum debitis deserunt, distinctio dolore ea eligendi enim esse et eveniet facilis, ipsum,
                        laudantium magnam necessitatibus officiis porro quae quas qui quisquam reprehenderit rerum
                        sapiente sequi totam! Dicta dolorem doloremque eligendi et ex facere, incidunt laudantium magnam
                        magni nemo quisquam reiciendis? Adipisci assumenda delectus dicta dolor, facilis, harum illo,
                        natus non repellat similique temporibus ut? Explicabo, mollitia quas. Magnam possimus qui
                        quisquam rem sed, velit voluptate? Ipsa, rerum. </p>
                </div>
            </div>
            <div className={style.menuBox}>
                <button className={style.btn}>Sprzedaj</button>
                <button className={style.btn}>{car?.reserved ? 'Odrezerwój' : 'Zarazerwój'}</button>
                <button className={style.btn}>Popraw</button>
                <button className={style.btn} onClick={() => showFullCar('')}>Powrót</button>
                {car?.reserved ?
                    <div className={style.reserved}><p>samochód zarezerwowany</p> <p>Imię nazwisko</p> <p>tel:</p>
                        <p>email:</p></div>
                    : null}
            </div>
        </div>
    )
}