import './styles/Logo.css'


export default () => {
    const useLightTheme = () => JSON.parse(localStorage.getItem('useLightTheme'))

    return (
        <div className="learningFlashInformation">
            <img
                src={`/src/assets/img/${useLightTheme()? 'LearningFlashDark': 'LearningFlash'}.png`}
                alt="logo"
            />
        </div>

    )
}