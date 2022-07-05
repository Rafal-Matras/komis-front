import {createContext} from 'react';

export const CarsListContext = createContext({
    carsListContext: '',
    setCarsListContext: (change: string) => {
    },
})