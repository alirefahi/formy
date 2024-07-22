import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FormResponses.css';

const FormResponses = () => {
    const { formId } = useParams();
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await axios.get(`https://formy-backend.liara.run/responses/${formId}`);
                setResponses(response.data);
            } catch (error) {
                console.error('Error fetching responses:', error);
            }
        };

        fetchResponses();
    }, [formId]);

    if (responses.length === 0) {
        return <div className="no-responses">هیچ پاسخی ثبت نشده است!</div>;
    }

    return (
        <div className="form-responses">
            <h2>پاسخ‌ها</h2>
            {responses.map((response, index) => (
                <div key={index} className="response">
                    <h3>پاسخ {index + 1}</h3>
                    {Object.entries(response.responses).map(([field, value]) => (
                        <div key={field} className="response-item">
                            <strong>{field}:</strong> {value}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FormResponses;
