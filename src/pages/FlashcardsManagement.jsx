import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import PlusIcon from '../components/PlusIcon'
import { fetchFlashcards } from '../context/flashcards'
import './styles/FlashcardsManagement.css'
import './styles/Base.css'
import { FaTrashAlt } from "react-icons/fa"

export default () => {
    const { deckID } = useParams()
    const [flashcards, setFlashcards] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    
    const Modal = () => {
        const phraseInput = useRef()
        const translatedPhraseInput = useRef()

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
            if (response.ok) {
                setModalVisible(false)
                renderFlashcards()
            }
         
        }

        return (
            <div className="modal">
                <form 
                    method="POST" 
                    className="addFlashcardsForm centralized popup"
                    onSubmit={(event) => {
                        event.preventDefault()
                        addFlashcard()
                    }}
                    >
                    <h2 className="formTitle">Adicione um novo flashcard:</h2>
                    <div className="flashcardsPhraseInput">
                        <label htmlFor="phraseInput">Frente: </label>
                        <input ref={phraseInput} type="text" id="phraseInput" required/>
                    </div>
                    <div className="flashcardsPhraseInput">
                        <label htmlFor="translatedPhraseInput">Verso: </label>
                        <input ref={translatedPhraseInput} type="text" id="translatedPhraseInput" required/>
                    </div>
                    <div className="buttonsContainer">
                        <button className="button" type="submit">Adicionar</button>
                        <button className="button" type="submit" onClick={() => {
                            setModalVisible(false)
                        }}>Fechar</button>
                    </div>
                </form>
            </div>
        )
    }

    const renderFlashcards = async () => {
        const response = await fetchFlashcards(deckID, true)
        if (response.ok) {
            const data = await response.json()
            setFlashcards(data)
        }
    }

    useEffect(() => {
        renderFlashcards()
    }, [])


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
            <div style={{position: 'relative'}}>
                <ul className="flashcardsList">
                    <li className="listTop centralized">Confira Todos os Seus Cards</li>
                    {flashcards !== null && flashcards.map((flashcard, idx) => {
                        return (
                            <li className="listItem" key={idx}>
                                <button className="button   " onClick={() => {
                                    deleteFlashcard(flashcard.id, idx)
                                }}><FaTrashAlt /></button>
                                <span>{ flashcard.phrase }</span>
                            </li>
                        )
                    })}
                </ul>
                <PlusIcon onClick={() => {
                    setModalVisible(true)
                }}/>
            </div>
            {modalVisible && <Modal />}
        </div>
    )
}