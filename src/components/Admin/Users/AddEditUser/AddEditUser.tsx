import React, {SetStateAction, useContext, useEffect, useState} from "react";

import {List, User} from "types";

import {config} from "../../../../config/config";
import {ChangeUserContext} from "../../../contexts/changeUserContext";

import style from './AddEditUser.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    role: string;
    branch: string;
    editUser?: List
}

interface NameBranchResponse {
    branchName: string
}

export const AddEditUser = ({closePopup, role, branch, editUser}: Props) => {

    const {setChangeUser} = useContext(ChangeUserContext);
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
        if (editUser) {
            setPerson(person => ({
                ...person,
                name: editUser.name,
                lastName: editUser.lastName,
                email: editUser.email,
                login: editUser.login,
                branchId: editUser.branchName,
            }));
        }
    }, [editUser])

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
            if (!editUser) {
                const response = await fetch(`${config.URL}users/checklogin/${person.login}`);
                const data = await response.json();
                if (data) {
                    setAlertText('taki login już istnieje')
                }
                setSameLogin(data);
                setFillIn(data);
            }
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
        if (person.name === '' || person.lastName === '' || person.email === '' || person.login === '' || person.role === '' || person.branchId.length < 3) {
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
        const res = await fetch(`${config.URL}users/edit/${editUser?.login}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
        const data = await res.json();
        console.log(data)
        closePopup(false);
        setChangeUser(data);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                {editUser
                    ? <h2 className={style.h2}>Edytuj Pracownika</h2>
                    : <h2 className={style.h2}>Dodaj Nowego Pracownika</h2>
                }
                <p
                    className={style.pError}
                    style={{color: fillIn ? '#fd5151' : 'transparent'}}
                >{alertText}
                </p>
                <form className={style.formContainer} onSubmit={editUser ? EditUser : AddUser}>
                    <div className={style.formBox}>
                        <label htmlFor="name" className={style.label}>Imię
                            <input
                                id='name'
                                type="text"
                                value={person.name}
                                onChange={e => updateForm('name', e.target.value)}
                            />
                        </label>
                        <label htmlFor="lastName" className={style.label}>Nazwisko
                            <input
                                id='lastName'
                                type="text"
                                value={person.lastName}
                                onChange={e => updateForm('lastName', e.target.value)}
                            />
                        </label>
                        <div className={style.emailBox}>
                            <label htmlFor="email">Email
                                <input
                                    id='email'
                                    type="email"
                                    value={person.email}
                                    onChange={e => updateForm('email', e.target.value)}
                                    onBlur={handleValidateEmail}
                                />
                            </label>
                        </div>
                        <label htmlFor="login" className={style.label}>Login
                            <input
                                id='login'
                                type="text"
                                value={person.login}
                                onChange={e => updateForm('login', e.target.value)}
                                onBlur={handleSomeLogin}
                            />
                        </label>
                        {editUser
                            ? null
                            : <label htmlFor='password' className={style.label}>Hasło
                                <input
                                    id='password'
                                    type="text"
                                    value={person.password}
                                    onChange={e => updateForm('password', e.target.value)}
                                />
                            </label>
                        }

                    <div className={role === 'ADMIN' ? style.boxInput : style.blank}>
                        <select onChange={e => updateForm('role', e.target.value)}>
                            <option value=''>Wybirz stanowisko</option>
                            <option value='USER'>Użytkownik</option>
                            <option value='REG_ADMIN'>Kierownik Oddziału</option>
                            <option value="ADMIN">Administrator</option>

                        </select>
                        <select onChange={e => updateForm('branchId', e.target.value)}>
                            <option>Wybierz Oddział</option>
                            {role === 'ADMIN' ? <option value='All'>All</option> : null}
                            {branchNames.map(el => <option key={el} value={el}>{el}</option>)}
                        </select>
                    </div>
                    </div>
                    <div className={style.boxBtn}>
                        <button type='submit' className='btnPrimarySmall'>{editUser ? 'Edytuj' : 'Dodaj'}</button>
                        <button type='reset' className='btnPrimarySmall' onClick={() => closePopup(false)}>Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
