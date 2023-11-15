import './styles/SummaryCard.css'

export default ({ width = "250px", title, author, image } ) => {
    return (
        <div className="summaryCard" style={{minWidth: width, maxWidth: width, aspectRatio: 54 / 90}}>
            <div className="bookImage">
                {image && <img src={image} alt={`${title} image`} />}
            </div>
            <div className="bookInfo">
                <span>{ title }</span>
                <span>{ author }</span>
            </div>
        </div>
    )    
}