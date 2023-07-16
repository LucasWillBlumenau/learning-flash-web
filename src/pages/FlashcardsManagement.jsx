import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import getFlashcards from '../context/flashcards'
import './styles/FlashcardsManagement.css'


export default () => {
    const { deckID } = useParams()
    const [flashcards, setFlashcards] = useState([])
    const [isListLoading, setIsTableLoading] = useState(true)
    const phraseInput = useRef()
    const translatedPhraseInput = useRef()

    useEffect(() => {
        getFlashcards(deckID, true).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setFlashcards(data)
                    setIsTableLoading(false)
                })
            }
        })
    }, [isListLoading])

    const addFlashcard = () => {
        const [phrase, translatedPhrase] = [phraseInput.current.value, translatedPhraseInput.current.value]
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
        }).then(res => {
            phraseInput.current.value = ''
            translatedPhraseInput.current.value = ''
            if (res.status === 201) {
                res.json().then(data => {
                    setFlashcards([...flashcards, data])
                })
            }
        })
    }

    const deleteFlashcard = (flascardID, flashcardIndex) => {
        fetch(`http://127.0.0.1:8000/api/flashcards/${flascardID}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Basic ${localStorage.getItem('userkey')}`
            }
        }).then(res => {
            if (res.status === 204) {
                const newFlashcards = Array.from(flashcards)
                newFlashcards.splice(flashcardIndex, 1)
                setFlashcards(newFlashcards)
            }
        })
    }

    return (
        <div className="flashcardManagement">
            <form 
                method="POST" 
                className="addFlashcardsForm"
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
                    <button type="submit">Criar Flashcard</button>
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