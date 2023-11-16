import './styles/Logo.css'
import DarkImage from '../../public/img/LearningFlashDark.png'
import LightImage from '../../public/img/LearningFlash.png'


export default () => {
    const useLightTheme = () => JSON.parse(localStorage.getItem('useLightTheme'))

    return (
        <div className="learningFlashInformation">
            <img src={useLightTheme()? DarkImage: LightImage} alt="logo"/>
        </div>
    )
}