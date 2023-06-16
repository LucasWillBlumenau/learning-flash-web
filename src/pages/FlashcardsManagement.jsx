import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import getFlashcards from '../context/flashcards'
import './styles/FlashcardsManagement.css'


function addFlashcard(deckID, phraseEl, translatedPhraseEl) {
    const [phrase, translatedPhrase] = [phraseEl.value, translatedPhraseEl.value]
    const data = {
        phrase: phrase,
        translated_phrase: translatedPhrase
    }
    fetch(`http://127.0.0.1:8000/api/decks/${deckID}/flashcards/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/JSON',
            'Authorization': `Basic ${localStorage.getItem('userkey')}`,

        },
        body: JSON.stringify(data)
    }).then(() => {
        phraseEl.value = ''
        translatedPhraseEl.value = ''
    })
}

function deleteFlashcard(deckID) {
    fetch(`http://127.0.0.1:8000/api/flashcards/${deckID}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'Application/JSON',
            'Authorization': `Basic ${localStorage.getItem('userkey')}`
        }
    }).then(res => {
        if (res.status === 201) {
            console.log('flashcard deletado')
        }
    })
}

export default () => {
    const { deckID } = useParams()
    const [flashcards, setFlashcards] = useState([])
    const phraseInput = useRef()
    const translatedPhraseInput = useRef()

    useEffect(() => {
        getFlashcards(deckID).then(data => {
            setFlashcards(data)
        })
    }, [flashcards])
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100vh', gap: '2rem'}}>
            <form 
                method="POST" 
                className="addFlashcardsForm"
                onSubmit={(event) => {
                    event.preventDefault()
                    addFlashcard(deckID, phraseInput.current, translatedPhraseInput.current)
                }}
            >
                <span className="formTitle">Adicione um novo flashcard:</span>
                <div className="flashcardsPhraseInput">
                    <label htmlFor="phraseInput">Frente: </label>
                    <input ref={phraseInput} type="text" id="phraseInput" />
                </div>
                <div className="flashcardsPhraseInput">
                    <label htmlFor="translatedPhraseInput">Verso: </label>
                    <input ref={translatedPhraseInput} type="text" id="translatedPhraseInput" />
                </div>
                <div className="flashcardsSubmitertter">
                    <button type="submit">Criar Flashcard</button>
                </div>
            </form>
            <ul className="flashcardsList">
                <li style={{justifyContent: 'center', position: 'sticky', top: 0, zIndex: 3, backgroundColor: '#000', fontSize: '22px', fontWeight: 600}}>Confira Todos os Seus Cards</li>
                {flashcards.map((flashcard, idx) => {
                    return (
                        <li key={idx}>
                            <button onClick={() => {
                                deleteFlashcard(flashcard.id)
                            }}>Deletar</button>
                            { flashcard.phrase }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}