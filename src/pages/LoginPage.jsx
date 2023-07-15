import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import './styles/LoginPage.css'

export default ({ setContentVisible }) => {
    const usernameInput = useRef()
    const passwordInput = useRef()
    const loginButton = useRef()
    const [loginMessage, setLoginMessage] = useState('Entrar')
    const [warningVisible, setWarningVisible] = useState(false)

    function logIn(event) {
        event.preventDefault()
        const requestBody = {
            username: usernameInput.current.value,
            password: passwordInput.current.value,
        }
    
        setLoginMessage('Carrengando...')
        loginButton.current.disabled = true
        fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(requestBody)
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    localStorage.setItem('userkey', data.key)
                    setContentVisible(true)
                })  
            } else {
                setLoginMessage('Entrar')
                loginButton.current.disabled = false
                setWarningVisible(true)
                setTimeout(() => {
                    setWarningVisible(false)
                }, 5000)
            }
        })
    }

    useEffect(() => {
        const location = 'http://localhost:5173/'
        if (window.location.href !== location) {
            console.log(location)
            window.location.href = location
        }
    }, [])
    return (
        <div className="loginFormWrapper">
            <div className="learningFlashInformation">
                <img src="src/assets/img/LearningFlash.png" alt="logo" />
            </div>
            <form method="POST" className="form" onSubmit={(event) => {
                logIn(event)
            }}>
                {warningVisible &&
                    <span className="warningMessage" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                        <FaInfoCircle />
                        <span>email ou senha incorretos</span>
                    </span>
                }
                <p style={{fontSize: '30px', fontWeight: '600', marginBottom: '15px'}}>Faça seu login</p>
                <div className="inputWrapper">
                    <label htmlFor="usernameInput">Nome de Usuário:</label>
                    <input ref={usernameInput} type="text" required/>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="passwordInput">Senha: </label>
                    <input ref={passwordInput} type="password" required/>
                </div>
                <div className="buttonsWrapper">
                    {/* <button id="createAccountButton">Criar Conta</button> */}
                    <button ref={loginButton} id="submitButton">{loginMessage}</button>
                </div>
                <p>Novo Por Aqui? <Link className="accountCreationLink" to="#">Crie Sua Conta!</Link></p>
            </form>
        </div>
    )
}