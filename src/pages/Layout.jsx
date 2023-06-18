import { FaUser, FaHome, FaBook, FaEnvelopeSquare } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import LoginPage from './LoginPage'
import './styles/Layout.css'


function NavBar() {
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
                    <Link to="#">
                        <FaUser />
                        <span className="navItemText">Preferências</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default () => {
    const [contentVisible, setContentVisible] = useState(false)
    useEffect(() => {
        const userKey = localStorage.getItem('userkey')
        if(userKey) {
            setContentVisible(true)
        } 
    }, [])
    return (
        contentVisible ?
            <>
                <NavBar />
                <div className='pageContent'>
                    <Outlet />
                </div> 
            </>:
        <LoginPage 
            setContentVisible={setContentVisible} 
        />
    )
}