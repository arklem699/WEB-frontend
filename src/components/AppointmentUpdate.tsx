import '../styles/AppointmentUpdate.css';
import React, { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Appointment } from "./AppointmentCard";
import Breadcrumbs from "./Breadcrumbs";
import NavBar from "./NavBar";


const AppointmentUpdate: FC = () => {
    const { id } = useParams<{ id: string }>();

    const [editableAppointment, setEditableAppointment] = useState<Appointment>();

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/appointment/${id}`, { method: "GET" });

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
                return;
            }

            const fetchedAppointment: Appointment = await response.json();
            setEditableAppointment(fetchedAppointment);

        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleFieldChange = (fieldName: string, value: string | number) => {
        setEditableAppointment(prevAppointment => ({
            ...prevAppointment!,
            [fieldName]: value
        }));
    };

    const handleSave = async () => {
      // Отправить запрос на сервер для сохранения изменений
        try {
            const response = await fetch(`http://127.0.0.1:8000/appointment/${id}/update/`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editableAppointment)
            });

            window.location.reload();

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
                return;
            }

        } catch (error) {
          console.error('Произошла ошибка:', error);
        }
    };

    if (!editableAppointment) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            <Link to='/' className="buttonBack">
                Назад
            </Link>
            <Breadcrumbs />
            <div className="edit">
                <div>
                    <label>Врач:</label>
                    <input
                        type="text"
                        value={editableAppointment.doctor}
                        onChange={(e) => handleFieldChange("doctor", e.target.value)}
                    />
                </div>
                <div>
                    <label>Дата:</label>
                    <input
                        type="text"
                        value={editableAppointment.date}
                        onChange={(e) => handleFieldChange("date", e.target.value)}
                    />
                </div>
                <div>
                    <label>Время:</label>
                    <input
                        type="text"
                        value={editableAppointment.time}
                        onChange={(e) => handleFieldChange("time", e.target.value)}
                    />
                </div>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default AppointmentUpdate;