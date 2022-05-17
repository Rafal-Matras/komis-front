import React, {useState} from "react";

import {Header} from '../Header/Header';
import {KomisListCars} from './KomisListCars/KomisListCars';
import {KomisSearch} from "./KomisSearch/KomisSearch";
import {KomisNew} from "./KomisNew/KomisNew";
import {KomisWantBuy} from "./KomisWantBuySell/KomisWantBuy";
import {KomisWantSell} from "./KomisWantBuySell/KomisWantSell";
import {KomisArchives} from "./KomisArchives/KomisArchives";

import style from './Komis.module.css';

interface Props {
    login: string;
    role: string;
    branchName: string;
    handleToggleAdminKomis: () => void
}

export const Komis = ({login, role, branchName, handleToggleAdminKomis}: Props) => {

    const [active, setActive] = useState<string>('cars');
    const menuList = [
        {name: 'cars', show: 'Auta'},
        {name: 'search', show: 'Szukaj'},
        {name: 'new', show: 'Nowy'},
        {name: 'wantBuy', show: 'Chce Kupić'},
        {name: 'wantSell', show: 'Chce Sprzedać'},
        {name: 'archive', show: 'Archiwum'},
    ];

    const handleBody = (el: string) => {
        setActive(el);
    };

    const menuItem = () => {
        switch (active) {
            case 'cars':
                return <KomisListCars/>;
            case 'search':
                return <KomisSearch/>;
            case 'new':
                return <KomisNew/>;
            case 'wantBuy':
                return <KomisWantBuy/>;
            case 'wantSell':
                return <KomisWantSell/>;
            case 'archive':
                return <KomisArchives/>;
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
                link='admin'
                handleToggleAdminKomis={handleToggleAdminKomis}
            />
            {menuItem()}
        </div>
    );
};