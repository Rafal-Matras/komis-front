import React, {useEffect, useState} from "react";

import {Header} from "../Header/Header";
import {AdminUsers} from "./AdminUsers/AdminUsers";
import {AdminBranch} from "./AdminBranch/AdminBranch";
import {AdminCars} from "./AdminCars/AdminCars";

import style from './Admin.module.css';

interface Props {
    login: string;
    role: string;
    branch: string;
    handleToggleAdminKomis: () => void
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
                {name: 'users', show: 'Pracownicy'},
                {name: 'branch', show: 'Oddziały'},
                {name: 'cars', show: 'Dodaj / Usuń'},
            ])
            : setMenuList([
                {name: 'users', show: 'Pracownicy'},
                {name: 'cars', show: 'Dodaj / Usuń'},
            ])
    }, [role]);

    const handleBody = (el: string) => {
        setActive(el);
    };

    const menuItem = () => {
        switch (active) {
            case 'users':
                return <AdminUsers
                    branch={branch}
                />;
            case 'branch':
                return <AdminBranch/>;     //todo ustawienie filtra na pracownikach
            case 'cars':
                return <AdminCars/>;
        }
    };

    return (
        <div className={style.container}>
            <Header
                login={login}
                role={role}
                handleBody={handleBody}
                active={active}
                menuList={menuList}
                link='komis'
                handleToggleAdminKomis={handleToggleAdminKomis}
            />
            {menuItem()}
        </div>
    );
};