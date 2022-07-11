import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import car from '../../images/bugatti.png';
import {Info} from './Info/Info';
import {Button} from '../common/Button/Button';


import style from './Home.module.css';

export const Home = () => {

    const [openInfo, setOpenInfo] = useState(false);

    return (
        <div className={style.container}>
            <Button
                type="button"
                textName="Info"
                click={() => setOpenInfo(true)}
            />
            {openInfo && <Info
                closePopup={setOpenInfo}
            />}
            <div className={style.boxContainer}>
                <img className={style.img} src={car} alt=""/>
                <div className={style.textBox}>
                    <h1 className={style.h1}>Aplikacja</h1>
                    <h2 className={style.h2}>Komis Samochodowy</h2>
                </div>
            </div>
            <Link className={style.link} to="/login">Zaloguj się</Link>
        </div>
    );
};

