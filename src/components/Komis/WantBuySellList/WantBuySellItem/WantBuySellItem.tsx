import React from 'react';

import {Consumer} from 'types';

interface Props {
    lp: number;
    item: Consumer;
    role: string;
    consumer: (item: Consumer) => void;
}

export const WantBuySellItem = ({lp, item, role, consumer}: Props) => {

    return (
        <tr onClick={() => consumer(item)}>
            <td>{lp}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>
                <div>{item.description}</div>
            </td>
            {role === 'REG_ADMIN'
                ? <td>{item.keeper}</td>
                : null
            }
        </tr>
    );
};