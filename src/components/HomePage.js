import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <title>شخمی</title>
            <h1>فرمی</h1>
            <h2>به سازنده فرم خوش آمدید</h2>
            <p>این یک برنامه ساده برای ساخت فرم است.</p>
            <ul>
                <li>
                    <Link to="/form-create">ساخت فرم جدید</Link>
                </li>
                <br/>
                <li>
                    <Link to="/forms-list">مشاهده فرم‌های ایجاد شده</Link>
                </li>
            </ul>
        </div>
    );
};

export default HomePage;
