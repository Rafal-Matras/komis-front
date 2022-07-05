import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs';

import {config} from '../../config/config';
import car from '../../images/ferrari.png';
import {Input} from '../common/Input/Input';
import {Button} from '../common/Button/Button';

import style from './SetPassword.module.css';

interface Passwords {
    newPassword: string;
    confirmNewPassword: string;
}

export const SetPassword = () => {

    const [passwords, setPasswords] = useState<Passwords>({
        newPassword: '',
        confirmNewPassword: '',
    });
    const {newPassword, confirmNewPassword} = passwords;
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
    const [correct, setCorrect] = useState<boolean>(true);
    const [errorPassword, setErrorPassword] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation();
    const passwordValidation = new RegExp('^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$');

    useEffect(() => {
        if (location.state === null) {
            navigate('/login');
        }
    }, [location.state, navigate]);

    const handleSetPassword = (name: string, value: string | number) => {
        setPasswords(passwords => ({
            ...passwords,
            [name]: value,
        }));
    };

    const handleEditPassword = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (newPassword === '' || confirmNewPassword === '') {
            setErrorPassword('hasła nie mogą być puste');
            setCorrect(false);
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setErrorPassword('hasła muszą być takie same');
            setCorrect(false);
            return;
        }
        if (!passwordValidation.test(newPassword)) {
            setErrorPassword(`nie spełniono warunków`);
            setCorrect(false);
            return;
        }

        await fetch(`${config.URL}login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({login: location.state, password: newPassword}),
        });
        navigate('/login');
    };

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Utwórz nowe hasło</h1>
            <div className={style.box}>
                <img className={style.img} src={car} alt=""/>
                <form className={style.form} onSubmit={e => handleEditPassword(e)}>
                    <div className={style.boxInput}>
                        <Input
                            type={seePassword ? 'text' : 'password'}
                            name="newPassword"
                            textName="nowe hasło"
                            value={passwords.newPassword}
                            change={handleSetPassword}
                        />
                        {seePassword
                            ? <BsFillEyeSlashFill className={style.icon} onClick={() => setSeePassword(false)}/>
                            : <BsFillEyeFill className={style.icon} onClick={() => setSeePassword(true)}/>

                        }
                    </div>
                    <div className={style.boxInput}>
                        <Input
                            type={seeConfirmPassword ? 'text' : 'password'}
                            name="confirmNewPassword"
                            textName="powtórz"
                            value={passwords.confirmNewPassword}
                            change={handleSetPassword}
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
                    <Button
                        type="submit"
                        textName="Zmień"
                        submit={handleEditPassword}
                    />
                </form>
            </div>
            <p className={style.info}>* hasło powinno mieć co najmniej 8 znaków zawierać dużą i małą literę cyfrę oraz
                znak specjalny</p>
        </div>
    );
};