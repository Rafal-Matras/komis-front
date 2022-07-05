import React, {useEffect, useState} from 'react';

import {Header} from '../Header/Header';
import {Users} from './Users/Users';
import {Cars} from './Cars/Cars';
import {Branch} from './Branch/Branch';

import style from './Admin.module.css';

interface Props {
    login: string;
    role: string;
    branch: string;
    handleToggleAdminKomis: () => void;
}

interface MenuList {
    name: string;
    show: string;
}

export const Admin = ({login, role, branch, handleToggleAdminKomis}: Props) => {

    const [active, setActive] = useState<string>('users');
    const [menuList, setMenuList] = useState<MenuList[]>([]);

    useEffect(() => {
        role === 'ADMIN'
            ? setMenuList([
                {name: 'users', show: 'Użytkownicy'},
                {name: 'cars', show: 'Samochody'},
                {name: 'branch', show: 'Oddziały'},
            ])
            : setMenuList([
                {name: 'users', show: 'Użytkownicy'},
                {name: 'cars', show: 'Samochody'},
            ]);
    }, [role]);

    const handleBody = (el: string) => {
        setActive(el);
    };

    const menuItem = () => {
        switch (active) {
            case 'users':
                return <Users
                    branch={branch}
                    role={role}
                />;
            case 'cars':
                return <Cars
                    role={role}
                    branch={branch}
                />;
            case 'branch':
                return <Branch/>;
        }
    };

    return (
        <div className={style.container}>
            <Header
                login={login}
                role={role}
                branch={branch}
                handleBody={handleBody}
                active={active}
                menuList={menuList}
                link="komis"
                handleToggleAdminKomis={handleToggleAdminKomis}
            />
            {menuItem()}
        </div>
    );
};