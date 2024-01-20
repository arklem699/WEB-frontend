import '../styles/AppointmentAdd.css';
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const AppointmentAdd: FC = () => {

    const [addAppointment, setAddAppointment] = useState({
        doctor: "",
        date: "",
        time: "",
        status: "Действует"
      });

    const handleFieldChange = (fieldName: string, value: string | number) => {
        setAddAppointment(prevAppointment => ({
            ...prevAppointment!,
            [fieldName]: value
        }));
    };

    const handleSave = async () => {
      // Отправить запрос на сервер для сохранения изменений
        try {
            const response = await fetch(`http://127.0.0.1:8000/appointments/post/`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addAppointment)
            });

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
                return;
            }

        // Обработать успешное сохранение, например, перенаправление или вывод сообщения
        } catch (error) {
          console.error('Произошла ошибка:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <Link to='/' className="buttonBack">
                Назад
            </Link>
            <div className="add">
                <div>
                    <label>Врач:</label>
                    <input
                        type="text"
                        onChange={(e) => handleFieldChange("doctor", e.target.value)}
                    />
                </div>
                <div>
                    <label>Дата:</label>
                    <input
                        type="text"
                        onChange={(e) => handleFieldChange("date", e.target.value)}
                    />
                </div>
                <div>
                    <label>Время:</label>
                    <input
                        type="text"
                        onChange={(e) => handleFieldChange("time", e.target.value)}
                    />
                </div>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default AppointmentAdd;