import { FaArrowRight } from 'react-icons/fa'
import './styles/ProfileOptions.css'

const ProfileOptions = ({ title, children }) => {
    return (
        <>
            <h2 className="optionsTitle">{ title }</h2>
            <ul className="profileOptions">
                { children }
            </ul>
        </>
    )
}

const ProfileOption = ({ title, onClick }) => {
    return(
        <li className="profileOption" onClick={onClick}>
            <span>{ title }</span>
            <FaArrowRight />
        </li>
    )
}

export { ProfileOptions, ProfileOption }