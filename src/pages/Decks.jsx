import { useEffect, useRef, useState } from "react"

import DeckRow from "../components/DeckRow"
import DecksTable from '../components/DecksTable'
import PlusIcon from '../components/PlusIcon'

import API_URL from "../context/api-url"
import { fetchDecks } from '../context/decks'


import './styles/Decks.css'


export default () => {
    const [decks, setDecks] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    
    const deckNameInput = useRef()
    const deckDescriptionInput = useRef()
    const form = useRef()

    const Modal = () => {
        const addDeck = async () => {
            const [name, description] = [deckNameInput.current.value, deckDescriptionInput.current.value]
            form.current.reset()
            const body = {
                name: name,
                description: description,
            }
            
            const response = await fetch(`${API_URL}/api/decks/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json', 
                    'Authorization': `Token ${localStorage.getItem('authtoken')}`
                },
                body: JSON.stringify(body),
            })
            if (response.ok) {
                const data = await response.json()
                setDecks([...decks, data])
                setModalVisible(false)
            }
        }

        return (
            <div className="modal">
                <form ref={form} className="deckForm centralized popup" method="POST" onSubmit={(event) => {
                    event.preventDefault()
                    addDeck()
                }}>
                    <h2>Crie seu novo deck</h2>
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
                    <div className="buttonsContainer">
                        <button className="button" type="submit">Adicionar</button>
                        <button className="button" onClick={() => {
                            setModalVisible(false)
                        }}>Fechar</button>
                    </div>
                </form>
            </div>
        )
    }

    const Decks = ({ decks }) => {
        if (decks.length === 0) {
            return (
                <div className="centralized" style={{width: '100%', height: '100%'}}>
                    <h1>Nenhum deck foi adicionado ainda</h1>
                </div>
            )
        }
        return(
            <DecksTable>
                {decks.map(({id, name, description}, i) => (
                    <DeckRow 
                        key={i}
                        id={id}
                        name={name}
                        description={description}
                        renderDecks={renderDecks}
                    />
                ))}
            </DecksTable>
        )
    
    }
    

    const renderDecks = async () => {
        const response = await fetchDecks()
        if (!response.ok) {
            alert('Problemas ao carregar decks...')
            return
        }
        const data = await response.json()
        setDecks(data)
        
    }

    useEffect(() => {
        renderDecks()
    }, [])

    return (
        <div className="content centralized">
            <h2 className="pageTitle">Confira Seus Decks</h2>
            <div className="decksWrapper">
                <div className="tableWrapper">
                    {decks !== undefined?
                    <Decks decks={decks}/>:
                    <div className="centralized" style={{width: "100%", height: '100%', fontSize: '35px'}}>
                        Carregando...
                    </div>}
                </div>
                <PlusIcon onClick={() => {
                    setModalVisible(true)
                }}/>
            </div>
            {modalVisible && <Modal />}
        </div>
    )
}