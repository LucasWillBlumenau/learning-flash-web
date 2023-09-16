import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import HeartIcon from '../components/HeartIcon'

import getSummary from '../context/summary'
import { fetchDecks } from '../context/decks'

import './styles/Base.css'
import './styles/Summary.css'


export default () => {
    const { bookID } = useParams()
    const [book, setBook] = useState({})
    const [paragraphs, setParagraphs] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [phrase, setPhrase] = useState()
    const [translatedPhrase, setTranslatedPhrase] = useState()
    const [isFavorited, setIsFavorited] = useState()

    const FlashcardsModal = ({ phrase, translatedPhrase }) => {
        const [decks, setDecks] = useState(null)
        const [deckID, setDeckID] = useState()
        const [selectedDeck, setSelectedDeck] = useState({checked: null})

        const getDecks = async () => {
            const response = await fetchDecks()
            const data = await response.json()
            setDecks(data)
        }

        const addFlashcard = async () => {
            if (!deckID) {
                alert('Selecione um deck para adicionar o flashcard!')
                return
            }
            
            const body = { phrase: phrase, translated_phrase: translatedPhrase }    
            const response = await fetch(`http://127.0.0.1:8000/api/decks/${deckID}/flashcards/`, {
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

        const decksList = () => {
            return decks.map((deck, i) => 
                <div key={i} className="deckOption">
                    <input type="checkbox" name="deckOption" onChange={(event) => {
                        selectedDeck.checked = false
                        setSelectedDeck(event.target)
                        setDeckID(deck.id)
                    }}/>
                    <span>{ deck.name }</span>
                </div>
            )
        }
        useEffect(() => {
            getDecks()
        }, [])


        return (
            <div className="modal">
                <div className="modalPopup popup">
                    <h2>Selecione o deck:</h2>
                    
                    <div className="decksList">
                        {decks !== null && (decks.length === 0? <p>Você ainda não possui nenhum deck. <Link to="/decks" className="link">Adicione um novo!</Link></p>: decksList())}
                    </div>  
                    <h2>Card a ser adicionado:</h2>
                    <div className="modalPhraseContainer">
                        <span>{ phrase } </span>
                        <span>{ translatedPhrase }</span>
                    </div>
                    <div className="addCardButtonsContainer">
                        <button className="button" onClick={() => {
                            addFlashcard()
                        }}>Adicionar</button>
                        <button className="button" onClick={() => {
                            setModalVisible(false)
                        }}>Fechar</button>
                    </div>
                </div>
            </div>
        )
    }

    const addToFavorites = async () => {
        const data = { summary: bookID }
        const response = await fetch('http://localhost:8000/api/favorites/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Token ${localStorage.getItem('authtoken')}`
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            setIsFavorited(true)
        }
    }

    const removeFromFavorites = async () => {
        const data = { summary: bookID }
        const response = await fetch('http://localhost:8000/api/favorites/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Token ${localStorage.getItem('authtoken')}`
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            setIsFavorited(false)
        }
    }

    const createParagraph = textContent => {
        const splitedText = textContent.match(/[^\.!\?]+[\.\!\?]/g)
        const content = splitedText.map((phrase, i) => {
            return (
                <span key={i} onClick={async () => {
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
        return content
    }

    const renderBookInfo = async () => {
        const response = await getSummary(bookID)
        if (response.ok) {
            const data = await response.json()
            const paragraphs = data.text_content.split('\r\n\r\n')
            setBook(data)
            setIsFavorited(data.is_favorite)
            setParagraphs(paragraphs.map(createParagraph))
        }
    }

    useEffect(() => {
        renderBookInfo()
    }, [])
    return (
        <div className="bookTextContainer centralized">
            <div className="bookHeader">
                <div className="bookTitle">
                    <span>{ book.title }</span>
                    <span>{ book.author_name }</span>
                </div>
                <HeartIcon 
                    isFavorited={isFavorited}
                    onClick={isFavorited? removeFromFavorites: addToFavorites}
                />
            </div>
            <div className="bookContent">
                { paragraphs.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
            </div>
            {modalVisible &&
            <FlashcardsModal 
                phrase={phrase}
                translatedPhrase={translatedPhrase}
            />}
        </div>
    )
}