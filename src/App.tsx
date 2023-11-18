import './App.css'
import { FC, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppointmentsList from './components/AppointmentsList'
import AppointmentPage from './components/AppointmentPage';
import { Appointment } from './components/AppointmentCard';

const App: FC = () => {
    
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <AppointmentsList /> } />
                    <Route path='/appointment/:id' element={ <AppointmentPage selectedAppointment={ selectedAppointment } setSelectedAppointment={ setSelectedAppointment } /> } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;