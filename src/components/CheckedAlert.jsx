import { FaCheck } from 'react-icons/fa'
import { useEffect } from 'react'
import './styles/CheckedAlert.css'

export default ({ message, timeToDisapear, active, setActive }) => {

    useEffect(() => {
        setTimeout(() => setActive(false), timeToDisapear)
    })
    return active && (
        <div className="modal">
            <div className="checkedIconWrapper centralized">
                <FaCheck />
                <p>{message}</p>
            </div>
        </div>
    )
}