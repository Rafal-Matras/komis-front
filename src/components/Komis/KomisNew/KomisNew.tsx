import React, {useState} from "react";

import style from './KomisNew.module.css';
import {carEquipments} from "../../../data/Data";

export const KomisNew = () => {

    const [equipment, setEquipment] = useState<boolean>(false);
    // const [carEquipments, setCarEquipments] = useState<string[]>([]);

    // useEffect(()=>{
    //     (async ()=>{
    //         const response = await fetch('http://localhost/cars/equipment');
    //         const data = await response.json();
    //
    //     })();
    // },[])

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
                    <option>Marka</option>
                </select>
                <select>
                    <option>Model</option>
                </select>
                <select>
                    <option>Typ nadwozia</option>
                </select>
                <select>
                    <option>Rodzaj paliwa</option>
                </select>
                <input type="number" min='1960' max={new Date().getFullYear()} placeholder='rok Produkcji'/>
                <input type="number" min='0.5' max='9' placeholder='Pojemność silnika'/>
                <input type="number" min='10' max='2000' placeholder='Ilość koni'/>
                <select>
                    <option value='none'>Skrzynia biegów</option>
                    <option value='automatic'>Automatyczna</option>
                    <option value='manual'>Manualna</option>
                </select>
                <input type="text" placeholder='Kolor'/>
                <input type="number" min='0' max='1500000' placeholder='Przebieg'/>
                <select>
                    <option value="dors">Ile dzwi</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select>
                    <option value="seats">Ile miejsc</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                <input type='number' placeholder='Cena'/>
                <input type='number' placeholder='Cena zakupu'/>
                <input type='text' placeholder='VIN'/>
                <input
                    type='text'
                    placeholder='Data następnego przeglądu'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                />
                <input
                    type='date'
                    placeholder='Data konca OC'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                />
                <input
                    type='date'
                    placeholder='Data zakupu'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                />
                <input type='text' placeholder='Numer umowy'/>
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
            <button className={style.btn}>Dodaj</button>
        </form>
    )
}