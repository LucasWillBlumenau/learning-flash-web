import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import SummariesSection from '../components/SummariesSection';
import getSummaries from '../context/summaries'

import './styles/Home.css'


export default () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        getSummaries().then(data => {
            setBooks(data)
        })
    }, [])
    return (
        <div className="homePageWrapper">
            <div className="mainSummary">
                <div className="summaryInfoContainer">
                    <span>Principal Resumo da Semana</span>
                </div>
                <div className="summaryCardContainer">
                    <SummaryCard 
                        title="Os Sofrimentos do Jovem Werther"
                        author="Johann Wolfgang von Goethe"
                        width="285px"
                        height="310px"
                    />
                </div>            
            </div>

            <SummariesSection>
                {books.map((summary, idx) => {
                    return (
                        <Link to={`/summaries/${summary.id}/`} key={idx}>
                            <SummaryCard
                                title={summary.title}
                                author={summary.author}
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


