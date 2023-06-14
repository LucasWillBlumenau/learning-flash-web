import './styles/SummariesSection.css'

export default props => {
    return (
        <section className="summariesSection">
            <span className="sectionTitle">Resumos disponíveis para leitura:</span>
            <div className="summariesContainer">
                { props.children }
            </div>
        </section>
    )
}