import { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import SummaryCard from '../components/SummaryCard'
import SummariesGrid from '../components/SummariesGrid'

import getSummaries from '../context/summaries'
import API_URL from '../context/api-url'

import './styles/Summaries.css'


export default () => {
    const [books, setBooks] = useState([])
    const input = useRef()
    
    const renderSummaries = async (filter) => {
        const data = await getSummaries(filter)
        setBooks(data)
    }

    const searchBook = event => {
        event.preventDefault()
        renderSummaries(input.current.value)
    }


    useEffect(() => {
        renderSummaries()
    }, [])
    return (
        <div className="summariesPage">
            <div className="summariesPageTop centralized">
                <span>Confira Todos os Resumos:</span>
                <form onSubmit={searchBook} className="searchForm centralized">
                    <FaSearch onClick={searchBook} />
                    <input ref={input} type="text" placeholder="Pesquise o nome do livro:" />
                </form>
            </div>
            <SummariesGrid>
                {books.map((book, idx) => {
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