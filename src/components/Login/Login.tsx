import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs';

import car from '../../images/porsche.png';
import {config} from '../../config/config';
import {Button} from '../common/Button/Button';
import {Input} from '../common/Input/Input';

import style from './Login.module.css';

interface LoginData {
    name: string;
    password: string;
}

export const Login = () => {

    const [loginData, setLoginData] = useState<LoginData>({
        name: '',
        password: '',
    });
    const {name, password} = loginData;
    const [seePassword, setSeePassword] = useState(false);
    const [correct, setCorrect] = useState<boolean>(true);
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleSetLogin = (name: string, value: string | number) => {
        setLoginData(loginData => ({
            ...loginData,
            [name]: value,
        }));
    };

    const validation = () => {
        if (name === '') {
            setText('pole użytkownik nie może być puste');
            setCorrect(false);
            return true;
        }
        if (password === '') {
            setText('pole hasło nie może być puste');
            setCorrect(false);
            return true;
        }
    };

    const handleSend = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validation()) {
            return;
        }
        const response = await fetch(`${config.URL}login/${encodeURIComponent(name)}/${encodeURIComponent(password)}`);
        const data = await response.json();

        if (!data.login) {
            setCorrect(false);
            setText('nieprawidłowe logowanie');
            return;
        }
        if (data.passLength) {
            navigate('/set-password', {state: name});
            return;
        } else {
            navigate('/komis', {state: name});
            return;
        }
    };

    return (
        <div className={style.container}>
            <p
                className={style.p}
                style={{color: correct ? 'transparent' : '#de0000'}}
            >{text}
            </p>
            <div className={style.box}>
                <img className={style.img} src={car} alt=""/>
                <form className={style.form} onSubmit={e => handleSend(e)}>
                    <div className={style.boxInput}>
                        <Input
                            type="text"
                            name="name"
                            textName="Użytkownik"
                            value={loginData.name}
                            change={handleSetLogin}
                        />
                    </div>
                    <div className={style.boxInput}>
                        <Input
                            type={seePassword ? 'text' : 'password'}
                            name="password"
                            textName="Hasło"
                            value={loginData.password}
                            change={handleSetLogin}
                        />
                        {seePassword
                            ? <BsFillEyeSlashFill className={style.icon} onClick={() => setSeePassword(false)}/>
                            : <BsFillEyeFill className={style.icon} onClick={() => setSeePassword(true)}/>
                        }
                    </div>
                    <Button
                        type="submit"
                        textName="Zaloguj"
                        submit={handleSend}
                    />
                </form>
            </div>
        </div>
    );
};