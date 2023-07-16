import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getSummary from '../context/summary'
import { fetchDecks } from '../context/decks'
import './styles/Summary.css'


const FlashcardsModal = ({ phrase, translatedPhrase }) => {
    const [decks, setDecks] = useState([])
    useEffect(() => {
        fetchDecks().then(res => {
            res.json().then(data => {
                setDecks(data)
            })
        })
    }, [])

    return (
        <div className="modalWrapper">
            <div className="modalPopup">
                <div className="decksList">
                    {decks.map(deck => 
                        <div className="deckOption">
                            <input type="checkbox" />
                            {deck.name}
                        </div>
                    )}
                </div>  
                <div className="modalPhraseContainer">
                    <span>{ phrase } </span>
                    <span>{ translatedPhrase }</span>
                </div>
            </div>
        </div>
    )
}


export default () => {
    const { bookID } = useParams()
    const [book, setBook] = useState({})
    const [textContent, setTextContent] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const removeWhiteSpaces = content => content !== '' && content !== ' '

    
    const renderTextContent = (textContent) => {
        const splitedText = textContent.split('.').filter(removeWhiteSpaces)
        const content = splitedText.map((phrase, idx) => {
            const query = phrase.trim().toLowerCase().split(' ').join('%20')
            return (
                <span key={idx} onClick={() => {
                    const url = `http://127.0.0.1:8000/api/phrases/${query}`
                    fetch(url).then(res => {
                        if (res.status === 200) {
                            res.json().then(data => {
                                console.log(data)
                                setModalVisible(true)
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
        <>
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
            {modalVisible &&
                <FlashcardsModal 
                    phrase="This is a phrase" 
                    translatedPhrase="Isso é uma frase" 
                />
            }
        </>
    )
}