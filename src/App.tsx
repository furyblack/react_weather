import React, { useState } from 'react';
import './App.css';

function App() {
    const [city, setCity] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Добавляем стейт для ошибки

    const fetchWeather = () => {
        const apiKey = '1ce2c8f1225f14bf33b893989c1548cf';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('City not found');
                } else {
                    console.log(json);
                    setError(null);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setError('An error occurred');
            });
    };

    return (
        <div className="App">
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
            />
            <button onClick={fetchWeather}>Get weather</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку */}
        </div>
    );
}

export default App;
