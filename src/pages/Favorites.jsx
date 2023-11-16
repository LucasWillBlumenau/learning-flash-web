import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import API_URL from '../context/api-url'

import SummaryCard from '../components/SummaryCard'
import SummariesGrid from '../components/SummariesGrid'


export default () => {
    const [books, setBooks] = useState()
    const fetchFavorites = async () => {
        const response = await fetch(`${API_URL}/api/favorites/`, {
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
                {books !== undefined && books.map((book, idx )=> {
                    return (
                        <Link key={idx} to={`/summaries/${book.id}`}>
                            <SummaryCard 
                                title={book.title}
                                author={book.author}
                                image={book.image? `${API_URL}${book.image}`: null}
                            />
                        </Link>
                    )

                })}
            </SummariesGrid>
        </div>
    )
}