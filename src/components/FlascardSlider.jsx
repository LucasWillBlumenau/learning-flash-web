import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import './styles/FlashcardSlider.css'


export default props => {
    const [flashcard, setFlashcard] = useState()
    const flashCardsAmount = props.children.length - 1
    useEffect(() => {
        setFlashcard(props.children[props.index])
    }, [props.index, props.children])
    return (
        
        <div style={{display: 'flex', alignItems: 'center', gap: '15px', position: 'relative'}}>
            <div className="arrowIcon" onClick={() => {
                if(props.index > 0) {
                    props.setIndex(props.index - 1)
                }
            }} >
                <FaArrowLeft />
            </div>
                { flashcard }
            <div className="arrowIcon" onClick={() => {
                if (props.index < flashCardsAmount) {
                    props.setIndex(props.index + 1)
                }
            }}>
                <FaArrowRight />
            </div>
        </div>
    )
}