import '../styles/Application.css';
import React from 'react';
import { Link } from 'react-router-dom';
import {deleteAppointment, sendApplication, useData} from "../slices/dataSlice";
import {useDispatch} from "react-redux";
import {GetData} from "../getData";
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';


export default function Application() {

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
            <Link to='/applications/all' className="my-applications-link">
                Все заявки
            </Link>
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
                                dispatch(sendApplication(data));
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