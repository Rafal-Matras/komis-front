import {createContext} from 'react';

export const ChangeConsumerContext = createContext({
    changeConsumerContext: '',
    setChangeConsumerContext: (change: string) => {
    },
});