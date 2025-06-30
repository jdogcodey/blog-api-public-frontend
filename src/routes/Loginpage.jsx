import { useState, useNavigate } from "react";
import { useOutletContext } from "react-router-dom";


export default function LoginPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const {setUser} = useOutletContext();

    let navigate = useNavigate();

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    async function handleSubmit(e) {
        e.preventDefault();

        

        try {
            const response = await fetch(`${baseURL}/signup`, {
                method: 'POST',
                body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        if (response.status === 201) {
            const result = response.json();
            const {token, user} = result.data;
            localStorage.setItem('token', token)
            setUser(user);
            navigate(`/user`)
        }
        } catch (err) {
            const errors = err.errors || {};
            setErrors(errors);
        };

        
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor='first_name'>First Name:</label>
                <input id='first_name' name='first_name' type='text' placeholder='e.g. John' onChange={handleChange}></input>
                {errors.first_name && <p>{errors.first_name}</p>}
                <label htmlFor='last_name'>Last Name:</label>
                <input id='last_name' name='last_name' type='text' placeholder='e.g. Smith' onChange={handleChange}></input>
                {errors.last_name && <p>{errors.last_name}</p>}
                <label htmlFor='username'>Username:</label>
                <input id='username' name='username' type='text' placeholder='e.g. JohnSmith123' onChange={handleChange}></input>
                {errors.username && <p>{errors.username}</p>}
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email' type='email' placeholder='e.g. johnsmith@email.com' onChange={handleChange}></input>
                {errors.email && <p>{errors.email}</p>}
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password' onChange={handleChange}></input>
                {errors.password && <p>{errors.password}</p>}
                <label htmlFor='confirm_password'>Confirm password:</label>
                <input id='confirm_password' name='confirm_password' type='password'></input>
                <input type='submit' value='Sign Up'></input>
            </form>
        </main>
    )
}