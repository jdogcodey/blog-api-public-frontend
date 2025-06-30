import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function Root() {
    const [user, setUser] = useState(null);
    return (
        <>
        <Header />
        <Outlet context={{user, setUser}} />
        <Footer />
        </>
    )
}