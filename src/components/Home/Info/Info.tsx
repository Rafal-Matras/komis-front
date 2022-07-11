import React, {SetStateAction} from 'react';

import {Button} from '../../common/Button/Button';

import style from './Info.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
}

export const Info = ({closePopup}: Props) => {

    return (
        <div className={style.container}>
            <div className={style.box}>
                <section className={style.boxText}>
                    <h1>Opis Aplikacji</h1>
                    <p>Aplikacja Komis samochodowy została stworzona na potrzeby fikcyjnego komisu samochodowego
                        posiadającego kilka oddziałów.</p>
                    <p>W aplikacji istnieją trzy rodzaje użytkowników.</p>
                    <h2>USER: Sprzedawca</h2>
                    <p>- Ma podgląd do listy aut w danej placówce, szczegółowe dane auta, sprzedać, zarezerwować,
                        wpłacić zaliczkę. </p>
                    <p>- Ma możliwość szukania auta według wybranych kryteriów ( przeszukuje wszystkie oddziały ). </p>
                    <p>- Pozwala zapisywać klientów którzy chcą kupić bądź sprzedać auto z krutkim opisem. </p>
                    <p>- Wydrukować umowę kupna auta. </p>
                    <h2>REG_ADMIN: Kierownik Oddziału. </h2>
                    <p>- Posiada uprawnienia do podglądu, edycji, ustawienia hasła oraz usunięcia użytkowników z jego
                        oddziału. </p>
                    <p>- Ma możliwość dodania nowego auta do bazy, usunięcia sprzedanego auta z bazy, dodawanie i
                        usuwanie preferencji Auta </p>
                    <p>- Wszystko co USER z dodatkiem przeniesienia auta do innej placówki, podglądu klientów chcących
                        kupić bądź sprzedać auto wszystkich pracowników placówki </p>
                    <h2>ADMIN: Kierownik</h2>
                    <p>- Ma podgląd i edycję wszystkich użytkowników. </p>
                    <p>- Podgląd i edycję wszystkich oddziałów. </p>
                    <p>- Edycję danych firmy.</p>
                    <h3>Proszę o nie zmienianie istniejących danych i pousuwanie danych które zostały wprowadzone.</h3>
                    <p>Loginy i hasła dla każdej z grup:</p>
                    <table>
                        <tr>
                            <td>admin</td>
                            <td>Tjsth@007$</td>
                            <td>ADMIN</td>
                        </tr>
                        <tr>
                            <td>tomekkowalski</td>
                            <td>Timo83#$</td>
                            <td>ADMIN_REG</td>
                        </tr>
                        <tr>
                            <td>monikanowak</td>
                            <td>Monia89*</td>
                            <td>USER</td>
                        </tr>
                    </table>
                </section>
                <Button
                    type="button"
                    textName="Powrót"
                    click={() => closePopup(false)}
                />
            </div>
        </div>
    );
};