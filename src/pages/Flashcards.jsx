import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Flashcard from "../components/Flashcard"
import FlashcardsSlider from '../components/FlascardSlider'

import getFlashcards from '../context/flashcards'


export default () => {
    const { deckID } = useParams()
    const [flashcards, setFlashcards] = useState([])
    useEffect(() => {
        getFlashcards(deckID).then(data => {
            setFlashcards(data)
        })
    }, [])
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ul>
               
            </ul>
            <FlashcardsSlider>
                {flashcards.map((flashcard, idx) => {
                    return (
                        <Flashcard key={idx}
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