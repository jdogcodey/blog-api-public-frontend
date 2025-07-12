import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../contexts/userContext.jsx';



export default function Root() {
    const { user: user } = useLoaderData();
    console.log(user)
    const { setUser } = useUser();
    useEffect(() => {
        setUser(user || null)
        
    }, [user, setUser])

    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}