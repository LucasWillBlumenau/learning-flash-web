import { FaPlus } from "react-icons/fa"
import './styles/Icon.css'


export default ({onClick}) => {
    return (
        <div className="icon" style={{right: '15px'}} onClick={onClick}>
            <FaPlus />
        </div>
    )
}