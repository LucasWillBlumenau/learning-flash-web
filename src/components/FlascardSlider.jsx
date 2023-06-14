import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default props => {
    const [index, setIndex] = useState(0)
    const [flashcard, setFlashcard] = useState()
    useEffect(() => {
        console.log(props.children)
        let newFlashcard = props.children.filter((child, idx) => idx === index)
        console.log(newFlashcard)
        setFlashcard(newFlashcard)
    }, [index])
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <FaArrowLeft onClick={() => {
                if(index > 0) {
                    setFlashcard('')
                    setIndex(index - 1)
                }
            }} />
            { flashcard }
            <FaArrowRight onClick={() => {
                setFlashcard('')
                setIndex(index + 1)
            }}/>
        </div>
    )
}