import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


import car from '../../images/porsche.png';
import {config} from "../../config/config";

import style from './Login.module.css';
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";

export const Login = () => {

    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [seePassword, setSeePassword] = useState(false);
    const [correct, setCorrect] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleSend = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const URL = `${config.URL}login/?login=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`
        const response = await fetch(URL);
        const data = await response.json();

        if (!data.login) {
            setCorrect(false)
            return
        }
        if (data.passLength) {
            navigate('/set-password', {state: name})
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
                style={{color: correct ? 'transparent' : '#de0000'}}
            >Nieprawidłowe logowanie spróbuj jeszcze raz
            </p>
            <div className={style.box}>
                <img className={style.img} src={car} alt=""/>
                <form className={style.form} onSubmit={handleSend}>
                    <div className={style.boxInput}>
                        <input
                            type="text"
                            value={name}
                            className={style.input}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='użytkownik'
                        />
                    </div>
                    <div className={style.boxInput}>
                        <input
                            type={seePassword ? 'text' : 'password'}
                            value={password}
                            className={style.input}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='hasło'
                        />
                        {seePassword
                            ? <BsFillEyeSlashFill className={style.icon} onClick={() => setSeePassword(false)}/>
                            : <BsFillEyeFill className={style.icon} onClick={() => setSeePassword(true)}/>

                        }
                    </div>
                    <button className={style.btn} type="submit">Zaloguj</button>
                </form>
            </div>
        </div>
    );
};