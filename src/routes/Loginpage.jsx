import { useLoaderData } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export async function loader() {
    const res = await fetch(`${baseURL}/login`, {
        mode: 'cors'
    });
    if (!res.ok) throw new Error('Failed to fetch homepage');
    return res.json();
}

export default function LoginPage() {
    const serverData = useLoaderData().message
    return (
        <main>
            <form>
                <label htmlFor='first_name'>First Name:</label>
                <input id='first_name' name='first_name' type='text' placeholder='e.g. John' ></input>
                <label htmlFor='last_name'>Last Name:</label>
                <input id='last_name' name='last_name' type='text' placeholder='e.g. Smith'></input>
                <label htmlFor='username'>Username:</label>
                <input id='username' name='username' type='text' placeholder='e.g. JohnSmith123'></input>
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email' type='email' placeholder='e.g. johnsmith@email.com'></input>
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password'></input>
                <label htmlFor='confirm-password'>Confirm password:</label>
                <input id='confirm-password' name='confirm-password' type='password'></input>
                <input type='submit' value='Sign Up'></input>
            </form>
        </main>
    )
}