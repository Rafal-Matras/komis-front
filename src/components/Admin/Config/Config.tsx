import React, {useState} from 'react';

import {Button} from '../../common/Button/Button';
import {Configuration} from './Configuration/Configuration';

import style from './Config.module.css';

export const Config = () => {

    const [openConfiguration, setOpenConfiguration] = useState(false);

    return (
        <div className={style.container}>
            <div className={style.boxActivities}>
                <div className={style.boxBtn}>
                    <Button
                        type="button"
                        textName="Dane Firmy"
                        click={() => setOpenConfiguration(true)}
                    />
                </div>
                {openConfiguration && <Configuration
                    closePopup={setOpenConfiguration}
                />}
            </div>
        </div>
    );
};