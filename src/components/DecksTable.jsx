import './styles/DecksTable.css'

export default ({ children }) => {
    return ( 
        <table className="decksTable">
            <thead>
                <tr>
                    <th className="tableHeader">Opções</th>
                    <th className="tableHeader">Nome</th>
                    <th className="tableHeader">Descrição</th>
                    {/* <th>Qtde. Flashcards</th> */}
                </tr>
            </thead>
            <tbody>
                { children }
            </tbody>
        </table>
    )
}