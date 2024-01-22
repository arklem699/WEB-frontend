import '../styles/AppointmentAdd.css';
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Breadcrumbs from './Breadcrumbs';

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
        try {
            const formData = new FormData();
            formData.append('doctor', addAppointment.doctor);
            formData.append('date', addAppointment.date);
            formData.append('time', addAppointment.time);
    
            const imageInput = document.getElementById('imageInput') as HTMLInputElement;
            if (imageInput.files && imageInput.files[0]) {
                formData.append('image', imageInput.files[0]);
            }
    
            const response = await fetch('http://127.0.0.1:8000/appointments/post/', {
                method: 'POST',
                credentials: 'include',
                body: formData,
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

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
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
                <div>
                    <label>Фото:</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                    />
                </div>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default AppointmentAdd;