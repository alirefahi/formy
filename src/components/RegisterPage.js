import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://formy-backend.liara.run/register', { username, password });
            navigate('/login');
        } catch (error) {
            setError('Error registering. Please try again.');
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="container">
            <h2>ثبت نام</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleRegister}>
                <div>
                    <label>نام کاربری:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>رمز عبور:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">ثبت نام</button>
            </form>
        </div>
    );
};

export default RegisterPage;
