import React, {useEffect, useState} from 'react';

import {Consumer} from 'types';

import {config} from '../../../config/config';
import {ChangeConsumerContext} from '../../contexts/changeConsumerContext';
import {AddBuySell} from './AddBuySell/AddBuySell';
import {FullConsumer} from './FullConsumer/FullConsumer';
import {WantBuySellItem} from './WantBuySellItem/WantBuySellItem';
import {Button} from '../../common/Button/Button';

import style from './WantBuySellList.module.css';

interface Props {
    login: string;
    role: string;
}

export const WantBuySellList = ({login, role}: Props) => {

    const [changeConsumerContext, setChangeConsumerContext] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [fullConsumer, setFullConsumer] = useState(false);
    const [consumers, setConsumers] = useState<Consumer[]>([]);
    const [consumer, setConsumer] = useState<Consumer>({
        name: '',
        phone: '',
        email: '',
        description: '',
        option: '',
        keeper: '',
    });


    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}consumers`);
            const data = await res.json();
            setConsumers(data);
        })();
    }, [changeConsumerContext]);

    const handleConsumer = (item: Consumer) => {
        setConsumer(item);
        setFullConsumer(true);
    };

    const handleFullConsumer = () => {
        setFullConsumer(false);
    };

    const buy = consumers.filter(consumer => consumer.option === 'BUY').map((el, index) => (
        <WantBuySellItem
            key={el.id}
            lp={index + 1}
            item={el}
            role={role}
            consumer={handleConsumer}
        />
    ));
    const sell = consumers.filter(consumer => consumer.option === 'SELL').map((el, index) => (
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
                            {openPopup && <AddBuySell
                                closePopup={setOpenPopup}
                                login={login}
                            />}
                            <div className={style.boxBtn}>
                                <Button
                                    textName="Dodaj"
                                    type="button"
                                    click={() => setOpenPopup(true)}
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
                    />
                }
            </ChangeConsumerContext.Provider>
        </>
    );
};
