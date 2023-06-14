export default async () => {
    const summaries = await fetch('http://127.0.0.1:8000/api/summaries/')
    .then(res => res.json())
    return summaries
}