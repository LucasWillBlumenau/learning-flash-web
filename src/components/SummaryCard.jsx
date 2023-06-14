import './styles/SummaryCard.css'

export default props => {
    const { width = "215px", height = "275px" } = props
    return (
        <div className="summaryCard" style={{minWidth: width, maxWidth: width, height: height}}>
            <div className="bookImage">
                {/* <img src="src/assets/img/1984.392024a0.jpg" alt={`${props.title} image`} /> */}
            </div>
            <div className="bookInfo">
                <span className="bookTitle">{ props.title }</span>
                <span className="bookAuthor">{ props.author }</span>
            </div>
        </div>
    )    
}