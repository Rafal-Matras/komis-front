import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {stringifyUrl} from 'query-string';

import car from '../../images/porsche.png';

import style from './Login.module.css';

export const Login = () => {

    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [correct, setCorrect] = useState<boolean>(true);
    const navigate = useNavigate();


    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSend = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const URL = stringifyUrl({
            url: 'http://localhost:3001/login/?',
            query: {
                login: name,
                password: password,
            }
        })
        const response = await fetch(URL)
        const data = await response.json();

        if (!data.login) {
            setCorrect(false)
            return
        }
        if (data.passLength) {
            navigate('/set-password', {state: name})
            return
        }
        if (data.admin === 2) {
            navigate('/komis', {state: name})
            return
        }
        if (data.admin === 1) {
            navigate('/komis', {state: name})
            return
        } else {
            navigate('/komis', {state: name})
            return
        }
    }

    return (
        <div className={style.container}>
            <p
                className={style.p}
                style={{display: correct ? 'none' : 'flex'}}
            >
                Nieprawidłowe logowanie spróbuj jeszcze raz
            </p>
            <div className={style.box}>
                <img className={style.img} src={car} alt="zdjęcie samochodu porsche"/>
                <form className={style.form} onSubmit={handleSend}>
                    <input
                        type="text"
                        value={name}
                        className={style.input}
                        onChange={handleName}
                        placeholder='użytkownik'
                    />
                    <input
                        type="password"
                        value={password}
                        className={style.input}
                        onChange={handlePassword}
                        placeholder='hasło'
                    />
                    <button className={style.btn} type="submit">Zaloguj</button>
                </form>
            </div>
        </div>
    );
};