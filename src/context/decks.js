export default async () => {
    const decks = await fetch('http://127.0.0.1:8000/api/decks/', {
        headers: {
            'Authorization': `Basic ${localStorage.getItem('userkey')}`
        }
    })
    return decks
}