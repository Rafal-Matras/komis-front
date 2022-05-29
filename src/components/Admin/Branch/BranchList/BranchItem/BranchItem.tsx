import React, {useState} from "react";
import {Branch} from "types";

import {BsFillPencilFill, BsXLg} from "react-icons/bs";

import style from '../BranchList.module.css';
import {AddEditBranch} from "../../AddEditBranch/AddEditBranch";
import {DeleteBranch} from "./DeleteBranch/DeleteBranch";


interface Props {
    data: Branch;
    id: number;
}

export const BranchItem = ({data, id}: Props) => {
    const {branchName, city, postCode, address} = data;

    const [openEditBranch, setOpenEditBranch] = useState(false);
    const [openDeleteBranch, setOpenDeleteBranch] = useState(false);


    return (
        <tr>
            <td>{id}</td>
            <td>{branchName}</td>
            <td>{city}</td>
            <td>{postCode}</td>
            <td>{address}</td>
            <td className={style.tdAction}>
                <BsFillPencilFill className={style.icon} onClick={() => setOpenEditBranch(true)}/>
                <BsXLg className={style.iconDelete} onClick={() => setOpenDeleteBranch(true)}/>
                {openEditBranch && <AddEditBranch
                    closePopup={setOpenEditBranch}
                    branchEdit={data}
                />}
                {openDeleteBranch && <DeleteBranch
                    closePopup={setOpenDeleteBranch}
                    branch={branchName}
                />}
            </td>
        </tr>
    )
}