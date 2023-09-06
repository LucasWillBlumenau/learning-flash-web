import './styles/UserPage.css'
import './styles/Base.css'

import { ProfileOptions, ProfileOption } from '../components/ProfileOptions'
import { useNavigate , Link } from 'react-router-dom'


export default () =>  {
    
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('authtoken')
        navigate('/login')
    }

    return (
        <div className="userPageWrapper centralized">
            <div className="infoWrapper">
                <ProfileOptions title="Opções">
                    <ProfileOption title="Alterar nome de usuário" onClick={() => alert('It works')} />
                    <ProfileOption title="Alterar email" />
                    <ProfileOption title="Alterar senha" />
                    <ProfileOption title="Fazer logout" onClick={logout}/>
                </ProfileOptions>
                <ProfileOptions title="Preferências">
                    <Link to='/favorites/'>
                        <ProfileOption title="Favoritos" />
                    </Link>
                </ProfileOptions>
            </div>
        </div>
    )
}