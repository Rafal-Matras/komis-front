import React, {SetStateAction} from "react";

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
}

export const Configuration = ({closePopup}: Props) => {

    return (
        <h1>Configuration</h1>
    )
}