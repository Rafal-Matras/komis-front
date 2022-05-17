import React, {useEffect, useState} from "react";

import {BsXLg} from "react-icons/bs";
import {Person} from "types";

import style from './AdminAddUser.module.css';
import {stringifyUrl} from "query-string";

interface Props {
    setAddUser: React.Dispatch<React.SetStateAction<boolean>>;
    role: string;
}

interface NameBranchResponse {
    branchName: string
}

export const AdminAddUser = ({setAddUser, role}: Props) => {

    const [person, setPerson] = useState<Person>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        login: '',
        branchId: '',
        role: 'USER',
    });
    const [branchNames, setBranchNames] = useState<string[]>([]);
    const [branchName, setBranchName] = useState<string>('')
    const [fillIn, setFillIn] = useState<boolean>(false);
    const [sameLogin, setSameLogin] = useState<boolean>(false);


    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:3001/users/branch/name');
            const data = await response.json();
            const name = data.map((el: NameBranchResponse) => el.branchName)
            setBranchNames(name);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (person.login.length > 4) {
                const URL = stringifyUrl({
                    url: 'http://localhost:3001/users/same-login/?',
                    query: {
                        login: person.login,
                    }
                })
                const response = await fetch(URL);
                const data = await response.json();
                setSameLogin(data)
            }
        })();
    }, [person.login]);

    useEffect(() => {
        if (branchName !== '') {
            (async () => {
                const URL = stringifyUrl({
                    url: 'http://localhost:3001/users/branch-id/?',
                    query: {
                        branchName: branchName,
                    }
                })
                const response = await fetch(URL);
                const data = await response.json();
                updateForm('branchId', data)
            })()
        }
    }, [branchName])


    const updateForm = (key: string, value: string) => {
        setPerson(person => ({
            ...person,
            [key]: value,
        }));
    };

    const confirmBranchNameToId = (value: string) => {
        setBranchName(value)
    }

    const AddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (person.name.length < 3 || person.lastName.length < 2 || person.email.length < 5 || person.login.length < 5 || person.password.length < 3) {
            setFillIn(true)
            return
        }
        if (sameLogin) return
        console.log(JSON.stringify(person))
        await fetch('http://localhost:3001/users', {
            method: 'PUT',
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
            >{sameLogin ?
                'taki login jużistnieje'
                : 'wypełnij pola'}
            </p>
            <form className={style.form} style={{}} onSubmit={AddUser}>
                <div className={style.boxInput}>
                    <input
                        type="text"
                        value={person.name}
                        onChange={e => updateForm('name', e.target.value)}
                        className={style.input}
                        placeholder='Imię'/>
                    <input
                        type="text"
                        value={person.lastName}
                        onChange={e => updateForm('lastName', e.target.value)}
                        className={style.input}
                        placeholder='Nazwisko'/>
                </div>
                <input
                    type="text"
                    value={person.email}
                    onChange={e => updateForm('email', e.target.value)}
                    className={style.inputEmail}
                    placeholder='Email'/>
                <div className={style.boxInput}>
                    <input
                        type="text"
                        value={person.login}
                        onChange={e => updateForm('login', e.target.value)}
                        className={style.input}
                        placeholder='Login'/>
                    <input
                        type="text"
                        value={person.password}
                        onChange={e => updateForm('password', e.target.value)}
                        className={style.input}
                        placeholder='Hasło'/>
                </div>
                <div className={role === 'ADMIN' ? style.boxInput : style.blank}>
                    <select className={style.input} onChange={e => updateForm('role', e.target.value)}>
                        <option value='USER'>Użytkownik</option>
                        <option value='REG_ADMIN'>Kierownik Oddziału</option>
                        <option value="ADMIN">Administrator</option>
                    </select>
                    <select className={style.input} onChange={e => confirmBranchNameToId(e.target.value)}>
                        <option value=''>Oddział</option>
                        {branchNames.map(el => <option key={el} value={el}>{el}</option>)}
                    </select>

                </div>
                <button type='submit' className={style.btnAdd}>Dodaj</button>
            </form>
        </div>
    );
};
