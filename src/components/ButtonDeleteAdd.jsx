import '../styles/ButtonDeleteAdd.css';
import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetData } from '../getData';
import { useData, deleteAppointment, sendAppointment } from '../slices/dataSlice';


const ButtonDelete = ({ appointment }) => {

    const dispatch = useDispatch();

    const [isActiveAdd, setIsActiveAdd] = useState(true);
    
    GetData();

    const data = useData();

    console.log(data);

    useEffect(() => {
        const appointmentIds = data.map(item => item?.id);
        setIsActiveAdd(!appointmentIds.includes(appointment.id));
    }, [data, appointment.id]);

    const handleAddClick = () => {

        setIsActiveAdd(false);

        dispatch(sendAppointment(appointment.id))

    };

    const handleDeleteClick = () => {

        dispatch(deleteAppointment(appointment.id))

        setIsActiveAdd(true);

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