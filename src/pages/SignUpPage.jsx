import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import './styles/Forms.css'


export default () => {
    const usernameInput = useRef()
    const passwordInput = useRef()
    const confirmPasswordInput = useRef()
    const signUpButton = useRef()

    const [warningVisible, setWarningVisible] = useState(false)
    const [warning, setWarning] = useState()

    const navigate = useNavigate()

    const signUp = (event) => {
        event.preventDefault()
        if (passwordInput.current.value !== confirmPasswordInput.current.value) {
            setWarning('As senhas estão diferentes uma da outra')
            setWarningVisible(true)
            setTimeout(() => {
                setWarningVisible(false)
            }, 5000)
            return
        }
    }

    return (
        <div className="loginFormWrapper">
            <div className="learningFlashInformation">
                <img src="src/assets/img/LearningFlash.png" alt="logo" />
            </div>
            <form method="POST" className="form" onSubmit={(event) => {
                signUp(event)
            }}>
                {warningVisible &&
                    <span className="warningMessage" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                        <FaInfoCircle />
                        <span>{warning}</span>
                    </span>
                }
                <p style={{fontSize: '30px', fontWeight: '600', marginBottom: '15px'}}>Crie sua conta</p>
                <div className="inputWrapper">
                    <label htmlFor="usernameInput">Nome de Usuário:</label>
                    <input ref={usernameInput} type="text" required/>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="passwordInput">Senha: </label>
                    <input ref={passwordInput} type="password" required/>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="passwordInput">Confirme sua senha: </label>
                    <input ref={confirmPasswordInput} type="password" required/>
                </div>
                <div className="buttonsWrapper">
                    <button ref={signUpButton}>Criar</button>
                </div>
                <p>Já tem uma conta? <Link className="accountCreationLink" to="/login">Faça Login!</Link></p>
            </form>
        </div>
    )
}