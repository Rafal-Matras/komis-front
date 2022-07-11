import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {HomeView} from "./views/HomeView";
import {LoginView} from './views/LoginView';
import {SetPasswordView} from './views/SetPasswordView';
import {KomisAppView} from './views/KomisAppView';
import {NotFoundView} from "./views/NotFoundView";

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeView/>}/>
                <Route path='/login' element={<LoginView/>}/>
                <Route path='/set-password' element={<SetPasswordView/>}/>
                <Route path='/komis' element={<KomisAppView/>}/>
                <Route path='/*' element={<NotFoundView/>}/>
            </Routes>
        </Router>
    );
};

