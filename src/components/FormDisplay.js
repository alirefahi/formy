import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './FormDisplay.css';

const FormDisplay = () => {
    const { formId } = useParams();
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`https://formy-backend.liara.run/forms/${formId}`);
                setForm(response.data);
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [formId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formResponses = {};
        for (let [key, value] of data.entries()) {
            formResponses[key] = value;
        }
        try {
            await axios.post(`https://formy-backend.liara.run/responses/${formId}`, formResponses);
            alert('پاسخ شما با موفقیت ارسال شد');
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    if (!form) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div className="form-display">
            <h2>{form.title}</h2>
            <form onSubmit={handleSubmit} className="form-display-form">
                {form.fields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>{field.label}</label>
                        {field.type === 'text' && <input type="text" name={field.label} className="form-control"/>}
                        {field.type === 'number' && <input type="number" name={field.label} className="form-control"/>}
                        {field.type === 'email' && <input type="email" name={field.label} className="form-control"/>}
                    </div>
    )
)}
    <button type="submit" className="btn btn-primary">تایید</button>
</form>
    <Link to={`/responses/${formId}`} style={{display: 'block', marginTop: '20px'}}>مشاهده پاسخ‌ها</Link>
</div>
)
    ;
};

export default FormDisplay;
