import '../styles/ButtonDeleteAdd.css';
import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetData } from '../getData';
import { updateUser } from '../slices/auth';
import { useData, deleteAppointment, sendAppointment } from '../slices/dataSlice';


const ButtonDeleteAdd = ({ appointment }) => {

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
            dispatch(updateUser(storedUser)); 
        }

    }, [dispatch]);

    const [isActiveAdd, setIsActiveAdd] = useState(true);
    
    GetData();

    const data = useData();

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
            ) : (currentUser ? (
                <button className='add' onClick={handleAddClick}>Добавить</button>
            ) : (
                <Link to='/login' className='add'>
                    Добавить
                </Link>
            ))}
        </div>
    );
};

export default ButtonDeleteAdd;