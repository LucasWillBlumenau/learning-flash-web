import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import './styles/FlashcardSlider.css'


export default props => {
    const { children, cardVisible, setCardVisible } = props
    const [flashcard, setFlashcard] = useState()
    const flashCardsAmount = children.length - 1
    const [index, setIndex] = useState(0)
    useEffect(() => {        
        setFlashcard(children[index])
        setCardVisible(true)
    }, [index, children])
    return (
        
        <div style={{display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', maxWidth: '85vw'}}>
            <div className="arrowIcon" onClick={() => {
                if(index > 0) {
                    setIndex(index - 1)
                }
            }} >
                <FaArrowLeft />
            </div>
                { cardVisible && flashcard }
            <div className="arrowIcon" onClick={() => {
                if (index < flashCardsAmount) {
                    setIndex(index + 1)
                }
            }}>
                <FaArrowRight />
            </div>
        </div>
    )
}