import SummaryCard from '../components/SummaryCard'
import SummariesGrid from '../components/SummariesGrid'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/Base.css'


export default () => {

    const [books, setBooks] = useState(null)

    const fetchFavorites = async () => {
        const response = await fetch('http://localhost:8000/api/favorites/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authtoken')}`
            }
        })
        if (!response.ok) {
            alert('Problemas ao carregar a pagina')
            return
        }
        setBooks(await response.json())
    }

    useEffect(() => {
        fetchFavorites()
    }, [])
    return (
        <div className="centralized" style={{flexDirection: 'column'}}>
            <h2 className="pageTitle">Confira Seus Favoritos</h2>
            <SummariesGrid>
                {books !== null && books.map((book, idx )=> {
                    return (
                        <Link key={idx} to={`/summaries/${book.id}`}>
                            <SummaryCard 
                                title={book.title}
                                author={book.author}
                                width="300px"
                                height="350px"
                            />
                        </Link>
                    )

                })}
            </SummariesGrid>
        </div>
    )
}