import React, {useContext, useEffect, useState} from 'react';

import {Branch} from 'types';

import {ChangeBranchContext} from '../../../contexts/changeBranchContext';
import {config} from '../../../../config/config';
import {BranchItem} from './BranchItem/BranchItem';
import {Spinner} from '../../../common/Spinner/Spinner';

import style from './BranchList.module.css';

export const BranchList = () => {

    const {changeBranch} = useContext(ChangeBranchContext);
    const [branchList, setBranchList] = useState<Branch[]>([]);


    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}branches/all`);
            const data = await res.json();
            setBranchList(data);
        })();
    }, [changeBranch]);

    const branch = branchList.map((el, index) => (
        <BranchItem key={el.id} data={el} id={index + 1}/>
    ));

    return (
        <>
            {branchList.length < 1
                ? <Spinner/>
                : <table className={style.table}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nazwa</th>
                        <th>Miasto</th>
                        <th>Kod pocztowy</th>
                        <th>Adres</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>{branch}</tbody>
                </table>
            }
        </>
    );
};