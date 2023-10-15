import API_URL from "./api-url"


const fetchFlashcards = async (deckID, getAll) => {
    const response = await fetch(`${API_URL}/api/decks/${deckID}/flashcards?get_all=${getAll}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('authtoken')}`
        }
    })
    return response
}


export { fetchFlashcards }