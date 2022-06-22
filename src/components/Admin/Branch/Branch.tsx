import React, {useState} from 'react';

import {ChangeBranchContext} from '../../contexts/changeBranchContext';
import {Button} from '../../common/Button/Button';
import {AddEditBranch} from './AddEditBranch/AddEditBranch';
import {BranchList} from './BranchList/BranchList';

import style from './Branch.module.css';

export const Branch = () => {

    const [changeBranch, setChangeBranch] = useState('');
    const [openAddBranch, setOpenAddBranch] = useState(false);

    return (
        <ChangeBranchContext.Provider value={{changeBranch, setChangeBranch}}>
            <div className={style.container}>
                <Button
                    type="button"
                    textName="Dodaj nową placówkę"
                    click={() => setOpenAddBranch(true)}
                />
                {openAddBranch && <AddEditBranch
                    closePopup={setOpenAddBranch}
                />}
                <BranchList/>
            </div>
        </ChangeBranchContext.Provider>
    );
};