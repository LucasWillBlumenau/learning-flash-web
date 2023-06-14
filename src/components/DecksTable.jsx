import './styles/DecksTable.css'

export default props => {
    return ( 
        <table className="decksTable">
            <thead>
                <tr>
                    <th style={{textAlign: 'center'}}>Opções</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Qtde. Flashcards</th>
                </tr>
            </thead>
            <tbody>
                { props.children }
            </tbody>
        </table>
    )
}