import '../styles/shoppingCart.css';
import React from 'react'
import {deleteAppointment, delAppointAction, sendApplication, useData, useSum} from "../slices/dataSlice";
import {useDispatch} from "react-redux";
import {GetData} from "../getData";
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';


export default function ShoppingCart(){

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
    const sum = useSum()
    const data = useData()

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
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