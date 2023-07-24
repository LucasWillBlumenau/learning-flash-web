import './styles/DeckRow.css'
import {
    FaTrashAlt,
    FaPencilAlt,
    FaPlay,
} from 'react-icons/fa'
import  { Link } from 'react-router-dom'


export default ({ id, name, description, renderDecks }) => {
    const deleteDeck = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/decks/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${localStorage.getItem('authtoken')}`
            }
        })
        if (response.ok) {
            renderDecks()
        } else {
            alert('Erro ao deletar flashcard')
            
        }
    }

    return (
        <tr className="flashcardRow">
            <td>
                <div className="optionButtonsContainer">
                    <Link to={`/decks/${id}/edit`}>
                        <button className="optionButton">
                            <FaPencilAlt />
                        </button>
                    </Link>
                    <Link to={`/decks/${id}`}>
                        <button className="optionButton">
                            <FaPlay />
                        </button>
                    </Link>
                    <Link to="/decks/">
                        <button className="optionButton"
                            onClick={deleteDeck}
                        >
                            <FaTrashAlt />
                        </button>
                    </Link>
                </div>
            </td>
            <td>
                <div>
                    { name }
                </div>
            </td>
            <td>
                <div>
                    { description }
                </div>
            </td>
        </tr>
    )   
}