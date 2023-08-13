import './styles/UserPage.css'
import './styles/Base.css'
import { FaArrowRight } from 'react-icons/fa'


export default () =>  {
    return (
        <div className="userPageWrapper centralized">
            <div className="infoWrapper">
                <h2 className="optionsTitle">Opções</h2>
                <ul className="profileOptions">
                    <li className="profileOption">
                        <span>Alterar nome de usuário</span>
                        <FaArrowRight />
                    </li>
                    <li className="profileOption">
                        <span>Alterar email</span>
                        <FaArrowRight />
                    </li>
                    <li className="profileOption">
                        <span>Alterar senha</span>
                        <FaArrowRight />
                    </li>
                </ul>

                <h2 className="optionsTitle">Preferências</h2>
                <ul className="profileOptions">
                    <li className="profileOption">
                        <span>Conferir Favoritos</span>
                        <FaArrowRight />
                    </li>
                </ul>
            </div>
        </div>
    )
}