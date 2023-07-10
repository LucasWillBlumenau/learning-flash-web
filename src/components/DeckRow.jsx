import './styles/DeckRow.css'
import {
    FaTrashAlt,
    FaPencilAlt,
    FaPlay,
} from 'react-icons/fa'
import  { Link } from 'react-router-dom'
import { useState } from 'react'

export default props => {
    const [deletePopupVisible, setDeletePopupVisible] = useState(false)
    const deleteDeck = () => {
        fetch(`http://127.0.0.1:8000/api/decks/${props.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${localStorage.getItem('userkey')}`
            }
        }).then(res => {
            if (res.status === 204) {
                console.log('deletado')
            }
        })
    }

    return (
        <tr className="flashcardRow">
            <td>
                <div className="optionButtonsContainer">
                    <Link to={`/decks/${props.id}/edit`}>
                        <button className="optionButton">
                            <FaPencilAlt />
                        </button>
                    </Link>
                    <Link to={`/decks/${props.id}`}>
                        <button className="optionButton">
                            <FaPlay />
                        </button>
                    </Link>
                    <Link>
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
                    {props.name}
                </div>
            </td>
            <td>
                <div>
                    {props.description}
                </div>
            </td>
        </tr>
    )   
}