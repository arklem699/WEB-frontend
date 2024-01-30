import '../styles/ApplicationsList.css';
import React from "react";
import { useState, useEffect } from "react";
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';


const ApplicationsList = () => {

    const [applications, setApplications] = useState([]);

    const [startDate, setStartDate] = useState('');

    const [endDate, setEndDate] = useState('');

    const [selectedStatus, setSelectedStatus] = useState('');

    const searchApplications = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/applications/`, { method: "GET", credentials: 'include' });

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${ response.status }`);
            }

            const applications = await response.json();
            setApplications(applications);

        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    useEffect(() => {
        searchApplications();
    }, []);

    const filterApplications = (application) => {
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

    const handleStatusChange = (e) => {
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
                <th>Дата завершения</th>
                <th>Статус</th>

                </tr>
            </thead>
            <tbody>
                {applications.filter(filterApplications).map((application) => (
                <tr key={application.id}>
                    <td>{application.id}</td>
                    <td>{application.username}</td>
                    <td>{application.date_creating}</td>
                    <td>{application.date_formation}</td>
                    <td>{application.date_completion}</td>
                    <td>{application.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      );
}

export default ApplicationsList;