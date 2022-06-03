import React, {useEffect, useState} from "react";

import style from './Cars.module.css';
import {New} from "./New/New";
import {AddPreferences} from "./AddPreferences/AddPreferences";
import {DeletePreferences} from "./DeletePreferences/DeletePreferences";
import {Configuration} from "./Configuration/Configuration";
import {ChangeBranch} from "./ChangeBranch/ChangeBranch";
import {config} from "../../../config/config";

interface Props {
    role: string;
    branch: string;
}

export const Cars = ({role, branch}: Props) => {

    const [branchId, setBranchId] = useState('');
    const [openAddNew, setOpenAddNew] = useState(false);
    const [openAddPreferences, setOpenAddPreferences] = useState(false);
    const [openDeletePreferences, setOpenDeletePreferences] = useState(false);
    const [openConfiguration, setOpenConfiguration] = useState(false);
    const [openChangeBranch, setOpenChangeBranch] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}branches/getid/${branch}`);
            const data = await res.json();
            setBranchId(data);
        })();
    }, [branch]);


    return (
        <div className={style.container}>
            <div className={style.boxActivities}>
                <button
                    className='btnPrimaryBig'
                    onClick={() => setOpenAddNew(true)}
                >Dodaj nowy
                </button>
                {openAddNew && <New
                    closePopup={setOpenAddNew}
                    branchId={branchId}
                />}
                {role === 'ADMIN'
                    ? <button
                        className='btnPrimaryBig'
                        onClick={() => setOpenChangeBranch(true)}
                    >Zmień lokalizację
                    </button>
                    : null
                }
                {openChangeBranch && <ChangeBranch
                    closePopup={setOpenChangeBranch}
                />}
                <button
                    className='btnPrimaryBig'
                    onClick={() => setOpenAddPreferences(true)}
                >Dodaj Preferencje
                </button>
                {openAddPreferences && <AddPreferences
                    closePopup={setOpenAddPreferences}
                />}
                <button
                    className='btnPrimaryBig'
                    onClick={() => setOpenDeletePreferences(true)}
                >Usuń Preferencje
                </button>
                {openDeletePreferences && <DeletePreferences
                    closePopup={setOpenDeletePreferences}
                />}
                <button
                    className='btnPrimaryBig'
                    onClick={() => setOpenConfiguration(true)}
                >Konfiguracja
                </button>
                {openConfiguration && <Configuration
                    closePopup={setOpenConfiguration}
                />}
            </div>
            <div className={style.boxInfo}>        {/*TODO box do uzupełnienia*/}

            </div>
        </div>
    );
};