import "../styles/AppointmentCard.css";
import { FC, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import mockImage from "/src/assets/mock.png";

export interface Appointment {
    id: number;
    date: string;
    time: string;
    doctor: string;
    image: string;
}

const AppointmentCard: FC<{ appointment: Appointment, isMock: boolean }> = ({ appointment, isMock }) => {

    const new_time = new Date(`1970-01-01T${appointment.time}Z`);
    new_time.setHours(new_time.getHours() - 3);

    const formattedTime = new_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const formattedDate = new Date(appointment.date)
    .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .replace(/\//g, '.');

    const [imageUrl, setImageUrl] = useState<string>(''); 

    const getImageUrl = async (id: number): Promise<string> => {
        const response = await fetch(`http://127.0.0.1:8000/appointment/${id}/image/get/`, { method: 'GET' });
    
        if (!response.ok) {
            console.error(`Ошибка HTTP: ${ response.status }`);
            return '';
        }
    
        const imageUrl = await response.json();
        return imageUrl;
    };

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const imageUrl = await getImageUrl(appointment.id);
                setImageUrl(imageUrl);
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        };
    
        fetchImageUrl();
    }, [appointment.id]);

    const strImageUrl = `data:image/jpeg;base64,${ imageUrl }`;

    return (
        <Card className="cardAppoint">
            <Card.Img className="cardImage" variant="top" src={ isMock ? mockImage : strImageUrl } />
            <Card.Body>
                <div className="cardText">
                    <Card.Text>
                        <b>
                            Врач: { appointment.doctor }
                            <br />
                            { formattedDate }
                            <br />
                            { formattedTime }
                        </b>
                    </Card.Text>
                </div>
                <div className="cardButton">
                    <Link to={`/appointment/${ appointment.id }`}>
                        Записаться
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AppointmentCard;