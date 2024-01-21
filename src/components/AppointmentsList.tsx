import "../styles/AppointmentsList.css";
import React from 'react';
import { useEffect, useState } from "react";
import { Appointment } from "./AppointmentCard";
import AppointmentCard from "./AppointmentCard";
import InputField from "./InputField";
import { AppointmentsMock } from '../Mock';
import Breadcrumbs from './Breadcrumbs';
import NavBar from "./NavBar";

const AppointmentsList = () => {

    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchAppointments = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/search/?query=${query}`, { method: "GET" });

            if (!response.ok) {
                createMock();
                return;
            }

            const appointments: Appointment[] = await response.json();
            setAppointments(appointments);
            setIsMock(false);

        } catch (error) {
            createMock();
        }
    }

    const createMock = () => {

        setIsMock(true);
        setAppointments(AppointmentsMock); // Выводить не все моки

    }

    useEffect(() => {
        searchAppointments();
    }, [query])

    const cards = appointments.map(appointment  => (
        <AppointmentCard 
            key={appointment.id}
            appointment={appointment}
            isMock={isMock}
        />
    ))

    return (
        <div>
            <NavBar />
            <InputField setQuery={setQuery} />
            <Breadcrumbs />
            <div className="container">
                { cards }
            </div>
        </div>
    )
}

export default AppointmentsList;