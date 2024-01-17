import '../styles/ButtonDelete.css';
import React, { FC, useState, useEffect } from 'react';
import { Appointment } from './AppointmentCard';
import { GetData } from '../getData';
import { useData } from '../slices/dataSlice';


const ButtonDelete: FC<{ appointment: Appointment }> = ({ appointment }) => {

    const [isActiveAdd, setIsActiveAdd] = useState<boolean>(true);
    
    GetData();

    const data = useData();

    useEffect(() => {
        const appointmentIds = data.map((item: { id: number }) => item.id);
        setIsActiveAdd(!appointmentIds.includes(appointment.id));
    }, [data, appointment.id]);

    console.log(data);

    const handleAddClick = async () => {
        try {
            // Отправка запроса на бэкенд при нажатии
            const response = await fetch(`http://127.0.0.1:8000/appointment/${appointment.id}/`, {
                method: 'POST',  
                credentials: 'include'
            });

            setIsActiveAdd(false);

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
            }
        } catch (error) {
              console.error('Произошла ошибка:', error);
          }
    };

    const handleDeleteClick = async () => {
        try {
            // Отправка запроса на бэкенд при нажатии
            const response = await fetch(`http://127.0.0.1:8000/appapp/${appointment.id}/`, {
                method: 'DELETE',  
                credentials: 'include'
            });

            setIsActiveAdd(true);

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
            }
        } catch (error) {
              console.error('Произошла ошибка:', error);
          }
    };

    return (
        <div className="cardButton">
            {!isActiveAdd ? (
                <button className='delete' onClick={handleDeleteClick}>Удалить</button>
            ) : (
                <button className='add' onClick={handleAddClick}>Добавить</button>
            )}
        </div>
    );
};

export default ButtonDelete;