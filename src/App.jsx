import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppointmentsList from './components/AppointmentsList'
import AppointmentPage from './components/AppointmentPage';
import AppointmentAdd from './components/AppointmentAdd';
import AppointmentUpdate from './components/AppointmentUpdate';
import ApplicationsList from './components/ApplicationsList';
import AppointmentsListModerator from './components/AppointmentsListModerator';
import ApplicationsMy from './components/ApplicationsMy';
import Login from "./components/login";
import Register from "./components/register";
import ShoppingCart from './components/shoppingCart';

const App = () => {
    
    const [selectedAppointment, setSelectedAppointment] = useState(undefined);

    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div>
                <div>
                    <Routes>
                        <Route path='/' element={ <AppointmentsList /> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/register" element={ <Register /> } />
                        <Route path='/appointment/:id' element={ <AppointmentPage selectedAppointment={ selectedAppointment } setSelectedAppointment={ setSelectedAppointment } /> } />
                        <Route path='/appointments' element={ <AppointmentsListModerator/> } />
                        <Route path='/appointments/post' element={ <AppointmentAdd/> } />
                        <Route path='/appointments/update/:id' element={ <AppointmentUpdate /> } />
                        <Route path='/applications' element={ <ApplicationsList/> } />
                        <Route path='/shopcart' element={ <ShoppingCart /> } />
                        <Route path='/shopcart/my-applications' element={ <ApplicationsMy /> } />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;