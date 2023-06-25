
export default async (deckID, getAll) => {
    const flashcards = await fetch(`http://127.0.0.1:8000/api/decks/${deckID}/flashcards?get_all=${getAll}`, {
        headers: {
            'Authorization': `Basic ${localStorage.getItem('userkey')}`
        }
    })
    return flashcards
}