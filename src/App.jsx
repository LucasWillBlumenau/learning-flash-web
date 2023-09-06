import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Summaries from './pages/Summaries'
import Summary from './pages/Summary'
import Decks from './pages/Decks'
import Flashcards from './pages/Flashcards'
import FlashcardsManagement from './pages/FlashcardsManagement'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import UserPage from './pages/UserPage'
import Favorites from './pages/Favorites'


const Protected = ({ children }) => {
    const token = localStorage.getItem('authtoken')
    if (token) {
        return children
    }
    return <Navigate to="/login" />
}
 

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup/' element={<SignUpPage />} />
                <Route path='/login/' element={<LoginPage />} />
                <Route element={<Protected><Layout /></Protected>}>
                    <Route path='/' element={<Home />} />
                    <Route path='/summaries/' element={<Summaries />} />
                    <Route path='/summaries/:bookID/' element={<Summary />} />
                    <Route path='/decks/' element={<Decks />} />
                    <Route path='/decks/:deckID/' element={<Flashcards />} />
                    <Route path='/decks/:deckID/edit/' element={<FlashcardsManagement />} />
                    <Route path='/user/' element={<UserPage />}/>
                    <Route path='/favorites/' element={<Favorites />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


export default App
