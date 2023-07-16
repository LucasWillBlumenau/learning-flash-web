import './styles/DeckRow.css'
import {
    FaTrashAlt,
    FaPencilAlt,
    FaPlay,
} from 'react-icons/fa'
import  { Link } from 'react-router-dom'
import { useState } from 'react'

export default ({ id, name, description }) => {
    const deleteDeck = () => {
        fetch(`http://127.0.0.1:8000/api/decks/${id}/`, {
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