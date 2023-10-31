import './styles/HelpModal.css'
import { FaArrowLeft } from 'react-icons/fa'


const HelpTip = ({ tipTitle, tipDescription }) => (
    <div className="helpTip">
        <h2>{tipTitle}</h2>
        <p>{tipDescription}</p>
    </div>
)

const HelpTipsContainer = ({ children, setShowHelpMenu }) => (
    <div className="modal">
        <div className="popup helpMenu">
            <FaArrowLeft className="closeMenuIcon" onClick={() => setShowHelpMenu(false)} />
            {children}
        </div>
    </div>
)

export default ({ setShowHelpMenu }) => {
    return (
        <HelpTipsContainer setShowHelpMenu={setShowHelpMenu}>
            <HelpTip 
                tipTitle="Pratique inglês utilizando decks e flashcards"
                tipDescription="Os decks são os containers para os flashcards. Os flashcards são cartões que possuem frente e verso. Neles você pode adicionar frases em inglês e sua tradução para testar seus níveis de conhecimento e se aperfeiçoar."
            />
            <HelpTip 
                tipTitle="Adicione seus decks e flashcards no menu de decks"
                tipDescription="Você pode utilizar o menu decks para adicionar seus de decks e flashcards."
            />
            <HelpTip 
                tipTitle="Adicione seus flashcards lendo os resumos"
                tipDescription="Ao clicar em uma das frases enquanto você lê um resumo, um popup com a frase em que você clicou e sua tradução será exibido para que você a adicione em um de seus decks."
            />
        </HelpTipsContainer>
    )
}

