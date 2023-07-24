import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { fetchFlashcards } from '../context/flashcards'
import './styles/FlashcardsManagement.css'
import './styles/Base.css'

export default () => {
    const { deckID } = useParams()
    const [flashcards, setFlashcards] = useState([])
    const [isListLoading, setIsTableLoading] = useState(true)
    const phraseInput = useRef()
    const translatedPhraseInput = useRef()

    useEffect(() => {
        fetchFlashcards(deckID, true).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setFlashcards(data)
                    setIsTableLoading(false)
                })
            }
        })
    }, [isListLoading])

    const addFlashcard = async () => {
        const [phrase, translatedPhrase] = [phraseInput.current.value, translatedPhraseInput.current.value]
        const data = {
            phrase: phrase,
            translated_phrase: translatedPhrase
        }
        const response = await fetch(`http://127.0.0.1:8000/api/decks/${deckID}/flashcards/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Token ${localStorage.getItem('authtoken')}`,
            },
            body: JSON.stringify(data)
        })
        phraseInput.current.value = ''
        translatedPhraseInput.current.value = ''
        if (response.status === 201) {
            const data = await response.json()
            setFlashcards([...flashcards, data])
        }
     
    }

    const deleteFlashcard = async (flascardID, flashcardIndex) => {
        const response = await fetch(`http://127.0.0.1:8000/api/flashcards/${flascardID}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Token ${localStorage.getItem('authtoken')}`
            }
        })
        if (response.status === 204) {
            const newFlashcards = Array.from(flashcards)
            newFlashcards.splice(flashcardIndex, 1)
            setFlashcards(newFlashcards)
        }
    
    }

    return (
        <div className="flashcardManagement centralized">
            <form 
                method="POST" 
                className="addFlashcardsForm centralized"
                onSubmit={(event) => {
                    event.preventDefault()
                    addFlashcard()
                }}
            >
                <span className="formTitle">Adicione um novo flashcard:</span>
                <div className="flashcardsPhraseInput">
                    <label htmlFor="phraseInput">Frente: </label>
                    <input ref={phraseInput} type="text" id="phraseInput" required/>
                </div>
                <div className="flashcardsPhraseInput">
                    <label htmlFor="translatedPhraseInput">Verso: </label>
                    <input ref={translatedPhraseInput} type="text" id="translatedPhraseInput" required/>
                </div>
                <div className="flashcardsSubmitertter">
                    <button className="button" type="submit">Criar Flashcard</button>
                </div>
            </form>
            <ul className="flashcardsList">
                <li style={{justifyContent: 'center', position: 'sticky', top: 0, left: 0, zIndex: 3, backgroundColor: '#000', fontSize: '22px', fontWeight: 600}}>Confira Todos os Seus Cards</li>
                {!isListLoading && flashcards.map((flashcard, idx) => {
                    return (
                        <li key={idx}>
                            <button onClick={() => {
                                deleteFlashcard(flashcard.id, idx)
                            }}>Deletar</button>
                            { flashcard.phrase }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}