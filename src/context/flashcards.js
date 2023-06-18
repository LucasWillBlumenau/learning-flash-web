
export default async (deckID) => {
    const flashcards = await fetch(`http://127.0.0.1:8000/api/decks/${deckID}/flashcards/`, {
        headers: {
            'Authorization': `Basic ${localStorage.getItem('userkey')}`
        }
    })
    return flashcards
}