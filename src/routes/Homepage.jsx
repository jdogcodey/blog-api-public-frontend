import { useLoaderData } from 'react-router-dom';

export default function Homepage() {
    const serverData = useLoaderData().message
    return (
        <main>
            <p>{serverData}</p>
        </main>
    )
}