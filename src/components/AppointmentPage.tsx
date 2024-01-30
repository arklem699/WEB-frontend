import "../styles/AppointmentPage.css";
import React from 'react';
import { Dispatch, useEffect, FC } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppointmentsMock } from "../Mock";
import { Appointment } from "./AppointmentCard";
import Breadcrumbs from "./Breadcrumbs";
import NavBar from "./NavBar";

const AppointmentPage: FC<{ selectedAppointment:Appointment | undefined, setSelectedAppointment: Dispatch<Appointment | undefined> }> = ({ selectedAppointment, setSelectedAppointment }) => {

    const { id } = useParams<{id: string}>();

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/appointment/${id}`, { method: "GET" });

            if (!response.ok)
            {
                createMock();
                return;
            }

            const appointment: Appointment = await response.json()

            setSelectedAppointment(appointment);

        } catch {
            createMock();
        }

    };

    const createMock = () => {

        if (id !== undefined) {
            setSelectedAppointment(AppointmentsMock.find((appointment:Appointment) => appointment?.id == parseInt(id))!);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const formattedDate = selectedAppointment?.date
        ? new Date(selectedAppointment.date)
            .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
            .replace(/\//g, '.')
        : '';

    console.log(selectedAppointment?.image);
    const imageUrl = selectedAppointment?.image.slice(2, -1);
    const strImageUrl = `data:image/jpeg;base64,${ imageUrl }`;

    return (
        <div>
            <Navigate to={`/appointment/${ selectedAppointment?.id }`} />
            <NavBar />
            <Link to='/' className="buttonBack">
                Назад
            </Link>
            <Breadcrumbs />
            <div className="information">
                <b>Информация о записи</b>
            </div>
            <div className="order-container">
                <div className="image-container">
                    <img src={ strImageUrl } alt="Изображение врача" />
                </div>
                <div className="order-text">
                    <span className="label">Врач:</span> { selectedAppointment?.doctor }
                    <br />
                    <span className="label">Дата:</span> { formattedDate }
                    <br />
                    <span className="label">Время:</span> { selectedAppointment?.time }
                </div>
            </div>
        </div>    
    )
}

export default AppointmentPage;