import React, {SetStateAction, useContext, useEffect, useState} from 'react';
import {Branch} from 'types';

import {ChangeBranchContext} from '../../../contexts/changeBranchContext';
import {config} from '../../../../config/config';
import {Input} from '../../../common/Input/Input';
import {Button} from '../../../common/Button/Button';

import style from './AddEditBranch.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    branchEdit?: Branch;
}

export const AddEditBranch = ({closePopup, branchEdit}: Props) => {

    const {setChangeBranch} = useContext(ChangeBranchContext);
    const [branch, setBranch] = useState<Branch>({
        branchName: '',
        city: '',
        postCode: '',
        address: '',
        phone: '',
    });
    const [fillIn, setFillIn] = useState(false);
    const [alertText, setAlertText] = useState('');

    useEffect(() => {
        if (branchEdit) {
            setBranch(branch => {
                return ({
                    ...branch,
                    branchName: branchEdit.branchName,
                    city: branchEdit.city,
                    postCode: branchEdit.postCode,
                    address: branchEdit.address,
                });
            });
        }
    }, [branchEdit]);

    const updateForm = (key: string, value: string) => {
        setBranch(branch => ({
            ...branch,
            [key]: value,
        }));
    };

    const validation = () => {
        if (branch.branchName === '' || branch.city === '' || branch.postCode === '' || branch.address === '') {
            setAlertText('wypełnij wszystkie pola');
            setFillIn(true);
            return true;
        } else if (branch.city.length < 3) {
            setAlertText('miasto powinno składać się z conajmniej 3 znaków');
            setFillIn(true);
            return true;
        } else if (branch.address.length < 5) {
            setAlertText('adres powinen składać się z conajmniej 5 znaków');
            setFillIn(true);
            return true;
        } else if (!/^[a-z]{3}-[0-9]{2}$/.test(branch.branchName)) {
            setAlertText('niepoprawna nazwe oddziału');
            setFillIn(true);
            return true;
        } else if (!/^[0-9]{2}-[0-9]{3}$/.test(branch.postCode)) {
            setAlertText('niepoprawny kod pocztowy');
            setFillIn(true);
            return true;
        }
    };

    const addBranch = async () => {
        if (validation()) {
            return;
        }
        const res = await fetch(`${config.URL}branches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(branch),
        });
        const data = await res.json();
        closePopup(false);
        setChangeBranch(data);
    };

    const editBranch = async () => {
        if (validation()) {
            return;
        }
        const res = await fetch(`${config.URL}branches/${branch.branchName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(branch),
        });
        const data = await res.json();
        closePopup(false);
        setChangeBranch(data);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                <h2 className={style.h2}>{branchEdit ? 'Edytuj Placówkę' : 'Dodaj Nową Placówkę'}</h2>
                <p
                    className={style.errorText}
                    style={{color: fillIn ? '#fd5151' : 'transparent'}}
                >{alertText}
                </p>
                <div className={style.formContainer}>
                    <div className={style.formBox}>
                        <div className={style.inputBox}>
                            <Input
                                name="branchName"
                                textName="Nazwa"
                                type="text"
                                value={branch.branchName}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="city"
                                textName="Miasto"
                                type="text"
                                value={branch.city}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="postCode"
                                textName="Kod pocztowy"
                                type="text"
                                value={branch.postCode}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="address"
                                textName="Adres"
                                type="text"
                                value={branch.address}
                                change={updateForm}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.btnBox}>
                    <Button
                        type="button"
                        textName={branchEdit ? 'Edytuj' : 'Dodaj'}
                        click={branchEdit ? editBranch : addBranch}
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
