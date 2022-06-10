import React, {useState} from "react";

import {Header} from '../Header/Header';
import {CarsList} from './CarsList/CarsList';
import {Search} from "./Search/Search";
import {WantBuy} from "./WantBuySell/WantBuy";
import {WantSell} from "./WantBuySell/WantSell";
import {Archives} from "./Archives/Archives";

import style from './Komis.module.css';

interface Props {
    login: string;
    role: string;
    branch: string;
    handleToggleAdminKomis: () => void
}

export const Komis = ({login, role, branch, handleToggleAdminKomis}: Props) => {

    const [active, setActive] = useState<string>('cars');
    const menuList = [
        {name: 'cars', show: 'Auta'},
        {name: 'search', show: 'Szukaj'},
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
                return <CarsList
                    branch={branch}
                />;
            case 'search':
                return <Search/>;
            case 'wantBuy':
                return <WantBuy/>;
            case 'wantSell':
                return <WantSell/>;
            case 'archive':
                return <Archives/>;
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