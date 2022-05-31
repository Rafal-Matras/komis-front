import {createContext} from "react";

export const ChangeCarsEditContext = createContext({
    changeCarItem: '',
    setChangeCarItem: (change: string) => {
    },
});