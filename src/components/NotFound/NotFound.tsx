import React from "react";
import {Link} from "react-router-dom";

import style from './NotFound.module.css'

export const NotFound = () => {
    return (
        <div className={style.container}>
            <h1 className={style.h1}>404</h1>
            <h2 className={style.h2}>Podany adres nie istnieje</h2>
            <Link className={style.link} to='/login'>powrót do strony głównej</Link>
        </div>
    );
};