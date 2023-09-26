import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import './styles/FlashcardSlider.css'


export default ({ children, cardVisible, setCardVisible, lastIndex }) => {
    const [flashcard, setFlashcard] = useState()
    const [index, setIndex] = useState(0)
    
    const leftArrowClickEvent = () => index > 0 && setIndex(index - 1)

    const rightArrowClickEvent = () => index < lastIndex && setIndex(index + 1)

    useEffect(() => {        
        setFlashcard(children[index > lastIndex? lastIndex: index])
        setCardVisible(true)
    }, [index, children])

    return (
        <div className="gamePanel">
            <div className={index === 0? 'arrowIcon disabled': 'arrowIcon'} onClick={leftArrowClickEvent} >
                <FaArrowLeft />
            </div>
                { cardVisible && flashcard }
            <div className={index === lastIndex? 'arrowIcon disabled': 'arrowIcon'} onClick={rightArrowClickEvent}>
                <FaArrowRight />
            </div>
        </div>
    )
}