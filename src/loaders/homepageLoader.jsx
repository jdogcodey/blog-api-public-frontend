

export default async function homepageLoader() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${baseURL}/`, {
        mode: 'cors'
    });
    if (!res.ok) throw new Error('Failed to fetch homepage');
    return res.json();
}