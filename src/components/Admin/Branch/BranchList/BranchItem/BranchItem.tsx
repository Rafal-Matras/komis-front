import React, {useEffect, useState} from "react";
import {BsFillPencilFill, BsXLg} from "react-icons/bs";
import {Branch} from "types";

import {AddEditBranch} from "../../AddEditBranch/AddEditBranch";
import {DeleteBranch} from "./DeleteBranch/DeleteBranch";
import {config} from "../../../../../config/config";

import style from '../BranchList.module.css';

interface Props {
    data: Branch;
    id: number;
}

export const BranchItem = ({data, id}: Props) => {
    const {branchName, city, postCode, address} = data;

    const [openEditBranch, setOpenEditBranch] = useState(false);
    const [openDeleteBranch, setOpenDeleteBranch] = useState(false);
    const [userLeft, setUserLeft] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}branches/usersLeft/${branchName}`);
            const data = await res.json();
            setUserLeft(data);
        })();
    }, [branchName]);


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
                    userLeft={userLeft}
                />}
            </td>
        </tr>
    )
}