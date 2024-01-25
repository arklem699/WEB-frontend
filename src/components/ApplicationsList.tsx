import '../styles/ApplicationsList.css';
import React from "react";
import { useState, useEffect } from "react";
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';


export interface Application {
    id: number;
    date_creating: string;
    date_formation: string;
    date_completion: string;
    status: string;
    username: string;
}

const ApplicationsList = () => {

    const [applications, setApplications] = useState<Application[]>([]);

    const [startDate, setStartDate] = useState('');

    const [endDate, setEndDate] = useState('');

    const [selectedStatus, setSelectedStatus] = useState('');

    const searchApplications = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/applications/`, { method: "GET", credentials: 'include' });

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

    const filterApplications = (application: Application) => {
        const formationDate = new Date(application.date_formation);

        if (startDate && formationDate < new Date(startDate)) {
            return false;
        }

        if (endDate && formationDate > new Date(endDate)) {
            return false;
        }

        if (selectedStatus && application.status !== selectedStatus) {
            return false;
        }

        return true;

    };

    const handleAcceptClick = async (id: number) => {
        try {
            // Отправка запроса на бэкенд при нажатии
            const response = await fetch(`http://127.0.0.1:8000/application/${id}/moderator/put/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Указываем, что данные в формате JSON
                },
                body: JSON.stringify({
                    status: 'Одобрена',
                }),
            });

            window.location.reload();

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
            }

        } catch (error) {
                console.error('Произошла ошибка:', error);
          }
    };

    const handleRejectClick = async (id: number) => {
        try {
            // Отправка запроса на бэкенд при нажатии
            const response = await fetch(`http://127.0.0.1:8000/application/${id}/moderator/put/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Указываем, что данные в формате JSON
                },
                body: JSON.stringify({
                    status: 'Отклонена',
                }),
            });

            window.location.reload()

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
            }

        } catch (error) {
                console.error('Произошла ошибка:', error);
          }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(e.target.value);
    };

    return (
        <div>
            <NavBar/>
            <Breadcrumbs />
            <div className='filter-container'>
                <label><b>От: </b></label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label><b>До: </b></label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <label><b>Статус: </b></label>
                <select value={selectedStatus} onChange={handleStatusChange}>
                    <option value="">Любой</option>
                    <option value="Сформирована">Сформирована</option>
                    <option value="Одобрена">Одобрена</option>
                    <option value="Отклонена">Отклонена</option>
                    <option value="Удалена">Удалена</option>
                </select>
            </div>
            <table className="table">
            <thead>
                <tr>
                <th>Номер</th>
                <th>Пользователь</th>
                <th>Дата создания</th>
                <th>Дата формирования</th>
                <th>Статус</th>
                <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {applications.filter(filterApplications).map((application) => (
                <tr key={application.id}>
                    <td>{application.id}</td>
                    <td>{application.username}</td>
                    <td>{application.date_creating}</td>
                    <td>{application.date_formation}</td>
                    <td>{application.status}</td>
                    <td>
                        {application.status == 'Сформирована' && (
                        <div>
                            <button className="accept" onClick={() => handleAcceptClick(application.id)}>Принять</button>
                            <button className="reject" onClick={() => handleRejectClick(application.id)}>Отклонить</button>
                        </div>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      );
}

export default ApplicationsList;