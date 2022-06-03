import React, {SetStateAction} from "react";


import style from './ChangeBranch.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
}

export const ChangeBranch = ({closePopup}: Props) => {


    const handleChange = () => {

    }

    return (
        <div className={style.container}>
            <div className={style.box}>

                <div className={style.btnBox}>
                    <button className='btnPrimarySmall' onClick={handleChange}>Zmień</button>
                    <button className='btnPrimarySmall' onClick={() => closePopup(false)}>Anuluj</button>
                </div>
            </div>
        </div>
    );
};