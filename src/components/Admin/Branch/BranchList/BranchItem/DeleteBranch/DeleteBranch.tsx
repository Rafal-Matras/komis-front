import React, {SetStateAction, useContext} from "react";

import {config} from "../../../../../../config/config";
import {ChangeBranchContext} from "../../../../../contexts/changeBranchContext";

import style from './DeleteBranch.module.css';

interface Props {
    branch: string;
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    userLeft: boolean;
}

export const DeleteBranch = ({branch, closePopup, userLeft}: Props) => {

    const {setChangeBranch} = useContext(ChangeBranchContext);


    const handleDeleteBranch = async () => {
        closePopup(false);
        const res = await fetch(`${config.URL}branches/${branch}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        });
        const data = await res.json();
        if (data) {
            setChangeBranch(branch);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.boxModal}>
                {userLeft
                    ? <h1>Nie można usunąć oddziału gdy są do niego przypisani pracownicy</h1>
                    : <h1>Czy na pewno chcesz usunąć oddział</h1>
                }
                <h2>{branch}</h2>
                <div className={style.boxBtn}>
                    {userLeft
                        ? null
                        : <button className='btnPrimarySmall' onClick={handleDeleteBranch}>Tak</button>
                    }
                    <button
                        className='btnPrimarySmall'
                        onClick={() => closePopup(false)}
                    >{userLeft ? 'Anuluj' : 'Nie'}
                    </button>
                </div>
            </div>

        </div>
    )
}