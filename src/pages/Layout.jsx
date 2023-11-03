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

const NavItemLink = ({ icon, to, label }) => (
    <li className="navItem">
        <Link to={to}>{icon}<div className="dropDownCard">{label}</div></Link>
    </li>
)

const NavItemClickable = ({ icon, onClick, label }) => (
    <li className="navItem" onClick={onClick}>
        <Link>{icon}<div className="dropDownCard">{label}</div></Link>
    </li>
)

const NavBar = ({ setShowHelpMenu }) => {

    const toggleTheme = () => {
        const useLightTheme = JSON.parse(localStorage.getItem('useLightTheme'))
        localStorage.setItem('useLightTheme', !useLightTheme)
        document.body.classList.toggle('light')
    }

    return (
        <NavList>
            <NavItemLink icon={<FaHome />} to="/" label="Início" />
            <NavItemLink icon={<FaEnvelopeSquare />} to="/decks" label="Decks" />
            <NavItemLink icon={<FaBook />} to="/summaries" label="Resumos" />
            <NavItemLink icon={<FaBookmark />} to="/favorites" label="Favoritos" />
            <NavItemLink icon={<FaUser />} to="/user" label="Conta" />
            <NavItemClickable icon={<FaQuestionCircle />} onClick={() => setShowHelpMenu(true)} label="Ajuda" />
            <NavItemClickable icon={<ToggleThemeButton />} onClick={toggleTheme} label="Tema" />
        </NavList>
    )
}

export default () => {

    const checkIfItsFirstUserVisit = () => {
        const localStoreData = JSON.parse(localStorage.getItem('isFirstUseVisit'))
        const isFirstUserVisit = localStoreData || localStoreData === null
        if (isFirstUserVisit)
            localStorage.setItem('isFirstUseVisit', false)
        return isFirstUserVisit
        
    }
    const [showHelpMenu, setShowHelpMenu] = useState(checkIfItsFirstUserVisit())

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
