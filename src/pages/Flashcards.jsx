import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Flashcard from "../components/Flashcard"
import FlashcardsSlider from '../components/FlascardSlider'

import getFlashcards from '../context/flashcards'


export default () => {
    const { deckID } = useParams()
    const [flashcards, setFlashcards] = useState([])
    const [index, setIndex] = useState(0)
    useEffect(() => {
        getFlashcards(deckID).then(data => {
            setFlashcards(data)
        })
    }, [])
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ul>
               
            </ul>
            <FlashcardsSlider 
                index={index}
                setIndex={setIndex}
            >
                {flashcards.map((flashcard, idx) => {
                    return (
                        <Flashcard key={idx}
                            id={flashcard.id}
                            phrase={flashcard.phrase}
                            translatedPhrase={flashcard.translated_phrase}
                        />
                    )
                    })
                }
            </FlashcardsSlider>
        </div>
    )
}