import './styles/SummariesSection.css'

export default ({ title, children }) => {
    return (
        <section className="summariesSection">
            <span className="sectionTitle">{title}</span>
            <div className="summariesContainer">
                { children }
            </div>
        </section>
    )
}