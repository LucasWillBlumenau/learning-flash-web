import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import Flashcard from "../components/Flashcard"
import FlashcardsSlider from '../components/FlascardSlider'

import { fetchFlashcards } from '../context/flashcards'

import './styles/Flashcards.css'
import './styles/Base.css'


export default () => {
    const { deckID } = useParams()
    const [gameStarted, setGameStarted] = useState(false)
    const [flashcards, setFlashcards] = useState(null)
    const [cardVisible, setCardVisible] = useState(false)
    const [lastIndex, setLastIndex] = useState()
    const navigate = useNavigate()

    const handleFlashcardClick = (id, hasGoodDomainLevel) => {
        setCardVisible(false)
        const newFlashcards = flashcards.filter(flashcard => flashcard.id !== id) 
        if (hasGoodDomainLevel) {
            setFlashcards(newFlashcards)
            setLastIndex(lastIndex - 1)
        } else {
            const [remaingFlashcard] = flashcards.filter(flashcard => flashcard.id === id)
            setFlashcards([...newFlashcards, remaingFlashcard])
        }
    }

    const renderFlashcards = async () => {
        const response = await fetchFlashcards(deckID, false)
        if (response.status === 200) {
            const data = await response.json()
            setFlashcards(data)
            setLastIndex(data.length - 1)
        } 
    }

    const Flashcards = () => {
        
        return flashcards.map((flashcard, idx) => {
            return (
                <Flashcard key={idx}
                    id={flashcard.id}
                    phrase={flashcard.phrase}
                    translatedPhrase={flashcard.translated_phrase}
                    handleFlashcardClick={handleFlashcardClick}
                />
            )
        })
    }

    useEffect(() => {
        renderFlashcards()
    }, [])
    
    return (
        <div className="gameContainer centralized">
           {gameStarted?
            (flashcards !== null &&
            <FlashcardsSlider 
                cardVisible={cardVisible}
                setCardVisible={setCardVisible}
                lastIndex={lastIndex}
                setLastIndex={setLastIndex}
            >
                {flashcards.length === 0? setGameStarted(false): Flashcards()}
            </FlashcardsSlider>):
            (flashcards !== null && 
                <div className="startGameMenu centralized">
                    
                    {(flashcards.length === 0? 
                        <>
                            <p>Você não tem nenhum flashcard para estudar hoje!</p>
                            <button className="button" onClick={() => {
                                navigate('/decks')
                            }}>Ver decks</button>
                        </>:
                        <>
                            {(flashcards.length === 1?
                            <p>Você tem {flashcards.length} flashcard para estudar!</p>:
                            <p>Você tem {flashcards.length} flashcards para estudar!</p>
                            )}
                            <button className="button" onClick={() => {
                                setGameStarted(true)
                            }}>Começar jogo</button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}