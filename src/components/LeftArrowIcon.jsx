import { FaArrowLeft } from "react-icons/fa"
import './styles/Icon.css'

export default ({onClick}) => {
    return (
        <div className="icon" style={{left: '15px'}} onClick={onClick}>
            <FaArrowLeft />
        </div>
    )
}