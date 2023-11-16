import './styles/SummaryCard.css'

export default ({ width, title, author, image } ) => {

    const styles = width? { aspectRatio: 54 / 90, width }: { aspectRatio: 54 / 90 }
    return (
        <div className="summaryCard" style={styles}>
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