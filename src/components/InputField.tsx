import '../styles/InputField.css';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { FC, useState, Dispatch } from 'react';


const InputField: FC<{ setQuery: Dispatch<string> }> = ({ setQuery }) => {

    const [selectedDate, setSelectedDate] = useState('');

    const handleChange = (date: string) => {
        
        setSelectedDate(date);

        if (date) {
            const [year, month, day] = date.split("-");
            const formattedDate = `${day}.${month}.${year}`;
            setQuery(formattedDate);
        }

        else {
            setQuery('');
        }

    };

    return (
        <div className="inputField">
            <label><b>Поиск по дате: </b></label>
            <input type="date" value={selectedDate} onChange={(e) => handleChange(e.target.value)} />
        </div>
    );
};

export default InputField;