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
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState('Text');
    const [incorrectLogin, setIncorrectLogin] = useState(false);
    const [incorrectEmail, setIncorrectEmail] = useState(false);

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

    const updateForm = (key: string, value: string | number) => {
        setPerson(person => ({
            ...person,
            [key]: value,
        }));
    };

    const handleSomeLogin = async () => {
        if (person.login !== '') {
            const response = await fetch(`${config.URL}users/checklogin/${person.login}`);
            const data = await response.json();
            if (data && person.login !== editUser?.login) {
                setAlertText('taki login już istnieje');
                setAlert(true);
                setIncorrectLogin(true);
            } else {
                setAlert(false);
                setIncorrectLogin(false);
            }
        }
    };

    const handleValidateEmail = async () => {
        if (person.email !== '') {
            const response = await fetch(`${config.URL}users/checkemail/${person.email}`);
            const data = await response.json();
            if (data && person.email !== editUser?.email) {
                setAlertText('taki e-mail już istnieje');
                setAlert(true);
                setIncorrectEmail(true);
            } else {
                setAlert(false);
                setIncorrectEmail(false);
            }
        }
        const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
        if (!reg.test(person.email)) {
            setAlertText('nieprawidłowy adres e-mail');
            setAlert(true);
        } else {
            setAlert(false);
        }
    };

    const validation = () => {
        if (person.name === '' || person.lastName === '' || person.email === '' || person.login === '' || person.role === 'select' || person.branchId === 'select') {
            setAlertText('wypełnij wszystkie pola');
            setAlert(true);
            return true;
        }
        if (!editUser) {
            if (person.password === '') {
                setAlertText('wypełnij wszystkie pola');
                setAlert(true);
                return true;
            }
        }
        if (person.name.length < 3) {
            setAlertText('imię powinno składać się z conajmniej 3 znaków');
            setAlert(true);
            return true;
        }
        if (person.lastName.length < 2) {
            setAlertText('nazwisko powinno składać się z conajmniej 2 znaków');
            setAlert(true);
            return true;
        }
        if (incorrectLogin) {
            setAlertText('taki login już istnieje ');
            setAlert(true);
            return true;
        }
        if (incorrectEmail) {
            setAlertText('taki e-mail już istnieje ');
            setAlert(true);
            return true;
        }
    };

    const handleAddUser = async () => {
        if (validation() || alert) {
            return;
        }
        await fetch(`${config.URL}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
        setChangeUser(`${new Date()}`);
        closePopup(false);
    };

    const handleEditUser = async () => {
        if (validation()) {
            return;
        }
        await fetch(`${config.URL}users/edit/${editUser?.login}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });

        setChangeUser(`${new Date()}`);
        closePopup(false);
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
                    style={{color: alert ? '#fd5151' : 'transparent'}}
                >{alertText}
                </p>
                <div className={style.formContainer}>
                    <div className={style.formBox}>
                        <div className={style.boxItem}>
                            <Input
                                name="name"
                                textName="Imię"
                                type="text"
                                value={person.name}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
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
                        <div className={style.boxItem}>
                            <Input
                                name="login"
                                textName="Login"
                                type="text"
                                value={person.login}
                                change={updateForm}
                                blur={handleSomeLogin}
                            />
                        </div>
                        <div className={style.boxItem}>
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
                        <div className={role === 'ADMIN' ? style.boxItem : style.blank}>
                            <Select
                                name="role"
                                textName="Stanowisko"
                                value={person.role}
                                change={updateForm}
                                options={[{name: 'USER'}, {name: 'REG_ADMIN'}, {name: 'ADMIN'}]}
                            />
                        </div>
                        <div className={role === 'ADMIN' ? style.boxItem : style.blank}>
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
