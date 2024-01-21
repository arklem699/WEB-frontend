import "../styles/AppointmentsList.scss";
import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Appointment } from "./AppointmentCard";
import AppointmentCard from "./AppointmentCard";
import InputField from "./InputField";
import { AppointmentsMock } from '../Mock';
import Breadcrumbs from './Breadcrumbs';
import NavBar from "./NavBar";
import { RootState } from "../store";

const AppointmentsList = () => {

    const [moderator, setModerator] = useState(false);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        setModerator(currentUser.is_staff || currentUser.is_admin);
    }, [currentUser]);

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

    const handleDeleteClick = async (id: number) => {
        try {
            // Отправка запроса на бэкенд при нажатии
            const response = await fetch(`http://127.0.0.1:8000/appointment/${id}/update/`, {
                method: 'DELETE',  
                credentials: 'include'
            });

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
            }
        } catch (error) {
              console.error('Произошла ошибка:', error);
          }
    };

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
            {moderator && (
                <div>
                    <button className="buttoncreate">
                        <Link to={`/appointments/post`} >
                            Создать
                        </Link>
                    </button>
                    <table className="table">
                    <thead>
                        <tr>
                        <th>Номер</th>
                        <th>Врач</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Действия</th>
                        </tr>
                    </thead>
                    {appointments.map(appointment  => (
                    <tbody>
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.doctor}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>
                                <button className="editbutton">
                                    <Link to={`/appointment/update/${ appointment.id }`} >
                                        Редактировать
                                    </Link>
                                </button>
                                <button className="delete" onClick={() => handleDeleteClick(appointment.id)}>Удалить</button>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                    </table>
                </div>
            )}
            <div className="container">
                { cards }
            </div>
        </div>
    )
}

export default AppointmentsList;