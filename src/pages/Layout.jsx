import { FaUser, FaHome, FaBook, FaBookmark, FaEnvelopeSquare } from 'react-icons/fa'
import { Outlet, Link } from 'react-router-dom';
import ToggleThemeButton from '../components/ToggleThemeButton.';
import './styles/Layout.css'


const NavList = ({ children }) => {
    return (
        <div className="navbarWrapper">
            <ul className="navList">
                {children}
            </ul>
        </div>
    )

}

const NavItem = ({ icon, link, title }) => {
    return (
        <li className="navItem">
            <Link to={link}>
                {icon}
                <span className="navItemText">{title}</span>
            </Link>
        </li>
    )
}

const NavBar = () => {
    return (
        <NavList>
            <NavItem icon={<FaHome />} link="/" title="Início" />
            <NavItem icon={<FaEnvelopeSquare />} link="/decks" title="Decks" />
            <NavItem icon={<FaBook />} link="/summaries" title="Resumos" />
            <NavItem icon={<FaBookmark />} link="/favorites" title="Favoritos" />
            <NavItem icon={<FaUser />} link="/user" title="Conta" />
            <NavItem icon={<ToggleThemeButton />} title="Tema" />
        </NavList>
    )
}

export default () => {
    return (
        <>
            <NavBar />
            <div className='pageContent'>
                <Outlet />
            </div> 
        </>
    )
}