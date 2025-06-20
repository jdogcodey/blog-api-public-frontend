import { NavLink, Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Link to='/'><h1>Blog</h1></Link>
            <nav>
                <NavLink to='/'>Home</NavLink>
            </nav>
        </header>
    )
}