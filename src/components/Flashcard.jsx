import {  useState } from 'react'
import API_URL from '../context/api-url'
import './styles/Flashcard.css'



export default ({ id, phrase, translatedPhrase, handleFlashcardClick }) => {
    const [cardPhrase, setCardPhrase] = useState(phrase)
    const [changePhraseSpanMessage, setChangePhraseSpanMessage] = useState('Ver Verso')

    const updateFlashcard = async (flashcardID, hasGoodDomainLevel) => {
        const data = { has_good_domain_level: hasGoodDomainLevel }
        const response = await fetch(`${API_URL}/api/flashcards/${flashcardID}/`, {
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

    const swapPhrase = () => {
        if (cardPhrase === phrase) {
            setCardPhrase(translatedPhrase)
            setChangePhraseSpanMessage('Ver Frente')
        } else {
            setCardPhrase(phrase)
            setChangePhraseSpanMessage('Ver Verso')
        }
    }

    return (
        <div className="flashcard">
            <div className="flashcardPhrase">
                {cardPhrase} 
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
            <span className="link" onClick={swapPhrase}>{changePhraseSpanMessage}</span>
        </div>
    )
}