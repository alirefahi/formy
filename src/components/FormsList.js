import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FormsList.css';

const FormsList = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get('https://formy-backend.liara.run/formslist');
                setForms(response.data);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };

        fetchForms();
    }, []);

    return (

        <div className="forms-list">
            <h2>فرم‌های ایجاد شده</h2>
            {forms.map((form) => (
                <div key={form._id} className="form-item">
                    <Link to={`/forms/${form._id}`}>{form.title}</Link>
                </div>
            ))}
        </div>
    );
};

export default FormsList;
