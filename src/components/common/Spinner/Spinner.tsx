import React from "react";

import style from './Spinner.module.css'

export const Spinner = () => {

    return (
        <div className={style.atomSpinner}>
            <div className={style.spinnerInner}>
                <div className={style.spinnerLine}></div>
                <div className={style.spinnerLine}></div>
                <div className={style.spinnerLine}></div>
                <div className={style.spinnerCircle}>
                    &#9679;
                </div>
            </div>
        </div>
    );
};