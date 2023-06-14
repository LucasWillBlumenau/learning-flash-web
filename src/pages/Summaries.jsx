import { useState, useEffect } from "react"
import { FaSearch } from 'react-icons/fa'
import { Link } from "react-router-dom"
import SummaryCard from "../components/SummaryCard"
import SummariesGrid from "../components/SummariesGrid"
import getSummaries from '../context/summaries'
import './styles/Summaries.css'

export default () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        getSummaries().then(data => {
            setBooks(data)
        })
    }, [])
    return (
        <div>
            <div className="summariesPageTop">
                <span>Confira Todos os Resumos:</span>
                <div className="searchBarContainer">
                    <label htmlFor="searchInput">
                        <FaSearch />
                    </label>
                    <input id="searchInput" type="text" placeholder="Pesquisar resumos:"/>
                </div>
            </div>
            <SummariesGrid>
                {books.map((book, idx) => {
                    return (
                        <Link to={`/summaries/${book.id}`}>
                            <SummaryCard key={idx}
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