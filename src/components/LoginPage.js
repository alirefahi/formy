import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://formy-backend.liara.run/login', { username, password });
            localStorage.setItem('access_token', response.data.access_token);
            navigate('/');
        } catch (error) {
            setError('Invalid username or password.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="container">
            <h2>ورود</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
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
                <button type="submit">ورود</button>
            </form>
        </div>
    );
};

export default LoginPage;
