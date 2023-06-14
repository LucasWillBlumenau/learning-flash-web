import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getSummary from '../context/summary'
import './styles/Summary.css'

export default () => {
    const { bookID } = useParams()
    const [book, setBook] = useState({})

    useEffect(() => {
        getSummary(bookID).then(data => {
            setBook(data)
        })
    }, [])
    return (
        <div className="bookTextContainer">
            <div className="bookTitle">
                <span>{book.title}</span>
                <span>{book.author}</span>
            </div>
            <div className="bookContent">
                <p>
                    {book.text_content}
                </p>
            </div>
        </div>
    )
}