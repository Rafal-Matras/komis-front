import React, {SetStateAction, useContext, useEffect, useState} from 'react';

import {Branch, List, User} from 'types';

import {config} from '../../../../config/config';
import {ChangeUserContext} from '../../../contexts/changeUserContext';
import {Input} from '../../../common/Input/Input';
import {Select} from '../../../common/Select/Select';
import {Button} from '../../../common/Button/Button';

import style from './AddEditUser.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    role: string;
    branch: string;
    editUser?: List;
}

interface BranchName {
    name: string;
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
    const [branchNames, setBranchNames] = useState<BranchName[]>([]);
    const [fillIn, setFillIn] = useState(false);
    const [sameLogin, setSameLogin] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(false);
    const [alertText, setAlertText] = useState('ok');

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
    }, [editUser]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${config.URL}branches/all/names`);
            const data = await response.json();
            const names = data.map((el: Branch) => Object({name: el.branchName}));
            setBranchNames(names);
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
            setAlertText('login powinien mieć co najmniej 5 znaków');
            setFillIn(true);
        } else {
            setFillIn(false);
            if (!editUser) {
                const response = await fetch(`${config.URL}users/checklogin/${person.login}`);
                const data = await response.json();
                if (data) {
                    setAlertText('taki login już istnieje');
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
            setAlertText('wypełnij wszystkie pola');
            setFillIn(true);
            return true;
        } else if (person.name.length < 3) {
            setAlertText('imię powinno składać się z conajmniej 3 znaków');
            setFillIn(true);
            return true;
        } else if (person.lastName.length < 2) {
            setAlertText('nazwisko powinno składać się z conajmniej 2 znaków');
            setFillIn(true);
            return true;
        } else if (sameLogin) {
            setAlertText('taki login już istnieje');
            setFillIn(true);
            return true;
        } else if (correctEmail) {
            setAlertText('nieprawidłowy adres e-mail');
            setFillIn(true);
            return true;
        }
    };

    const handleAddUser = async () => {
        if (validation()) {
            return;
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

    const handleEditUser = async () => {
        if (validation()) {
            return;
        }
        const res = await fetch(`${config.URL}users/edit/${editUser?.login}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
        const data = await res.json();
        console.log(data);
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
                <div className={style.formContainer}>
                    <div className={style.formBox}>
                        <div className={style.inputBox}>
                            <Input
                                name="name"
                                textName="Imię"
                                type="text"
                                value={person.name}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="lastName"
                                textName="Nazwisko"
                                type="text"
                                value={person.lastName}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.emailBox}>
                            <Input
                                name="email"
                                textName="Email"
                                type="text"
                                value={person.email}
                                change={updateForm}
                                blur={handleValidateEmail}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="login"
                                textName="Login"
                                type="text"
                                value={person.login}
                                change={updateForm}
                                blur={handleSomeLogin}
                            />
                        </div>
                        <div className={style.inputBox}>
                            {editUser
                                ? null
                                : <Input
                                    name="password"
                                    textName="Hasło"
                                    type="text"
                                    value={person.password}
                                    change={updateForm}
                                />
                            }
                        </div>
                        <div className={role === 'ADMIN' ? style.inputBox : style.blank}>
                            <Select
                                name="role"
                                textName="Stanowisko"
                                value={person.role}
                                change={updateForm}
                                options={[{name: 'USER'}, {name: 'REG_ADMIN'}, {name: 'ADMIN'}]}
                            />
                        </div>
                        <div className={role === 'ADMIN' ? style.inputBox : style.blank}>
                            <Select
                                name="branchId"
                                textName="Oddział"
                                value={person.branchId}
                                change={updateForm}
                                options={branchNames}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.btnBox}>
                    <Button
                        type="button"
                        textName={editUser ? 'Edytuj' : 'Dodaj'}
                        click={editUser ? handleEditUser : handleAddUser}
                    />
                    <Button
                        type="button"
                        textName="Anuluj"
                        click={() => closePopup(false)}
                    />
                </div>
            </div>
        </div>
    );
};
