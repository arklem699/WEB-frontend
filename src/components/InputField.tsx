import '../styles/InputField.css';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { FC, useState, Dispatch } from 'react';
import DatePicker from 'react-datepicker';


const InputField: FC<{ setQuery: Dispatch<string> }> = ({ setQuery }) => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleChange = (date: Date | null) => {
        
        setSelectedDate(date);

        if (date) {
            const formattedDate = date.toLocaleDateString('ru-RU');
            setQuery(formattedDate);
        }

        else {
            setQuery('');
        }

    };

    return (
        <div className="inputField">
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="dd.MM.yyyy"
                placeholderText="Выберите дату..."
                isClearable
                showYearDropdown
                scrollableYearDropdown
            />
        </div>
    );
};

export default InputField;