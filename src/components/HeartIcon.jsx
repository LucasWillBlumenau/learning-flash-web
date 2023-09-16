import './styles/HeartIcon.css'


export default ({ isFavorited, onClick }) => {
    return (
        <div className="heartIconContainer" onClick={onClick}>
            <div className={isFavorited? 'heartIcon favorited': 'heartIcon'}></div>
        </div>
    )
}