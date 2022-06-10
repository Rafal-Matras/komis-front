import React, {useState} from "react";

import {carEquipments} from "../../../data/Data";

import style from './Search.module.css';

export const Search = () => {

    const [equipment, setEquipment] = useState<boolean>(false)

    const equipmentList = equipment
        ? carEquipments.map(el => (
            <div className={style.checkBoxBox} key={el.id}>
                <label className={style.labelCheckBox}>{el.name}
                    <input className={style.inputCheckBox} type='checkbox' name={`${el.name}`}/>
                    <span className={style.markCheckBox}> </span>
                </label>
            </div>
        ))
        : null;

    const handleEquipment = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setEquipment(true);
    }

    const handleAddEquipments = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setEquipment(false);
    }


    return (
        <form className={style.container}>
            <div className={style.box}>
                <select>
                    <option>Typ nadwozia</option>
                </select>
                <select>
                    <option>Rodzaj paliwa</option>
                </select>
                <select>
                    <option>Marka</option>
                </select>
                <select>
                    <option>Model</option>
                </select>
                <input type="number" min='0' max='10000000' placeholder='Cena od'/>
                <input type="number" min='0' max='10000000' placeholder='Cena do'/>
                <input type="number" min='1960' max={new Date().getFullYear()} placeholder='rok produkcji od'/>
                <input type="number" min='1960' max={new Date().getFullYear()} placeholder='rok produkcji do'/>
                <input type="number" min='0' max='1500000' placeholder='Przebieg od'/>
                <input type="number" min='0' max='1500000' placeholder='Przebieg do'/>
                <input type="number" min='10' max='2000' placeholder='Konie mechaniczne od'/>
                <input type="number" min='10' max='2000' placeholder='Konie mechaniczne do'/>
                <input type="number" min='0.5' max='9' placeholder='pojemność silnika od'/>
                <input type="number" min='0.5' max='9' placeholder='pojemność silnika do'/>

                <select>
                    <option value='none'>Skrzynia biegów</option>
                    <option value='automatic'>Automatyczna</option>
                    <option value='manual'>Manualna</option>
                </select>
                <button
                    className={style.btnForm}
                    onClick={handleEquipment}
                >wyposarzenie
                </button>
            </div>
            <div className={equipment ? style.equipmentList : style.none}>
                <div className={style.equipmentListBox}>
                    {equipmentList}
                </div>
                <button className={style.btn} onClick={handleAddEquipments}>Dodaj</button>
            </div>
            <button className={style.btn}>Szukaj</button>
        </form>
    );
};