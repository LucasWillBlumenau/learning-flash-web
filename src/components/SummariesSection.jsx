import './styles/SummariesSection.css'

export default ({ children }) => {
    return (
        <section className="summariesSection">
            <span className="sectionTitle">Resumos disponíveis para leitura:</span>
            <div className="summariesContainer">
                { children }
            </div>
        </section>
    )
}