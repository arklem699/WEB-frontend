import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppointmentsList from './components/AppointmentsList'
import AppointmentPage from './components/AppointmentPage';
import AppointmentAdd from './components/AppointmentAdd';
import AppointmentUpdate from './components/AppointmentUpdate';
import ApplicationsList from './components/ApplicationsList';
import Login from "./components/login";
import Register from "./components/register";
import ShoppingCart from './components/shoppingCart';

const App = () => {
    
    const [selectedAppointment, setSelectedAppointment] = useState(undefined);

    return (
        <BrowserRouter>
            <div>
                <div>
                    <Routes>
                        <Route path='/' element={ <AppointmentsList /> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/register" element={ <Register /> } />
                        <Route path='/appointment/:id' element={ <AppointmentPage selectedAppointment={ selectedAppointment } setSelectedAppointment={ setSelectedAppointment } /> } />
                        <Route path='/appointments/post' element={ <AppointmentAdd/> } />
                        <Route path='/appointment/update/:id' element={ <AppointmentUpdate /> } />
                        <Route path='/applications' element={ <ApplicationsList/> } />
                        <Route path='/shopcart' element={ <ShoppingCart /> } />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;