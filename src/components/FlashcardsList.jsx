
import { FaTrashAlt } from "react-icons/fa"
import './styles/FlashcardsList.css'


const FlashcardsListItem = ({ daysToAppear, onClickOnTrashIcon, phrase }) => {
    
    const getDaysToAppearMessage = () => {
        switch(daysToAppear) {
            case 0:
                return 'Disponível para estudo'
            case 1:
                return `Próxima aparição em ${daysToAppear} dia`
            default:
                return `Próxima aparição em ${daysToAppear} dias`
        }
    }
    
    return (
        <li className="listItem">
            <div className="phraseContainer">
                <button className="button" onClick={onClickOnTrashIcon}>
                    <FaTrashAlt />
                </button>
                <span>{ phrase }</span>
            </div>
            <span className="nextApparitionInfo">{getDaysToAppearMessage()}</span>
        </li>
    )
}


export default ({ children }) => {
    return (
        <ul className="flashcardsList">
            <li className="listTop centralized">Confira Todos os Seus Cards</li>
            { children }
        </ul>
    )
}


export { FlashcardsListItem }