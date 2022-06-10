import {createContext} from "react";

export const CarsListContext = createContext({
    carsListC: '',
    setCarsListC: (change: string) => {
    },
})