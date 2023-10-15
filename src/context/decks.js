import API_URL from "./api-url"


const fetchDecks = async () => {
    const response = await fetch(`${API_URL}/api/decks/`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('authtoken')}`
        }
    })
    return response
}


export { fetchDecks }