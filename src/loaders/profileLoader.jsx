export default async function profileLoader() {
    const token = localStorage.getItem('token');
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    if (!token) return { user: null }
    
    const res = await fetch(`${baseURL}/user`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const result = await res.json();

    if (!res.ok) return { user: null } // Ultimately this should be changed to give a proper error

    const { data } = result;

    return { user: data.user }
}