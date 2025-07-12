import { NavLink, Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext'

export default function Header() {
    const { user } = useUser();
    return (
        <header>
            <Link to='/'><h1>Blog</h1></Link>
            <nav>
                <NavLink to='/'>Home</NavLink>
                {!user && <NavLink to='/login'>Log In</NavLink>}
                {user && <NavLink to='/profile'>Profile</NavLink>}
            </nav>
        </header>
    )
}