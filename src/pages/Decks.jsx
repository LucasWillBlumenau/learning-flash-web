import { useEffect, useRef, useState } from "react"
import DeckRow from "../components/DeckRow"
import DecksTable from '../components/DecksTable'
import { fetchDecks } from '../context/decks'
import './styles/Decks.css'


export default () => {
    const [decks, setDecks] = useState()
    const [tableVisible, setTableVisible] = useState(false)
    const deckNameInput = useRef()
    const deckDescriptionInput = useRef()

    useEffect(() => {
        fetchDecks().then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setDecks(data)
                    setTableVisible(true)
                })  
            } else {
                window.alert(res.status)
            }

        })
    }, [])

    const addFlashcard = () => {
        const [name, description] = [deckNameInput.current.value, deckDescriptionInput.current.value]
        deckNameInput.current.value = '' 
        deckDescriptionInput.current.value = ''
        const body = {
            name: name,
            description: description,
        }
        fetch('http://127.0.0.1:8000/api/decks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json', 
                'Authorization': `Token ${localStorage.getItem('authtoken')}`
            },
            body: JSON.stringify(body),
        }).then(res => res.json())
        .then(data => {
            if(data.name && data.description) {
                setDecks([...decks, data])
            }
        })
    }

    return (
        <div className="decksWrapper">
            <div className="tableWrapper">
                {tableVisible?  
                    <DecksTable>
                        {decks === []? 
                            'vazio...':
                            decks.map((deck, idx) => {
                                return (
                                    <DeckRow 
                                        key={idx}
                                        id={deck.id}
                                        name={deck.name}
                                        description={deck.description}
                                        amount={deck.flashcards_amount}
                                    />
                                )
                            })
                        }
                    </DecksTable>:
                    <div style={{width: "100%", height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', fontSize: '35px'}}>Carregando...</div>
                }
            </div>
            <div className="deckFormWrapper">
                <form className="deckForm" method="POST" onSubmit={(event) => {
                    event.preventDefault()
                    addFlashcard()
                }}>
                    <div className="inputFieldWrapper">
                        <div>
                            <label htmlFor="deckName">Nome:</label>
                            <input ref={deckNameInput} type="text" id="deckName" required/>
                        </div>
                        <div>
                            <label htmlFor="deckDescription">Descrição:</label>
                            <input ref={deckDescriptionInput} type="text" id="deckDescription" required/>
                        </div>
                    </div>
                    <button className="button" type="submit">Adicionar Deck</button>
                </form>
            </div>
        </div>
    )
}