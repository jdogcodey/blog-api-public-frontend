import { useLoaderData } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export async function loader() {
    const res = await fetch(`${baseURL}/`, {
        mode: 'cors'
    });
    if (!res.ok) throw new Error('Failed to fetch homepage');
    return res.json();
}

export default function Homepage() {
    const serverData = useLoaderData().message
    return (
        <main>
            <p>{serverData}</p>
        </main>
    )
}