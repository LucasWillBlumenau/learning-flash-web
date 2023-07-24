export default async (bookID) => {
    const summary = await fetch(`http://127.0.0.1:8000/api/summaries/${bookID}`)
    return summary
}