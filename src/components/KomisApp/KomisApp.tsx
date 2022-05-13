import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {stringifyUrl} from "query-string";

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
        if (loginName === null) {
            if (location === null) {
                return navigate('/login')
            }
            setLoginName(location)
        }
    }, [location, loginName, navigate]);

    useEffect(() => {
        (async () => {
            const URL = stringifyUrl({
                url: 'http://localhost:3001/users/?',
                query: {
                    login: loginName,
                }
            });
            const response = await fetch(URL);
            const resData = await response.json();
            setData(data => ({
                ...data,
                login: resData.login,
                role: resData.role,
                branch: resData.branch,
            }));
        })();
        if (data.role === 'ADMIN') {
            setToggleAdminKomis('admin');
        }
    }, [data.role, loginName]);


    const handleToggleAdminKomis = () => {
        setToggleAdminKomis(toggleAdminKomis === 'komis' ? 'admin' : 'komis');
        console.log('ok')
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