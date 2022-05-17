import React, {useState} from "react";
import {BsXLg} from "react-icons/bs";
import {Branch} from "types";

import style from './AdminBranchAdd.module.css';

interface Props {
    setAddBranch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminBranchAdd = ({setAddBranch}: Props) => {

    const [branch, setBranch] = useState<Branch>({
        name: '',
        city: '',
        postCode: '',
        address: '',
    });

    const updateForm = (key: string, value: string) => {
        setBranch(branch => ({
            ...branch,
            [key]: value,
        }));
    };

    const addBranchToList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //todo  dodać do bazy danych

        setAddBranch(true);
    }

    return (
        <div className={style.container}>
            <div className={style.boxTitle}>
                <h2 className={style.h2}>Dodaj Nową Placówkę</h2>
                <button className={style.btnCansel} onClick={() => setAddBranch(true)}><BsXLg/></button>
            </div>
            <form onSubmit={addBranchToList} className={style.form}>
                <div className={style.boxInput}>
                    <input
                        type="text"
                        value={branch.name}
                        onChange={e => updateForm('name', e.target.value)}
                        className={style.input}
                        placeholder='Nazwa'/>
                    <input
                        type="text"
                        value={branch.city}
                        onChange={e => updateForm('city', e.target.value)}
                        className={style.input}
                        placeholder='Miasto'/>
                </div>
                <div className={style.boxInput}>
                    <input
                        type="text"
                        value={branch.postCode}
                        onChange={e => updateForm('postCode', e.target.value)}
                        className={style.input}
                        placeholder='Kod pocztowy'/>
                    <input
                        type="text"
                        value={branch.address}
                        onChange={e => updateForm('address', e.target.value)}
                        className={style.input}
                        placeholder='Adres'/>
                </div>
                <button type='submit' className={style.btnAdd}>Dodaj</button>
            </form>
        </div>
    );
};