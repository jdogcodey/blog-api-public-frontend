import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";


export default function SignupPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    })
    const [errors, setErrors] = useState([])
    const {setUser} = useOutletContext();

    let navigate = useNavigate();

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setErrors(prevErrors =>
            Array.isArray(prevErrors)
              ? prevErrors.filter(error => error.path !== name)
              : []
          );
      };

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(formData)

        try {
            const response = await fetch(`${baseURL}/signup`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                  }
        });

        const result = await response.json();

        console.log(result)

        if (response.status === 201) {
            // Is this line necessary as I'm doing it earlier? Need to test
            // const result = response.json();
            const {token, user} = result.data;
            localStorage.setItem('token', token)
            setUser(user);
            navigate(`/user`)
        } else {
            throw result;
        }
        } catch (err) {
            const errorsArray = err.errors || {};
            console.log(errorsArray)
            setErrors(errorsArray);
        };

        
    }

    function getErrorsForField(fieldName) {
        if (!Array.isArray(errors)) return null;
      
        return errors
          .filter(error => error.path === fieldName)
          .map((error, index) => <p key={index}>{error.msg}</p>);
      }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor='first_name'>First Name:</label>
                <input id='first_name' name='first_name' type='text' placeholder='e.g. John' onChange={handleChange}></input>
                {getErrorsForField('first_name')}
                <label htmlFor='last_name'>Last Name:</label>
                <input id='last_name' name='last_name' type='text' placeholder='e.g. Smith' onChange={handleChange}></input>
                {getErrorsForField('last_name')}
                <label htmlFor='username'>Username:</label>
                <input id='username' name='username' type='text' placeholder='e.g. JohnSmith123' onChange={handleChange}></input>
                {getErrorsForField('username')}
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email' type='email' placeholder='e.g. johnsmith@email.com' onChange={handleChange}></input>
                {getErrorsForField('email')}
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password' onChange={handleChange}></input>
                {getErrorsForField('password')}
                <label htmlFor='confirm_password'>Confirm password:</label>
                <input id='confirm_password' name='confirm_password' type='password' onChange={handleChange}></input>
                {getErrorsForField('confirm_password')}
                <input type='submit' value='Sign Up'></input>
            </form>
        </main>
    )
}