import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import Logo from '../components/Logo'
import './styles/Forms.css'


const SucessPopup = () => {
    return (
        <div className="accountCreatedModal">
            <div className="accountCreatedPopup">
                <p>Conta criada com sucesso!</p>
                <Link className="link" to='/login'>Ir para a tela de login</Link>
            </div>
        </div>
    )
}


export default () => {
    const usernameInput = useRef()
    const passwordInput = useRef()
    const confirmPasswordInput = useRef()
    const signUpButton = useRef()
    const emailInput = useRef()

    const [warningVisible, setWarningVisible] = useState(false)
    const [warning, setWarning] = useState()
    const [accountCreated, setAccountCreated] = useState(false)
    
    const createAccount = async () => {
        const body = {
            username: usernameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
        }
        const response = await fetch('http://127.0.0.1:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body),
        })

        if (response.ok) {
            setAccountCreated(true)
        } else if (response.status === 400) {
            const errorMessages = await response.json()
            if (errorMessages.username) {
                showWarning(errorMessages.username)
            } else if (errorMessages.email) {
                showWarning(errorMessages.email);
            } else if (errorMessages.password) {
                showWarning(errorMessages.password)
            }
        } else {
            showWarning('Houve algum problema ao tentar criar sua conta. Tente mais tarde.')
        }
    }

    const showWarning = warningMessage => {
        setWarning(warningMessage)
        setWarningVisible(true)
        setTimeout(() => {
            setWarningVisible(false)
        }, 5000)
    }

    const signUp = event => {
        event.preventDefault()
        if (passwordInput.current.value !== confirmPasswordInput.current.value) {
            showWarning('As senhas estão diferentes uma da outra')
            return
        }

        createAccount()
    }

    return (
        <div className="loginFormWrapper">
            {accountCreated && <SucessPopup />}
            <Logo />
            <form method="POST" className="form" onSubmit={(event) => signUp(event)}>
                {warningVisible &&
                    <div className="warningMessage" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                        <span>{warning}</span>
                    </div>
                }
                <p style={{fontSize: '30px', fontWeight: '600', marginBottom: '15px'}}>Crie sua conta</p>
                <div className="inputWrapper">
                    <label htmlFor="usernameInput">Nome de Usuário:</label>
                    <input ref={usernameInput} type="text" required/>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="emailInput">Email:</label>
                    <input ref={emailInput} type="text" required/>
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
                <p>Já tem uma conta? <Link className="link" to="/login">Faça Login!</Link></p>
            </form>
        </div>
    )
}