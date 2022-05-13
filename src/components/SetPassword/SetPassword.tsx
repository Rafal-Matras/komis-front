import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import car from '../../images/ferrari.png';

import style from './SetPassword.module.css';

export const SetPassword = () => {

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [correct, setCorrect] = useState<boolean>(true);
    const [errorPassword, setErrorPassword] = useState<string>('')
    const navigate = useNavigate();
    const location = useLocation();
    const passwordValidation = new RegExp("^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$");

    useEffect(() => {
        if (location.state === null) {
            navigate('/login')
        }
    }, [location.state, navigate])

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const handleSetPassword = async (e: React.SyntheticEvent) => {
        e.preventDefault();


        if (password === '' || confirmPassword === '') {
            setErrorPassword('hasła nie mogą być puste')
            setCorrect(false);
            return
        }
        if (password !== confirmPassword) {
            setErrorPassword('hasła muszą być takie same')
            setCorrect(false);
            return
        }
        if (!passwordValidation.test(password)) {
            setErrorPassword(`nie spełniono warunków`)
            setCorrect(false);
            return
        }

        await fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({login: location.state, password: password})

        })
        navigate('/login');
    };

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Utwórz nowe hasło</h1>
            <div className={style.box}>
                <img className={style.img} src={car} alt="zdjęcie samochodu porsche"/>
                <form className={style.form} onSubmit={handleSetPassword}>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePassword}
                        className={style.input}
                        placeholder='nowe hasło'
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        className={style.input}
                        placeholder='powtórz hasło'
                    />
                    <p className={style.p} style={{display: correct ? 'none' : 'block'}}>{errorPassword}</p>
                    <button className={style.btn} type='submit'>Zaloguj</button>
                </form>
            </div>
            <p className={style.info}>* hasło powinno mieć co najmniej 8 znaków zawierać dużą i małą literę cyfrę oraz
                znak specjalny</p>
        </div>
    );
};