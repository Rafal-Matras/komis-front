import React, {SetStateAction, useContext, useEffect, useState} from "react";

import {List, User} from "types";

import {config} from "../../../../config/config";
import {ChangeUserContext} from "../../../contexts/changeUserContext";

import style from './AddEditUser.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    role: string;
    branch: string;
    user?: List
}

interface NameBranchResponse {
    branchName: string
}

export const AddEditUser = ({closePopup, role, branch, user}: Props) => {

    const {setChangeUser} = useContext(ChangeUserContext)
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
    const [alertText, setAlertText] = useState('ok')

    useEffect(() => {
        if (user) {
            setPerson(person => ({
                ...person,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                login: user.login,
                branchId: user.branchName,
            }));
        }
    }, [user])

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
            setAlertText('nieprawidłowy adres e-mail');
            setFillIn(true);
            setCorrectEmail(true);
        } else {
            setFillIn(false);
            setCorrectEmail(false);
        }
    };

    const validation = () => {
        if (person.name === '' || person.lastName === '' || person.email === '' || person.login === '' || person.role === '' || person.branchId.length < 6) {
            setAlertText('wypełnij wszystkie pola')
            setFillIn(true)
            return true
        } else if (person.name.length < 3) {
            setAlertText('imię powinno składać się z conajmniej 3 znaków')
            setFillIn(true)
            return true
        } else if (person.lastName.length < 2) {
            setAlertText('nazwisko powinno składać się z conajmniej 2 znaków')
            setFillIn(true)
            return true
        } else if (sameLogin) {
            setAlertText('taki login już istnieje')
            setFillIn(true)
            return true
        } else if (correctEmail) {
            setAlertText('nieprawidłowy adres e-mail')
            setFillIn(true)
            return true
        }
    }

    const AddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validation()) {
            return
        }
        const res = await fetch(`${config.URL}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
        const data = await res.json();
        closePopup(false);
        setChangeUser(data);
    };

    const EditUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validation()) {
            return
        }
        const res = await fetch(`${config.URL}users/edit/${user?.login}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
        const data = await res.json();
        closePopup(false);
        setChangeUser(data);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>

                {user
                    ? <h2 className={style.h2}>Edytuj Pracownika</h2>
                    : <h2 className={style.h2}>Dodaj Nowego Pracownika</h2>
                }

                <p
                    className={style.pError}
                    style={{color: fillIn ? 'red' : 'transparent'}}
                >{alertText}
                </p>
                <form className={style.form} onSubmit={user ? EditUser : AddUser}>
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
                        {user
                            ? null
                            : <input
                                type="text"
                                value={person.password}
                                onChange={e => updateForm('password', e.target.value)}
                                className={style.input}
                                placeholder='Hasło'
                            />
                        }
                    </div>
                    <div className={role === 'ADMIN' ? style.boxInput : style.blank}>
                        <select className={style.input} onChange={e => updateForm('role', e.target.value)}>
                            <option value=''>Wybirz stanowisko</option>
                            <option value='USER'>Użytkownik</option>
                            <option value='REG_ADMIN'>Kierownik Oddziału</option>
                            <option value="ADMIN">Administrator</option>

                        </select>
                        <select className={style.input} onChange={e => updateForm('branchId', e.target.value)}>
                            <option>Wybierz Oddział</option>
                            {branchNames.map(el => <option key={el} value={el}>{el}</option>)}
                        </select>

                    </div>
                    <div className={style.boxBtn}>
                        <button type='submit' className='btnPrimarySmall'>{user ? 'Edytuj' : 'Dodaj'}</button>
                        <button type='reset' className='btnPrimarySmall' onClick={() => closePopup(false)}>Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
