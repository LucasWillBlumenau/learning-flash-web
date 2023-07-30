import { useEffect, useRef, useState } from "react"
import DeckRow from "../components/DeckRow"
import DecksTable from '../components/DecksTable'
import { fetchDecks } from '../context/decks'
import './styles/Decks.css'
import { FaPlus } from "react-icons/fa"


export default () => {
    const [decks, setDecks] = useState(null)
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
            
            const response = await fetch('http://127.0.0.1:8000/api/decks/', {
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
                        <button className="button" type="submit">Adicionar Deck</button>
                        <button className="button" onClick={() => {
                            setModalVisible(false)
                        }}>Fechar</button>
                    </div>
                </form>
            </div>
        )
    }


    const renderDecks = async () => {
        const response = await fetchDecks()
        if (response.ok) {
            const data = await response.json()
            setDecks(data)
        } else {
            alert('Problemas ao carregar decks...')
        }
    }

    useEffect(() => {
        renderDecks()
    }, [])

    return (
        <div className="content centralized">
            <div className="decksWrapper">
                <div className="tableWrapper">
                    {decks !== null?  
                        <DecksTable>
                            {decks === []? 
                                'vazio...':
                                decks.map(({id, name, description}, idx) => {
                                    return (
                                        <DeckRow 
                                            key={idx}
                                            id={id}
                                            name={name}
                                            description={description}
                                            renderDecks={renderDecks}
                                        />
                                    )
                                })
                            }
                        </DecksTable>:
                        <div style={{width: "100%", height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', fontSize: '35px'}}>Carregando...</div>
                    }
                </div>
                <div className="addDeckIconContainer" onClick={() => {
                    setModalVisible(true)
                }}>
                    <FaPlus />
                </div>
            </div>
            {modalVisible && <Modal />}
        </div>
    )
}