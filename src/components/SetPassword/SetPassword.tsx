import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";

import {config} from "../../config/config";
import car from '../../images/ferrari.png';

import style from './SetPassword.module.css';

export const SetPassword = () => {

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
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

        await fetch(`${config.URL}login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({login: location.state, password: password}),
        });
        navigate('/login');
    };
    console.log(location.state)
    console.log(password)

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Utwórz nowe hasło</h1>
            <div className={style.box}>
                <img className={style.img} src={car} alt=""/>
                <form className={style.form} onSubmit={handleSetPassword}>
                    <div className={style.boxInput}>
                        <input
                            type={seePassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={style.input}
                            placeholder='nowe hasło'
                        />
                        {seePassword
                            ? <BsFillEyeSlashFill className={style.icon} onClick={() => setSeePassword(false)}/>
                            : <BsFillEyeFill className={style.icon} onClick={() => setSeePassword(true)}/>

                        }
                    </div>
                    <div className={style.boxInput}>
                        <input
                            type={seeConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={style.input}
                            placeholder='powtórz hasło'
                        />
                        {seeConfirmPassword
                            ? <BsFillEyeSlashFill className={style.icon} onClick={() => setSeeConfirmPassword(false)}/>
                            : <BsFillEyeFill className={style.icon} onClick={() => setSeeConfirmPassword(true)}/>

                        }
                    </div>
                    <p
                        className={style.p}
                        style={{color: correct ? 'transparent' : '#de0000'}}
                    >{errorPassword}
                    </p>
                    <button className={style.btn} type='submit'>Zaloguj</button>
                </form>
            </div>
            <p className={style.info}>* hasło powinno mieć co najmniej 8 znaków zawierać dużą i małą literę cyfrę oraz
                znak specjalny</p>
        </div>
    );
};