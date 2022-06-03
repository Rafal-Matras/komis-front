import React, {SetStateAction, useEffect, useState} from "react";
import {SimpleCarEdit} from "types";


import {DeleteItems} from "./DeleteItems";
import {config} from "../../../../config/config";

import style from './DeletePreferences.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
}

export const DeletePreferences = ({closePopup}: Props) => {

    const [carMarks, setCarMarks] = useState<SimpleCarEdit[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}cars/edit/car/?name=mark`);
            const data = await res.json();
            setCarMarks(data);
        })();

    }, []);

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.boxItems}>
                    <DeleteItems
                        name='mark'
                        title='Marka'
                    />
                    <DeleteItems
                        name='model'
                        title='Model'
                        carMarks={carMarks}
                    />
                    <DeleteItems
                        name='equipment'
                        title='Wyposażenie'
                    />
                    <DeleteItems
                        name='fuel'
                        title='Typ paliwa'
                    />
                    <DeleteItems
                        name='type'
                        title='Typ nadwozia'
                    />
                </div>
                <button
                    className='btnPrimaryBig'
                    onClick={() => closePopup(false)}
                >Anuluj
                </button>
            </div>
        </div>
    );
};
