import '../styles/Breadcrumbs.css';
import { FC } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Appointment } from "./AppointmentCard";

const Breadcrumbs: FC<{selectedAppointment: Appointment | undefined}> = ({selectedAppointment}) => {

    const location = useLocation();

    let currentLink = '';

    const formattedDate = selectedAppointment?.date
        ? new Date(selectedAppointment.date)
            .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
            .replace(/\//g, '.')
        : '';

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`;

        if (currentLink.match(new RegExp('appointment/(\d*)'))) {
            return (
                <div className={"crumb"} key={crumb}>
                    <Link to={currentLink}>
                        { formattedDate }
                    </Link>
                    <FaChevronRight className={"chevron-icon"}/>
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
                <FaChevronRight className="chevron-icon" />
            </div>
            {crumbs}
        </div>
    )
}

export default Breadcrumbs;