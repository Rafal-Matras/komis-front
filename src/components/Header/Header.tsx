import React from 'react';
import {useNavigate} from 'react-router-dom';
import {BsPersonCircle, BsPower} from 'react-icons/bs';

import style from './Header.module.css';

interface Button {
    name: string;
    show: string;
}

interface Props {
    login: string;
    role: string;
    branch: string;
    active: string;
    handleBody: (el: string) => void;
    menuList: Button[];
    link: string;
    handleToggleAdminKomis: () => void;
}

export const Header = ({login, role, branch, active, handleBody, menuList, link, handleToggleAdminKomis}: Props) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const listItem = menuList.map(el => (
        <li
            key={el.name}
            className={style.listItem}
            style={
                {
                    borderColor: `${active === el.name ? '#0054A8' : 'transparent'}`,
                    color: `${active === el.name ? '#0054A8' : '#003c56'}`
                }}
            onClick={() => handleBody(el.name)}
        >{el.show}
        </li>
    ));

    return (
        <div className={style.container}>
            <div className={style.logo}/>
            <div className={style.box}>
                <div className={style.boxTitle}>
                    <h1 className={style.h1}>{link === 'komis' ? 'Panel Administratora' : `Komis | ${branch}`}</h1>
                    <div className={style.boxUser}>
                        <BsPersonCircle/>
                        <p className={style.user}>{login}</p>
                        <BsPower className={style.logOffIcon} onClick={handleLogout}/>
                    </div>
                </div>
                <nav className={style.nav}>
                    <ul className={style.menuList}>
                        {listItem}
                    </ul>
                    {role === 'REG_ADMIN'
                        ? <p
                            className={style.toggleSwitch}
                            onClick={handleToggleAdminKomis}
                        >
                            {link}
                        </p>
                        : null
                    }
                </nav>
            </div>
        </div>
    );
};