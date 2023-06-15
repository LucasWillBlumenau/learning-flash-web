import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Summaries from './pages/Summaries'
import Summary from './pages/Summary'
import Decks from './pages/Decks'
import Flashcards from './pages/Flashcards'
import FlashcardsManagement from './pages/FlashcardsManagement'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/summaries/' element={<Summaries />} />
                    <Route path='/summaries/:bookID/' element={<Summary />} />
                    <Route path='/decks/' element={<Decks />} />
                    <Route path='/decks/:deckID/' element={<Flashcards />}/>
                        <Route path='/decks/:deckID/edit/' element={<FlashcardsManagement />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
