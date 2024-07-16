import React, { useState } from 'react';
import axios from 'axios';

const FormBuilder = () => {
    const [formTitle, setFormTitle] = useState('');
    const [fields, setFields] = useState([{ label: '', type: 'text' }]);

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
            const response = await axios.post('https://refahi1378.pythonanywhere.com/forms/create', form);
            alert(`Form created with ID: ${response.data._id}`);
        } catch (error) {
            console.error('Error creating form:', error);
        }
    };

    return (
        <div>
            <h2>Create a New Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Form Title:</label>
                    <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                    />
                </div>
                {fields.map((field, index) => (
                    <div key={index}>
                        <label>Field Label:</label>
                        <input
                            type="text"
                            name="label"
                            value={field.label}
                            onChange={(e) => handleFieldChange(index, e)}
                        />
                        <label>Field Type:</label>
                        <select
                            name="type"
                            value={field.type}
                            onChange={(e) => handleFieldChange(index, e)}
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                        </select>
                    </div>
                ))}
                <button type="button" onClick={handleAddField}>
                    Add Field
                </button>
                <button type="submit">Create Form</button>
            </form>
        </div>
    );
};

export default FormBuilder;
