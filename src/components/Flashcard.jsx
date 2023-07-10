import { useState } from 'react'
import './styles/Flashcard.css'




export default props => {
    const [phrase, setPhrase] = useState(props.phrase)
    const { handleFlashcardClick } = props

    const updateFlashcard = (flashcardID, hasGoodDomainLevel) => {
        const data = { has_good_domain_level: hasGoodDomainLevel }
        fetch(`http://127.0.0.1:8000/api/flashcards/${flashcardID}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Basic ${localStorage.getItem('userkey')}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.status == 201) {
                console.log('flashcard atualizado')
            }
        })
    }
    return (
        <div className="flashcard">
            <div className="flashcardPhrase" onClick={() => {
                setPhrase(phrase === props.phrase? props.translatedPhrase: props.phrase)
            }}>
                { phrase } 
            </div>
            <div className="flashcardButtons">
                <span>Nível de domínio</span>
                <div>
                    <button
                        onClick={() => {
                            handleFlashcardClick(props.id, false)
                            updateFlashcard(props.id, false)
                        }}
                    >Ruim</button>
                    <button
                        onClick={() => {
                            handleFlashcardClick(props.id, true)
                            updateFlashcard(props.id, true)
                        }}
                    >Bom</button>
                </div>
            </div>
        </div>
    )
}