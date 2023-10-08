import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import SummariesSection from '../components/SummariesSection';
import getSummaries from '../context/summaries'

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
                <img style={{borderRadius: '15px'}} src={`http://localhost:8000${summary.image}`} alt="image" width="300px" height="450px"/>
            </Link>
        </div>            
    </div> 
)


export default () => {
    const [weekBook, setWeekBook] = useState()
    const [books, setBooks] = useState()
    
    const renderSummaries = async () => {
        const data = await getSummaries()
        const [firstBook, ...otherBook] = data
        setWeekBook(firstBook)
        setBooks(otherBook)
    }

    useEffect(() => {
        renderSummaries()
    }, [])
    return (
        <div className="homePageWrapper">
            <MainSummary summary={weekBook} />
            {books !== undefined && 
            <SummariesSection>
                {books.map((summary, idx) => (
                    <Link to={`/summaries/${summary.id}/`} key={idx}>
                        <SummaryCard
                            title={summary.title}
                            author={summary.author}
                            image={summary.image? `http://localhost:8000${summary.image}`: null}
                        />
                    </Link>
                ))}
            </SummariesSection>}
        </div>
    );
}
