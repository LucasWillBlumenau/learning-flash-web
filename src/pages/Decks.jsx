import { useEffect, useRef, useState } from "react"
import DeckRow from "../components/DeckRow"
import DecksTable from '../components/DecksTable'
import getDecks from '../context/decks'
import './styles/Decks.css'


function addFlashcard(event, deckNameInput, deckDescriptionInput, setTableVisible) {
    event.preventDefault()
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
            'Authorization': `Basic ${localStorage.getItem('userkey')}`
        },
        body: JSON.stringify(body),
    }).then(res => res.json())
    .then(jsonData => {
        if(jsonData.name && jsonData.description) {
            setTableVisible(false)
        }
    })
}


export default () => {
    const [data, setData] = useState()
    const [tableVisible, setTableVisible] = useState(false)
    const deckNameInput = useRef()
    const deckDescriptionInput = useRef()
    useEffect(() => {
        getDecks().then(data => {
            setData(data)
            setTimeout(() => {
                setTableVisible(true)
            }, 500)
        })
    }, [tableVisible])
    return (
        <div className="decksWrapper">
            <div className="tableWrapper">
                {tableVisible?  
                    <DecksTable onHover={() => setData(data)}>
                        {data === []? 
                            'vazio...':
                            data.map((deck, idx) => {
                                return (
                                    <DeckRow 
                                    key={idx}
                                    id={deck.id}
                                    name={deck.name}
                                    description={deck.description}
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
                    addFlashcard(event, deckNameInput, deckDescriptionInput, setTableVisible)
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
                    <button type="submit">Adicionar Deck</button>
                </form>
            </div>
        </div>
    )
}