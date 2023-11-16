import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import SummaryCard from '../components/SummaryCard'
import SummariesSection from '../components/SummariesSection'

import getSummaries from '../context/summaries'
import API_URL from '../context/api-url'

import './styles/Home.css'


const MainSummary = ({ summary }) => summary && (
    <div className="mainSummary">
        <div className="summaryInfoContainer">
            <span className="mainBookTitle">Resumo da Semana</span>
            <div className="mainBookInfo">
                <span>{summary.title}</span>
                <span>{summary.author}</span>
            </div>
        </div>
        <div className="summaryCardContainer">
            <Link to={`/summaries/${summary.id}/`}>
                <img style={{borderRadius: '15px'}} src={`${API_URL}${summary.image}`} alt="image" width="300px" height="450px"/>
            </Link>
        </div>            
    </div> 
)


export default () => {
    const [weekBook, setWeekBook] = useState()
    const [books, setBooks] = useState()
    
    const renderSummaries = async () => {
        const data = await getSummaries()
        const [firstBook, ...otherBooks] = data
        setWeekBook(firstBook)
        setBooks(otherBooks)
    }

    useEffect(() => {
        renderSummaries()
    }, [])
    return (
        <>
            <div className="homePageWrapper">
                <MainSummary summary={weekBook} />
                {books !== undefined && 
                <SummariesSection>
                    {books.map((summary, idx) => (
                        <Link to={`/summaries/${summary.id}/`} key={idx}>
                            <SummaryCard
                                title={summary.title}
                                author={summary.author}
                                image={summary.image? `${API_URL}${summary.image}`: null}
                                width="260px"
                            />
                        </Link>
                    ))}
                </SummariesSection>}
            </div>
        </>
    );
}
