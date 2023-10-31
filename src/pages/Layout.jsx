import { FaUser, FaHome, FaBook, FaBookmark, FaEnvelopeSquare, FaQuestionCircle } from 'react-icons/fa'
import { Outlet, Link } from 'react-router-dom'
import ToggleThemeButton from '../components/ToggleThemeButton.'
import HelpModal from '../components/HelpModal'
import './styles/Layout.css'
import { useState } from 'react'


const NavList = ({ children }) =>(
    <div className="navbarWrapper">
        <ul className="navList">{children}</ul>
    </div>
)

const NavItemLink = ({ icon, link, title }) => (
    <li className="navItem">
        <Link to={link}>
            {icon}<div className="dropDownCard">{title}</div>
        </Link>
    </li>
)

const NavItemClick = ({ icon, onClick, title }) => (
    <li className="navItem" onClick={onClick}>
        <Link>
            {icon}<div className="dropDownCard">{title}</div>
        </Link>
    </li>
)

const NavItem = ({ icon, title }) => (
    <li className="navItem">
        <Link>
            {icon}<div className="dropDownCard">{title}</div>
        </Link>
    </li>
)

const NavBar = ({ setShowHelpMenu }) => (
    <NavList>
        <NavItemLink icon={<FaHome />} link="/" title="Início" />
        <NavItemLink icon={<FaEnvelopeSquare />} link="/decks" title="Decks" />
        <NavItemLink icon={<FaBook />} link="/summaries" title="Resumos" />
        <NavItemLink icon={<FaBookmark />} link="/favorites" title="Favoritos" />
        <NavItemLink icon={<FaUser />} link="/user" title="Conta" />
        <NavItemClick icon={<FaQuestionCircle />} onClick={() => setShowHelpMenu(true)} title="Ajuda" />
        <NavItem icon={<ToggleThemeButton />} title="Tema" />
    </NavList>
)

export default () => {

    const [showHelpMenu, setShowHelpMenu] = useState(false)

    return (
        <>
            <NavBar setShowHelpMenu={setShowHelpMenu} />
            <div className='pageContent'>
                <Outlet />
            </div>
            {showHelpMenu && <HelpModal setShowHelpMenu={setShowHelpMenu} />}
        </>
    )
}
