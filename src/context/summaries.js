export default async (filter) => {

    const url = `http://127.0.0.1:8000/api/summaries/?filter=${filter !== undefined? filter: ''}`
    const summaries = await fetch(url)
    .then(res => res.json())
    return summaries
}