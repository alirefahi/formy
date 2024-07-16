import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormResponses = () => {
    const { formId } = useParams();
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await axios.get(`https://refahi1378.pythonanywhere.com/responses/${formId}`);
                setResponses(response.data);
            } catch (error) {
                console.error('Error fetching responses:', error);
            }
        };

        fetchResponses();
    }, [formId]);

    if (responses.length === 0) return <div>No responses yet.</div>;

    return (
        <div>
            <h2>Responses</h2>
            {responses.map((response, index) => (
                <div key={index}>
                    <h3>Response {index + 1}</h3>
                    {Object.entries(response.responses).map(([field, value]) => (
                        <div key={field}>
                            <strong>{field}:</strong> {value}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FormResponses;
