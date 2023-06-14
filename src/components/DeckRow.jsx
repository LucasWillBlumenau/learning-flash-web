import './styles/DeckRow.css'
import  { Link } from 'react-router-dom'

export default props => {
    return (
        <tr className="flashcardRow">
            <td>
                <div className="optionButtonsContainer">
                    <button className="optionButton">Editar</button>
                    <Link to={`/decks/${props.id}`}>
                        <button className="optionButton">Treinar</button>
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
            <td>
                <div>
                    0
                </div>
            </td>
        </tr>
    )   
}