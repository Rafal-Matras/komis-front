import React, {useState} from "react";

import {AdminBranchAdd} from "./AdminBranchAdd/AdminBranchAdd";
import {AdminBranchList} from "./AdminBranchList/AdminBranchList";

import style from './AdminBranch.module.css';

export const AdminBranch = () => {

    const [addBranch, setAddBranch] = useState(true)

    return (
        <div className={style.container}>
            {addBranch
                ? <button
                    className={style.btnAdd}
                    onClick={() => setAddBranch(false)}
                >Dodaj nową Placówkę</button>
                : <AdminBranchAdd
                    setAddBranch={setAddBranch}
                />
            }
            <AdminBranchList/>
        </div>
    );
};