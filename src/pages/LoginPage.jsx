import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import './styles/Forms.css'


export default () => {
    const usernameInput = useRef()
    const passwordInput = useRef()
    const loginButton = useRef()
    const [warning, setWarning] = useState(null)
    const [loginMessage, setLoginMessage] = useState('Entrar')
    const [warningVisible, setWarningVisible] = useState(false)
    const navigate = useNavigate()

    const showWarning = (message) => {
        setWarning(message)
        setWarningVisible(true)
        setTimeout(() => {
            setWarningVisible(false)
        }, 5000)
    }

    const logIn = async (event) => {
        event.preventDefault()
        const requestBody = {
            username: usernameInput.current.value,
            password: passwordInput.current.value,
        }
    
        setLoginMessage('Carrengando...')
        loginButton.current.disabled = true
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(requestBody)
        })
    
        if (response.status === 200) {
            const data =  await response.json() 
            localStorage.setItem('authtoken', data.token)
            navigate('/')
            
        } else if (response.status === 400) {
            setLoginMessage('Entrar')
            loginButton.current.disabled = false
            showWarning('nome de usuário ou senha incorretos!')
        } else {
            setLoginMessage('Entrar')
            loginButton.current.disabled = false
            showWarning('algum erro ocurreu durante a requisição')
        }
    }

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
                        <span>{ warning }</span>
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
                    <button ref={loginButton}>{loginMessage}</button>
                </div>
                <p>Novo Por Aqui? <Link className="accountCreationLink" to="/signup">Crie Sua Conta!</Link></p>
            </form>
        </div>
    )
}