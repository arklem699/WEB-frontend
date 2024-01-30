import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppointmentsList from './components/AppointmentsList'
import AppointmentPage from './components/AppointmentPage';
import Application from './components/Application';
import ApplicationsMy from './components/ApplicationsMy';
import Login from "./components/login";
import Register from "./components/register";


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
                        <Route path='/application' element={ <Application /> } />
                        <Route path='/applications/my' element={ <ApplicationsMy /> } />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;