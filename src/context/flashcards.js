const fetchFlashcards = async (deckID, getAll) => {
    const response = await fetch(`http://127.0.0.1:8000/api/decks/${deckID}/flashcards?get_all=${getAll}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('authtoken')}`
        }
    })
    return response
}


export { fetchFlashcards }