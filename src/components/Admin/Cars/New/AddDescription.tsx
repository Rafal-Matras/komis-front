import React, {SetStateAction, useState} from "react";
import {Car} from "types";

import style from './New.module.css'

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    setValuePreferences: React.Dispatch<SetStateAction<Car>>;
}

export const AddDescription = ({closePopup, setValuePreferences}: Props) => {

    const [value, setValue] = useState('')

    const handleAdd = () => {
        setValuePreferences(valuePreferences => ({
            ...valuePreferences,
            description: value
        }))
        closePopup(false)
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.formBox}>
                    <textarea
                        className={style.textarea}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        cols={60}
                        rows={15}
                    >opis
                    </textarea>
                        <button
                            className='btnPrimarySmall'
                            onClick={handleAdd}
                        >Dodaj
                        </button>
                        <button
                            className='btnPrimarySmall'
                            onClick={handleAdd}
                        >Anuluj
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}