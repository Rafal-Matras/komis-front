import React, {useState} from 'react';

import {Header} from '../Header/Header';
import {CarsList} from './CarsList/CarsList';
import {Search} from './Search/Search';
import {WantBuySellList} from './WantBuySellList/WantBuySellList';
import {Buy} from './Buy/Buy';

import style from './Komis.module.css';

interface Props {
    login: string;
    role: string;
    branch: string;
    handleToggleAdminKomis: () => void;
}

export const Komis = ({login, role, branch, handleToggleAdminKomis}: Props) => {

    const [active, setActive] = useState<string>('cars');
    const menuList = [
        {name: 'cars', show: 'Auta'},
        {name: 'search', show: 'Szukaj'},
        {name: 'wantBuySell', show: 'Chce Kupić/Sprzedać'},
        {name: 'buy', show: 'Zakup'},
    ];

    const handleBody = (el: string) => {
        setActive(el);
    };

    const menuItem = () => {
        switch (active) {
            case 'cars':
                return <CarsList
                    branch={branch}
                    role={role}
                    whereFromCarsList="list"
                />;
            case 'search':
                return <Search
                />;
            case 'wantBuySell':
                return <WantBuySellList
                    login={login}
                    role={role}
                />;
            case 'buy':
                return <Buy
                    branch={branch}
                />;
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