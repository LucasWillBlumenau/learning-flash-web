import { FaUser, FaHome, FaBook, FaBookmark, FaEnvelopeSquare } from 'react-icons/fa'
import { Outlet, Link } from 'react-router-dom';
import ToggleThemeButton from '../components/ToggleThemeButton.';
import './styles/Layout.css'


const NavList = ({ children }) =>(
    <div className="navbarWrapper">
        <ul className="navList">
            {children}
        </ul>
    </div>
)

const NavItem = ({ icon, link, title }) => (
    <li className="navItem">
        <Link to={link}>
            {icon}<div className="dropDownCard">{title}</div>
        </Link>
    </li>
)

const NavBar = () => (
    <NavList>
        <NavItem icon={<FaHome />} link="/" title="Início" />
        <NavItem icon={<FaEnvelopeSquare />} link="/decks" title="Decks" />
        <NavItem icon={<FaBook />} link="/summaries" title="Resumos" />
        <NavItem icon={<FaBookmark />} link="/favorites" title="Favoritos" />
        <NavItem icon={<FaUser />} link="/user" title="Conta" />
        <NavItem icon={<ToggleThemeButton />} title="Tema" />
    </NavList>
)

export default () => (
    <>
        <NavBar />
        <div className='pageContent'>
            <Outlet />
        </div> 
    </>
)
