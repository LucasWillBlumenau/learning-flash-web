import './styles/ToggleThemeButton.css'

export default () => {
    const toggleTheme = () => {
        const useLightTheme = JSON.parse(localStorage.getItem('useLightTheme'))
        localStorage.setItem('useLightTheme', !useLightTheme)
        document.body.classList.toggle('light')
    }   

    return (
        <button className="toggleTheme" onClick={toggleTheme}>
            <div></div>
            <div></div>
        </button>
    )
}
