import { useState } from 'react'
import './styles/Flashcard.css'

export default props => {
    const [phrase, setPhrase] = useState(props.phrase)
    return (
        <div className="flashcard">
            <div className="flashcardPhrase" onClick={() => {
                setPhrase(phrase === props.phrase? props.translatedPhrase: props.phrase)
            }}>
                {phrase}
            </div>
            <div className="flashcardButtons">
                <span>Nível de domínio</span>
                <div>
                    <button>Ruim</button>
                    <button>Bom</button>
                </div>
            </div>
        </div>
    )
}