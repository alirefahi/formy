import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormDisplay = () => {
    const { formId } = useParams();
    const [form, setForm] = useState(null);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`https://refahi1378.pythonanywhere.com/forms/${formId}`);
                setForm(response.data);
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [formId]);

    const handleChange = (field, value) => {
        setResponses({ ...responses, [field]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`https://refahi1378.pythonanywhere.com/responses/${formId}`, responses);
            alert('Response submitted successfully!');
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    if (!form) return <div>Loading...</div>;

    return (
        <div>
            <h2>{form.title}</h2>
            <form onSubmit={handleSubmit}>
                {form.fields.map((field, index) => (
                    <div key={index}>
                        <label>{field.label}</label>
                        <input
                            type={field.type}
                            value={responses[field.label] || ''}
                            onChange={(e) => handleChange(field.label, e.target.value)}
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormDisplay;
