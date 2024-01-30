import '../styles/Application.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {deleteAppointment, sendApplication, useData} from "../slices/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import {GetData} from "../getData";
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';


export default function Application() {

    const [moderator, setModerator] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        setModerator(currentUser?.is_staff || currentUser?.is_admin);
    }, [currentUser]);

// Функция для получения значения конкретной куки по ее имени
    function getCookie(name) {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }

        return null;
    }

    const sessionId = getCookie('session_id');
    const dispatch = useDispatch()
    GetData()  // вызов хука
    const data = useData()

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
            {moderator ? (
                <Link to='/applications/all' className="my-applications-link">
                    Все заявки
                </Link>
            ) : (
                <Link to='/applications/my' className="my-applications-link">
                    Мои заявки
                </Link>  
            )}
            <div className="shopping-cart-container">
                {data.map((appointment) => (
                    <div key={appointment.id} className="appointment-item">
                        <p>{appointment.doctor}</p>
                        <p>Дата: {appointment.date}</p>
                        <p>Время: {appointment.time}</p>
                        <button
                            className="delete-button"
                            onClick={() => {
                                dispatch(deleteAppointment(appointment.id));
                            }}
                          >
                            Удалить
                        </button>
                    </div>
                ))}
                {data.length > 0 && (
                    <div>
                        <button
                            className="generate-button"
                            onClick={() => {
                                dispatch(sendApplication(data[0].id_appl));
                            }}
                          >
                            Сформировать
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}