export default async (bookID) => {
    const summary = await fetch(`http://127.0.0.1:8000/api/summaries/${bookID}`)
    .then(res => res.json())
    return summary
}