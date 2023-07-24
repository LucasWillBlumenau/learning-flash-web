import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getSummary from '../context/summary'

import { fetchDecks } from '../context/decks'
import './styles/Summary.css'


export default () => {
    const { bookID } = useParams()
    const [book, setBook] = useState({})
    const [textContent, setTextContent] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [phrase, setPhrase] = useState()
    const [translatedPhrase, setTranslatedPhrase] = useState()

    const FlashcardsModal = ({ phrase, translatedPhrase }) => {
        const [decks, setDecks] = useState([])
        const [selectedDeck, setSelectedDeck] = useState()

        const getDecks = async () => {
            const response = await fetchDecks()
            const data = await response.json()
            setDecks(data)
        }

        const addFlashcard = async () => {
            const body = { phrase: phrase, translated_phrase: translatedPhrase }    
            const response = await fetch(`http://127.0.0.1:8000/api/decks/${selectedDeck.id}/flashcards/`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'Application/JSON',
                    'Authorization': `Token ${localStorage.getItem('authtoken')}`
                },
                body: JSON.stringify(body),
            })

            if (response.ok) {
                alert('Flashcard adicionado com sucesso!')
                setModalVisible(false)
            }
        }

        useEffect(() => {
            getDecks()
        }, [])


        return (
            <div className="modalWrapper">
                <div className="modalPopup">
                    <h2>Selecione o deck:</h2>
                    <div className="decksList">
                        {decks.map((deck, i) => 
                            <div key={i} className="deckOption">
                                <input type="radio" name="deckOption" onChange={() => {
                                    setSelectedDeck(deck)
                                }}/>
                                { deck.name }
                            </div>
                        )}
                    </div>  
                    <h2>Card a ser adicionado:</h2>
                    <div className="modalPhraseContainer">
                        <span>{ phrase } </span>
                        <span>{ translatedPhrase }</span>
                    </div>
                    <div className="addCardButtonsContainer">
                        <button onClick={() => {
                            addFlashcard()
                        }}>Adicionar</button>
                        <button onClick={() => {
                            setModalVisible(false)
                        }}>Fechar</button>
                    </div>
                </div>
            </div>
        )
    }

    const renderTextContent = (textContent) => {
        const splitedText = textContent.match(/[^\.!\?]+[\.\!\?]/)
        const content = splitedText.map((phrase, idx) => {
            return (
                <span key={idx} onClick={async () => {
                    const query = phrase.trim().toLowerCase().split(' ').join('%20')
                    const url = `http://127.0.0.1:8000/api/phrases/${query}`
                    const response = await fetch(url)
                    if (response.ok) {
                        const data = await response.json()
                        setPhrase(data.phrase)
                        setTranslatedPhrase(data.translated_phrase)
                        setModalVisible(true)
                    } else if (response.status === 404) {
                        console.log('esta frase não foi adicionada ainda')
                    }
                }}>
                    { phrase }
                </span>
            )
        })
        setTextContent(content)
    }

    const renderBookInfo = async () => {
        const response = await getSummary(bookID)
        if (response.ok) {
            const data = await response.json()
            renderTextContent(data.text_content)
            setBook(data)
        }
    }

    useEffect(() => {
        renderBookInfo()
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
            {modalVisible &&
            <FlashcardsModal 
                phrase={phrase}
                translatedPhrase={translatedPhrase}
            />
        }
        </div>
    )
}