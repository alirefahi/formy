import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './FormBuilder.css';

const FormBuilder = () => {
    const [formTitle, setFormTitle] = useState('');
    const [fields, setFields] = useState([{ label: '', type: 'text' }]);
    const navigate = useNavigate();

    const handleAddField = () => {
        setFields([...fields, { label: '', type: 'text' }]);
    };

    const handleFieldChange = (index, event) => {
        const newFields = fields.slice();
        newFields[index][event.target.name] = event.target.value;
        setFields(newFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = { title: formTitle, fields };
        try {
            const response = await axios.post('https://formy-backend.liara.run/form/create', form);
            alert(`فرم ساخته شد با آی دی: ${response.data.form_id}`);
            navigate(`/forms/${response.data.form_id}`);
        } catch (error) {
            console.error('Error creating form:', error);
        }
    };

    return (
        <div className="form-builder">
            <h2>ساخت فرم جدید</h2>
            <form onSubmit={handleSubmit} className="form-builder-form">
                <div className="form-group">
                    <label>عنوان فرم:</label>
                    <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                {fields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>عنوان سوال:</label>
                        <input
                            type="text"
                            name="label"
                            value={field.label}
                            onChange={(e) => handleFieldChange(index, e)}
                            className="form-control"
                        />
                        <label>نوع سوال:</label>
                        <select
                            name="type"
                            value={field.type}
                            onChange={(e) => handleFieldChange(index, e)}
                            className="form-control"
                        >
                            <option value="text">متن</option>
                            <option value="number">عدد</option>
                            <option value="email">ایمیل</option>
                        </select>
                    </div>
                ))}
                <button type="button" onClick={handleAddField} className="btn btn-secondary">
                    سوال جدید +
                </button>
                <button type="submit" className="btn btn-primary">ساختن</button>
            </form>
        </div>
    );
};

export default FormBuilder;
