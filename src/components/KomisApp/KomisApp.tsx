import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {config} from '../../config/config';
import {Spinner} from "../../common/Spinner/Spinner";
import {Admin} from "../Admin/Admin";
import {Komis} from "../Komis/Komis";

import style from './KomisApp.module.css';

interface Data {
    login: string;
    role: string;
    branch: string;
}

export const KomisApp = () => {

    const [data, setData] = useState<Data>({
        login: '',
        role: '',
        branch: '',
    })
    const [toggleAdminKomis, setToggleAdminKomis] = useState<string>('komis');
    const [loginName, setLoginName] = useState<string | null>(null);
    const location = useLocation().state as string
    const navigate = useNavigate();

    useEffect(() => {
        if (location === null) {
            return navigate('/login')
        }
    }, [location, navigate]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${config.URL}users/user/${loginName}`);
            const resData = await response.json();
            setData(data => ({
                ...data,
                login: resData.login,
                role: resData.role,
                branch: resData.branchName,
            }));
        })();
        if (data.role === 'ADMIN') {
            setToggleAdminKomis('admin');
        }
    }, [data.role, loginName]);


    if (loginName === null) {
        setLoginName(location)
    }

    const handleToggleAdminKomis = () => {
        setToggleAdminKomis(toggleAdminKomis === 'komis' ? 'admin' : 'komis');
    };
    return (
        <div className={style.container}>
            {
                data.role === ''
                    ? <Spinner/>
                    : (toggleAdminKomis === 'admin')
                        ? <Admin
                            login={data.login}
                            role={data.role}
                            branch={data.branch}
                            handleToggleAdminKomis={handleToggleAdminKomis}
                        />
                        : <Komis
                            login={data.login}
                            role={data.role}
                            branch={data.branch}
                            handleToggleAdminKomis={handleToggleAdminKomis}
                        />
            }
        </div>
    )
}