import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getSummary from '../context/summary'
import './styles/Summary.css'

export default () => {
    const { bookID } = useParams()
    const [book, setBook] = useState({})
    const [textContent, setTextContent] = useState([])
    const removeWhiteSpaces = content => content !== '' && content !== ' '

    const getQueryBasedOnPhrase = (phrase) => {
        const chars = phrase.toLowerCase().split(' ')
        return chars.filter(removeWhiteSpaces).join('_')
    }
    
    const renderTextContent = (textContent) => {
        const splitedText = textContent.split('.').filter(removeWhiteSpaces)
        const content = splitedText.map(phrase => {
            const query = getQueryBasedOnPhrase(phrase)
            return (
                <span onClick={() => {
                    fetch(`http://127.0.0.1:8000/api/phrases/${query}`)
                        .then(res => {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    console.log(data)
                                })
                            } else if (res.status === 404) {
                                console.log(query)
                                console.log('esta frase não foi adicionada ainda')
                            }
                        })
                }}>
                    {phrase}.
                </span>
            )
        })
        setTextContent(content)
    }

    useEffect(() => {
        getSummary(bookID).then(data => {
            setBook(data)
            renderTextContent(data.text_content)
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
                    {textContent}
                </p>
            </div>
        </div>
    )
}