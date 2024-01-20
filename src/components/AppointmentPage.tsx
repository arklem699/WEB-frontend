import "../styles/AppointmentPage.css";
import React from "react";
import { Dispatch, useEffect, useState, FC } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppointmentsMock } from "../Mock";
import { Appointment } from "./AppointmentCard";
import Breadcrumbs from "./Breadcrumbs";

const AppointmentPage: FC<{ selectedAppointment:Appointment | undefined, setSelectedAppointment: Dispatch<Appointment | undefined> }> = ({ selectedAppointment, setSelectedAppointment }) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/appointment/${id}`, { method: "GET" });

            if (!response.ok)
            {
                setIsMock(true);
                createMock();
                return;
            }

            const appointment: Appointment = await response.json()

            setSelectedAppointment(appointment);
            setIsMock(false);

        } catch {
            createMock();
        }

    };

    const createMock = () => {

        if (id !== undefined) {
            setSelectedAppointment(AppointmentsMock.find((appointment:Appointment) => appointment?.id == parseInt(id))!);
            setIsMock(true);
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

    return (
        <div>
            <Navigate to={`/appointment/${ selectedAppointment?.id }`} />
            <Link to='/' className="buttonBack">
                Назад
            </Link>
            <Breadcrumbs selectedAppointment={ selectedAppointment } />
            <div className="information">
                <b>Информация о записи</b>
            </div>
            <div className="order-container">
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