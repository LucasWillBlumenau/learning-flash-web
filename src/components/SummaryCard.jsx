import './styles/SummaryCard.css'

export default ({ width = "215px", height = "275px", title, author } ) => {
    return (
        <div className="summaryCard" style={{minWidth: width, maxWidth: width, height: height}}>
            <div className="bookImage">
                {/* <img src="src/assets/img/1984.392024a0.jpg" alt={`${props.title} image`} /> */}
            </div>
            <div className="bookInfo">
                <span>{ title }</span>
                <span>{ author }</span>
            </div>
        </div>
    )    
}