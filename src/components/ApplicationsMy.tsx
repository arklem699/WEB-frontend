import '../styles/ApplicationsMy.css';
import React from "react";
import { useState, useEffect } from "react";
import { Application } from "./ApplicationsList";
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';


const ApplicationsMy = () => {

    const [applications, setApplications] = useState<Application[]>([]);

    const searchApplications = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/applications/user/`, { method: "GET", credentials: 'include' });

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${ response.status }`);
            }

            const applications: Application[] = await response.json();
            setApplications(applications);

        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    useEffect(() => {
        searchApplications();
    }, []);

    return (
        <div>
            <NavBar/>
            <Breadcrumbs />
            {applications.length > 0 ? (
            <table className="table">
            <thead>
                <tr>
                <th>Номер</th>
                <th>Дата создания</th>
                <th>Дата формирования</th>
                <th>Дата выполнения</th>
                <th>Статус</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((application) => (
                <tr key={application.id}>
                    <td>{application.id}</td>
                    <td>{application.date_creating}</td>
                    <td>{application.date_formation}</td>
                    <td>{application.date_completion}</td>
                    <td>{application.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
            ) : (
                <div className="no-applications-message">
                    <h2>У вас ещё нет ни одной созданной заявки!</h2>
                </div>
            )}
        </div>
      );
}

export default ApplicationsMy;