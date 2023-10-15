import API_URL from "./api-url"


export default async bookID => {
    const summary = await fetch(`${API_URL}/api/summaries/${bookID}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('authtoken')}`
        }
    })
    return summary
}