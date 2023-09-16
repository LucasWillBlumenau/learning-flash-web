import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import SummariesSection from '../components/SummariesSection';
import getSummaries from '../context/summaries'

import './styles/Home.css'


export default () => {
    const [weekBook, setWeekBook] = useState()
    const [books, setBooks] = useState([])
    
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
            
            {weekBook && <div className="mainSummary">
                <div className="summaryInfoContainer">
                    <span className="mainBookTitle">Resumo da Semana</span>
                    <div className="mainBookInfo">
                        <span>{weekBook.title}</span>
                        <span>{weekBook.author}</span>
                    </div>
                </div>
                <div className="summaryCardContainer">
                    <Link to={`/summaries/${weekBook.id}/`}>
                        <img style={{borderRadius: '15px'}} src={`http://127.0.0.1:8000${weekBook.image}`} alt="image" width="300px" height="450px"/>
                    </Link>
                </div>            
            </div>}

            <SummariesSection>
                {books.map((summary, idx) => {
                    return (
                        <Link to={`/summaries/${summary.id}/`} key={idx}>
                            <SummaryCard
                                title={summary.title}
                                author={summary.author}
                                image={summary.image? `http://127.0.0.1:8000${summary.image}`: null}
                            />
                        </Link>
                    )
                })}
            </SummariesSection>
            
            {/* 
                Sessão 1 - Semi-Feito
                Principal Resumo da Semana

                Sessão 2 - Feito
                Scroll page com alguns registros de resumos

                Sessão 3
                Aréa com opções para gerenciamento de Flashcards
            */}
        </div>
    );
}


