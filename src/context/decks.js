const fetchDecks = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/decks/', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('authtoken')}`
        }
    })
    return response
}


export { fetchDecks }