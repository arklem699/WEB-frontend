import '../styles/InputField.css';
import React from 'react';
import { FC, useState, Dispatch } from 'react';

const InputField: FC<{ setQuery: Dispatch<string> }> = ({ setQuery }) => {

    const [value, setValue] = useState<string>("");

    const handleChange = (value: string) => {
        setValue(value);
    };

    const handleClick = () => {
        setQuery(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <div className="inputField">
            <h2>Поиск по дате:</h2>
            <br />
            <input className="input"
                value={ value }
                placeholder='ДД.ММ.ГГГГ'
                onChange={ (event) => handleChange(event.target.value) }
                onKeyDown={ handleKeyDown }
            />
            <button type="submit" onClick={ handleClick } className="button">Поиск</button>
        </div>
    );
};

export default InputField;