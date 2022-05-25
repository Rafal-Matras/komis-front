import React, {useEffect, useState} from "react";

import {BsXLg} from "react-icons/bs";
import {User} from "types";

import style from './AdminAddUser.module.css';
import {config} from "../../../../config/config";

interface Props {
    role: string;
    branch: string;
    setAddUser: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NameBranchResponse {
    branchName: string
}

export const AdminAddUser = ({role, branch, setAddUser}: Props) => {

    const [person, setPerson] = useState<User>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        login: '',
        branchId: branch,
        role: 'USER',
    });
    const [branchNames, setBranchNames] = useState<string[]>([]);
    const [fillIn, setFillIn] = useState(false);
    const [sameLogin, setSameLogin] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(false);
    const [alertText, setAlertText] = useState('')


    useEffect(() => {
        (async () => {
            const response = await fetch(`${config.URL}branches/all/names`);
            const data = await response.json();
            const name = data.map((el: NameBranchResponse) => el.branchName)
            setBranchNames(name);
        })();
    }, []);

    const updateForm = (key: string, value: string) => {
        setPerson(person => ({
            ...person,
            [key]: value,
        }));
    };

    const handleSomeLogin = async () => {
        if (person.login.length < 5) {
            setAlertText('login powinien mieć co najmniej 5 znaków')
            setFillIn(true)
        } else {
            setFillIn(false)
            const response = await fetch(`${config.URL}users/checklogin/${person.login}`);
            const data = await response.json();
            if (data) {
                setAlertText('taki login już istnieje')
            }
            setSameLogin(data);
            setFillIn(data);
        }
    };

    const handleValidateEmail = () => {
        const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
        if (!reg.test(person.email)) {
            setAlertText('niepoprawny adres e-mail');
            setFillIn(true);
            setCorrectEmail(true);
        } else {
            setFillIn(false);
            setCorrectEmail(false);
        }
    };


    const AddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (person.name.length < 3 || person.lastName.length < 2 || person.email.length < 5 || person.login.length < 5 || person.password.length < 3 || person.role === '' || person.branchId.length < 6 || sameLogin || correctEmail) {
            setAlertText('wypełnij wszystkie pola')
            setFillIn(true)
            return
        }
        await fetch(`${config.URL}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
        setAddUser(true)
    };


    return (
        <div className={style.container}>
            <div className={style.boxTitle}>
                <h2 className={style.h2}>Dodaj Nowego Pracownika</h2>
                <button className={style.btnCansel} onClick={() => setAddUser(true)}><BsXLg/></button>
            </div>
            <p
                className={style.pError}
                style={{color: fillIn ? 'red' : 'transparent'}}
            >{alertText}
            </p>
            <form className={style.form} style={{}} onSubmit={AddUser}>
                <div className={style.boxInput}>
                    <input
                        type="text"
                        value={person.name}
                        onChange={e => updateForm('name', e.target.value)}
                        className={style.input}
                        placeholder='Imię'
                    />
                    <input
                        type="text"
                        value={person.lastName}
                        onChange={e => updateForm('lastName', e.target.value)}
                        className={style.input}
                        placeholder='Nazwisko'
                    />
                </div>
                <input
                    type="email"
                    value={person.email}
                    onChange={e => updateForm('email', e.target.value)}
                    onBlur={handleValidateEmail}
                    className={style.inputEmail}
                    placeholder='Email'
                />
                <div className={style.boxInput}>
                    <input
                        type="text"
                        value={person.login}
                        onChange={e => updateForm('login', e.target.value)}
                        onBlur={handleSomeLogin}
                        className={style.input}
                        placeholder='Login'
                    />
                    <input
                        type="text"
                        value={person.password}
                        onChange={e => updateForm('password', e.target.value)}
                        className={style.input}
                        placeholder='Hasło'
                    />
                </div>
                <div className={role === 'ADMIN' ? style.boxInput : style.blank}>
                    <select className={style.input} onChange={e => updateForm('role', e.target.value)}>
                        <option value=''>Wybirz stanowisko</option>
                        <option value='USER'>Użytkownik</option>
                        <option value='REG_ADMIN'>Kierownik Oddziału</option>
                        <option value="ADMIN">Administrator</option>

                    </select>
                    <select className={style.input} onChange={e => updateForm('branchId', e.target.value)}>
                        <option value=''>Wybierz Oddział</option>
                        {branchNames.map(el => <option key={el} value={el}>{el}</option>)}
                    </select>

                </div>
                <button type='submit' className={style.btnAdd}>Dodaj</button>
            </form>
        </div>
    );
};
