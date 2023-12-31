import { useState } from 'react'
import './styles/HelpModal.css'
import { FaArrowLeft } from 'react-icons/fa'


const HelpTip = ({ tipTitle, tipDescription }) => (
    <div className="helpTip">
        <h2>{tipTitle}</h2>
        <p>{tipDescription}</p>
    </div>
)

const HelpTipsContainer = ({ children, setShowHelpMenu }) => {

    const [currentItem, setCurrentItem] = useState(0)

    return (
        <div className="modal" onClick={() => setShowHelpMenu(false)}>
            <div className="popup helpMenu" onClick={event => event.stopPropagation()}>
                <FaArrowLeft className="closeMenuIcon" onClick={() => setShowHelpMenu(false)} />
                <div className="tipsSlider" style={{transform: `translateX(${currentItem * -100}%)`}}>
                    {children}
                </div>
                <div className="tipsOptions">
                    {children.map(({ title }, index) => (
                        <button
                            key={title}
                            className={index !== currentItem? 'tipOption': 'tipOption selected'}
                            onClick={() => setCurrentItem(index)}>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ({ setShowHelpMenu }) => {

    const tips = [
        {
            title: "Pratique inglês utilizando decks e flashcards",
            description: "Os decks são os containers para os flashcards. Os flashcards são cartões que possuem frente e verso. Neles você pode adicionar frases em inglês e sua tradução para testar seus níveis de conhecimento e se aperfeiçoar."
        },
        {
            title: "Adicione seus decks e flashcards no menu de decks",
            description: "Você pode utilizar o menu decks para adicionar seus de decks e flashcards.",
        },
        {
            title: "Adicione seus flashcards lendo os resumos",
            description: "Ao clicar em uma das frases enquanto você lê um resumo, um popup com a frase em que você clicou e sua tradução será exibido para que você adicione-a a um de seus decks.",
        }

    ]

        


    return (
        <HelpTipsContainer setShowHelpMenu={setShowHelpMenu}>
            {tips.map(tip => (
                <HelpTip
                    key={tip.title}
                    tipTitle={tip.title}
                    tipDescription={tip.description}
                />
            ))}

        </HelpTipsContainer>
    )
}
