import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Flashcard from "../components/Flashcard"
import FlashcardsSlider from '../components/FlascardSlider'

import getFlashcards from '../context/flashcards'


export default () => {
    const { deckID } = useParams()
    const [flashcards, setFlashcards] = useState([])
    const [cardVisible, setCardVisible] = useState(false)
    const [lastIndex, setLastIndex] = useState(flashcards.length - 1)

    const handleFlashcardClick = (id, hasGoodDomainLevel) => {
        setCardVisible(false)
        const newFlashcards = flashcards.filter(flashcard => flashcard.id !== id) 
        if (hasGoodDomainLevel) {
            setFlashcards(newFlashcards)
            setLastIndex(lastIndex - 1)
        } else {
            const remaingFlashcard = flashcards.filter(flashcard => flashcard.id === id)[0]
            setFlashcards([...newFlashcards, remaingFlashcard])
        }
    }

    useEffect(() => {
        getFlashcards(deckID, false).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setFlashcards(data)
                    setLastIndex(data.length - 1)
                })
            } 
        })
    }, [])
    
    return (
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ul>
               
            </ul>
            <FlashcardsSlider 
                cardVisible={cardVisible}
                setCardVisible={setCardVisible}
                lastIndex={lastIndex}
                setLastIndex={setLastIndex}
            >
                {flashcards.map((flashcard, idx) => {
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
            </FlashcardsSlider>
        </div>
    )
}