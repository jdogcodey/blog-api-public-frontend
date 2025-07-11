import { NavLink, Link, useOutletContext } from 'react-router-dom';

export default function Header() {
    const { user } = useOutletContext();
    return (
        <header>
            <Link to='/'><h1>Blog</h1></Link>
            <nav>
                <NavLink to='/'>Home</NavLink>
                {!user && <NavLink to='/login'>Log In</NavLink>}
                {user && <NavLink to='/user'>Profile</NavLink>}
            </nav>
        </header>
    )
}