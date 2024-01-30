import '../styles/Breadcrumbs.css';
import React from 'react';
import { FC } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

const Breadcrumbs: FC = () => {

    const location = useLocation();

    let currentLink = '';

    const topics: { [key: string]: string } = {
        "post": "Создать",
        "update": "Редактировать",
        "appointments": "Доступное время",
        "application": "Черновик",
        "my": "Мои заявки",
        "login": "Вход",
        "register": "Регистрация"
    };

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`;

        const matchResult = currentLink.match(/appointment\/(\d+)$/);

        if (matchResult) {

            const appointmentNumber = matchResult[1];

            return (
                <div className={"crumb"} key={crumb}>
                    <FaChevronRight className={"chevron-icon"}/>
                    <Link to={currentLink}>
                        Доступное время №{appointmentNumber}
                    </Link>
                </div>
            )
        }

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <FaChevronRight className={"chevron-icon"}/>

                    <Link to={currentLink}>
                        { topics[crumb] }
                    </Link>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs">
            <div className="crumb">
                <Link to={"/"}>
                    <FaHome className="home-icon" />
                </Link>
            </div>
            {crumbs}
        </div>
    )
}

export default Breadcrumbs;