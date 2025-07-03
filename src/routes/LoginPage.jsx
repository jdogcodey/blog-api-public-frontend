import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState([])
    const {setUser} = useOutletContext();

    let navigate = useNavigate();

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value,
        }));
        setErrors(prevErrors => 
            Array.isArray(prevErrors)
            ? prevErrors.filter(error => error.path !== name)
            : []
        );
    };

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch(`${baseURL}/login`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (response.status === 200) {
                const {token, user} = result.data;
                localStorage.setItem('token', token)
                setUser(user);
                navigate('/user')
            } else {
                throw result;
            }
        } catch (err) {
            const errorsArray = err.errors || {};
            setErrors(errorsArray);
        }
    }

    function getErrorsForField(fieldName) {
        if (!Array.isArray(errors)) return null;

        return errors
        .filter(error => error.path === fieldName)
        .map((error, index) => <p key={index}>{error.msg}</p>)
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input id='username' name='username' type='text' placeholder='e.g. JohnSmith123' onChange={handleChange}></input>
                {getErrorsForField('username')}
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password' onChange={handleChange}></input>
                {getErrorsForField('password')}
                <input type='submit' value='Log In'></input>
            </form>
        </main>
    )
}