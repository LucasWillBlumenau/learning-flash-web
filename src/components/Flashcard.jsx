import { useState } from 'react'
import './styles/Flashcard.css'




export default ({ id, phrase, translatedPhrase, handleFlashcardClick }) => {
    const [cardPhrase, setPhrase] = useState(phrase)

    const updateFlashcard = async (flashcardID, hasGoodDomainLevel) => {
        const data = { has_good_domain_level: hasGoodDomainLevel }
        const response = await fetch(`http://127.0.0.1:8000/api/flashcards/${flashcardID}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Token ${localStorage.getItem('authtoken')}`
            },
            body: JSON.stringify(data)
        })
        
        if (!response.ok) {
            alert('Houve algum erro ao atualizar status do flashcard')
        }


    }
    return (
        <div className="flashcard">
            <div className="flashcardPhrase" onClick={() => {
                setPhrase(cardPhrase === phrase? translatedPhrase: phrase)
            }}>
                { cardPhrase } 
            </div>
            <div className="flashcardButtons">
                <span>Nível de domínio</span>
                <div>
                    <button 
                        onClick={() => {
                            handleFlashcardClick(id, false)
                            updateFlashcard(id, false)
                        }}
                    >Ruim</button>
                    <button
                        onClick={() => {
                            handleFlashcardClick(id, true)
                            updateFlashcard(id, true)
                        }}
                    >Bom</button>
                </div>
            </div>
        </div>
    )
}