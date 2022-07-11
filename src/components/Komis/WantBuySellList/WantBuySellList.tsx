import React, {useEffect, useState} from 'react';

import {Consumer} from 'types';

import {config} from '../../../config/config';
import {ChangeConsumerContext} from '../../contexts/changeConsumerContext';
import {AddEditBuySell} from './AddEditBuySell/AddEditBuySell';
import {FullConsumer} from './FullConsumer/FullConsumer';
import {WantBuySellItem} from './WantBuySellItem/WantBuySellItem';
import {Button} from '../../common/Button/Button';

import style from './WantBuySellList.module.css';

interface Props {
    login: string;
    role: string;
    branch: string;
}

export const WantBuySellList = ({login, role, branch}: Props) => {

    const [changeConsumerContext, setChangeConsumerContext] = useState('');
    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [fullConsumer, setFullConsumer] = useState(false);
    const [consumers, setConsumers] = useState<Consumer[]>([]);
    const [branchId, setBranchId] = useState('');
    const [consumer, setConsumer] = useState<Consumer>({
        name: '',
        phone: '',
        email: '',
        description: '',
        option: '',
        keeper: '',
        branch: '',
    });

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}consumers`);
            const data = await res.json();
            setConsumers(data);
            const branchIdRes = await fetch(`${config.URL}branches/getid/${branch}`);
            const branchIdData = await branchIdRes.json();
            setBranchId(branchIdData);
        })();
    }, [changeConsumerContext]);

    const handleConsumer = (item: Consumer) => {
        setConsumer(item);
        setFullConsumer(true);
    };

    const handleFullConsumer = () => {
        setFullConsumer(false);
    };

    const buy = consumers
        .filter(consumer => consumer.option === 'BUY')
        .filter(consumer => consumer.branch === branchId)
        .filter(consumer => role === 'USER' ? consumer.keeper === login : consumer)
        .map((el, index) => (
            <WantBuySellItem
                key={el.id}
                lp={index + 1}
                item={el}
                role={role}
                consumer={handleConsumer}
            />
        ));
    const sell = consumers
        .filter(consumer => consumer.option === 'SELL')
        .filter(consumer => consumer.branch === branchId)
        .filter(consumer => role === 'USER' ? consumer.keeper === login : consumer)
        .map((el, index) => (
            <WantBuySellItem
                key={index}
                lp={index + 1}
                item={el}
                role={role}
                consumer={handleConsumer}
            />
        ));

    return (
        <>
            <ChangeConsumerContext.Provider value={{changeConsumerContext, setChangeConsumerContext}}>
                {!fullConsumer
                    ? <div className={style.container}>
                        <div className={style.box}>
                            {openAddEdit && <AddEditBuySell
                                closePopup={setOpenAddEdit}
                                login={login}
                                branchId={branchId}
                            />}
                            <div className={style.boxBtn}>
                                <Button
                                    textName="Dodaj"
                                    type="button"
                                    click={() => setOpenAddEdit(true)}
                                />
                            </div>
                            <div className={style.titleBtn}>
                                <h2>Chce Kupić</h2>
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Telefon</th>
                                    <th>Opis</th>
                                    {role === 'REG_ADMIN'
                                        ? <th>Opiekun</th>
                                        : null
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {buy}
                                </tbody>
                            </table>
                        </div>
                        <div className={style.box}>
                            <div className={style.titleBtn}>
                                <h2>Chce Sprzedać</h2>
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Telefon</th>
                                    <th>Opis</th>
                                    {role === 'REG_ADMIN'
                                        ? <th>Opiekun</th>
                                        : null
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {sell}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <FullConsumer
                        consumer={consumer}
                        click={handleFullConsumer}
                        login={login}
                        branchId={branchId}
                    />
                }
            </ChangeConsumerContext.Provider>
        </>
    );
};
