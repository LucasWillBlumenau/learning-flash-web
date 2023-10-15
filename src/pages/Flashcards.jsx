import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { fetchFlashcards } from '../context/flashcards'

import Flashcard from '../components/Flashcard'
import FlashcardsSlider from '../components/FlascardSlider'

import './styles/Flashcards.css'


const StartGameMessage = ({ flashcardsAmount }) => (
    flashcardsAmount === 0?
    <p>Você tem {flashcardsAmount} flashcard para estudar!</p>:
    <p>Você tem {flashcardsAmount} flashcards para estudar!</p>
)

const GamePanel = ({ flashcards, setGameStarted }) => {

    const navigate = useNavigate()

    const startGame = () => setGameStarted(true)

    const getBackToDecksPage = () => navigate('/decks')

    return (
        <div className="startGameMenu centralized">
            {(flashcards.length === 0? 
                <>
                    <p>Você não tem nenhum flashcard para estudar hoje!</p>
                    <button className="button" onClick={getBackToDecksPage}>Ver decks</button>
                </>:
                <>
                    <StartGameMessage flashcardsAmount={flashcards.length} />
                    <button className="button" onClick={startGame}>Começar jogo</button>
                </>
            )}
        </div>
    )
}


export default () => {
    const { deckID } = useParams()
    const [gameStarted, setGameStarted] = useState(false)
    const [flashcards, setFlashcards] = useState(null)
    const [cardVisible, setCardVisible] = useState(false)
    const [lastIndex, setLastIndex] = useState()

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
                <GamePanel 
                    flashcards={flashcards}
                    setGameStarted={setGameStarted}
                />
            )}
        </div>
    )
}