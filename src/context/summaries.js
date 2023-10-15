import API_URL from "./api-url"


export default async filter => {

    const url = `${API_URL}/api/summaries/?filter=${filter !== undefined? filter: ''}`
    const summaries = await fetch(url)
    .then(res => res.json())
    return summaries
}