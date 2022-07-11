import {createContext} from 'react';

export const EditCarsContext = createContext({
    editCarsContext: '',
    setEditCarsContext: (change: string) => {
    },
});