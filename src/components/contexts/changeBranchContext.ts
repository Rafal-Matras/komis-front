import {createContext} from "react";

export const ChangeBranchContext = createContext({
    changeBranch: '',
    setChangeBranch: (change: string) => {
    },
});