import { FaPlus } from "react-icons/fa"
import './styles/PlusIcon.css'


export default ({onClick}) => {
    return (
        <div className="plusIcon" onClick={onClick}>
            <FaPlus />
        </div>
    )
}