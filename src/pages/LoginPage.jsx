import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import './styles/LoginPage.css'

function logIn(username, password, setContentVisible, loginButton, setLoginMessage) {
    const requestBody = {
        username: username,
        password: password
    }

    setLoginMessage('Carrengando...')
    loginButton.current.disabled = true

    fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(requestBody)
    }).then(res => res.json())
    .then(data => {
        if(data.key) {
            localStorage.setItem('userkey', data.key)
            setContentVisible(true)
        } else {
            setLoginMessage('Entrar')
            loginButton.current.disabled = false
        }
    })
}

export default ({ setContentVisible }) => {
    const username = useRef()
    const password = useRef()
    const loginButton = useRef()
    const [loginMessage, setLoginMessage] = useState('Entrar')
    return (
        <div className="loginFormWrapper">
            <div className="learningFlashInformation">
                <img src="src/assets/img/LearningFlash.png" alt="" />
            </div>
            <form method="POST" className="form" onSubmit={(e) => {
                e.preventDefault()
                logIn(username.current.value, password.current.value, setContentVisible, loginButton, setLoginMessage)
             
            }}>
                <p style={{fontSize: '30px', fontWeight: '600', marginBottom: '15px'}}>Faça seu login</p>
                <div className="inputWrapper">
                    <label htmlFor="usernameInput">Nome de Usuário:</label>
                    <input ref={username} type="text" required/>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="passwordInput">Senha: </label>
                    <input ref={password} type="password" required/>
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