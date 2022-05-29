import React, {useState} from "react";

import {AddEditBranch} from "./AddEditBranch/AddEditBranch";
import {BranchList} from "./BranchList/BranchList";

import style from './Branch.module.css';
import {ChangeBranchContext} from "../../contexts/changeBranchContext";

export const Branch = () => {

    const [changeBranch, setChangeBranch] = useState('');
    const [openAddBranch, setOpenAddBranch] = useState(false);

    return (
        <ChangeBranchContext.Provider value={{changeBranch, setChangeBranch}}>
            <div className={style.container}>
                <button
                    className='btnPrimaryBig'
                    onClick={() => setOpenAddBranch(true)}
                >Dodaj nową Placówkę
                </button>
                {openAddBranch && <AddEditBranch
                    closePopup={setOpenAddBranch}
                />}
                <BranchList/>
            </div>
        </ChangeBranchContext.Provider>
    );
};