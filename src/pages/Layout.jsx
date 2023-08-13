import { FaUser, FaHome, FaBook, FaEnvelopeSquare } from 'react-icons/fa'
import { Outlet, Link } from 'react-router-dom';
import './styles/Layout.css'


const NavBar = () => {
    return (
        <div className="navbarWrapper">
            <ul className="navList">
                <li className="navItem">
                    <Link to="/">
                        <FaHome />
                        <span className="navItemText">Início</span>
                    </Link>
                </li>
                <li className="navItem">
                    <Link to="/decks">
                        <FaEnvelopeSquare />
                        <span className="navItemText">Cards</span>
                    </Link>
                </li>
                <li className="navItem">
                    <Link to="/summaries">
                        <FaBook />
                        <span className="navItemText">Resumos</span>
                    </Link>
                </li>
                <li className="navItem">
                    <Link to="/user">
                        <FaUser />
                        <span className="navItemText">Conta</span>
                    </Link>
                </li>
            </ul>
        </div>
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