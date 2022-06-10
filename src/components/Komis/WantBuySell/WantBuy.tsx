import React from "react";

import {consumers} from "../../../data/Data";

import style from './WantBuySell.module.css';

export const WantBuy = () => {

    const consumer = consumers.filter(el => el.whatWants === 'buy');

    const data = consumer.map((el, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{`${el.firstName} ${el.surName}`}</td>
            <td>{el.phone}</td>
            <td>{el.email}</td>
            <td>{el.description}</td>
        </tr>
    ))

    return (
        <div className={style.container}>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Telefon</th>
                    <th>Email</th>
                    <th>Opis</th>
                </tr>
                </thead>
                <tbody>
                {data}
                </tbody>
            </table>
        </div>
    );
};