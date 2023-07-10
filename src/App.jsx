import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Summaries from './pages/Summaries'
import Summary from './pages/Summary'
import Decks from './pages/Decks'
import Flashcards from './pages/Flashcards'
import FlashcardsManagement from './pages/FlashcardsManagement'
import LoginPage from './pages/LoginPage'

const Protected = ({ children }) => {
    const userkey = localStorage.getItem('userkey')
    if (userkey) {
        return children
    }
    return <Navigate to="/login" />
}
 
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route element={<Layout />}>
                    <Route path='/' element={<Protected><Home /></Protected>} />
                    <Route path='/summaries/' element={<Protected><Summaries /></Protected>} />
                    <Route path='/summaries/:bookID/' element={<Protected><Summary /></Protected>} />
                    <Route path='/decks/' element={<Protected><Decks /></Protected>} />
                    <Route path='/decks/:deckID/' element={<Protected><Flashcards /></Protected>}/>
                    <Route path='/decks/:deckID/edit/' element={<Protected><FlashcardsManagement /></Protected>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
