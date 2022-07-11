import {createContext} from "react";

export const ChangeUserContext = createContext({
    changeUser: '',
    setChangeUser: (change: string) => {
    },
});