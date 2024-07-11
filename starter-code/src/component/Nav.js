import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from'react-router-dom'
import { getUserById } from '../features/users/userSlice';
import { logout } from '../features/authedUser/authedUserSlice';

const Nav = () => {
    const {id} = useSelector(state => state.authedUser)
    const authedUser = useSelector(state => getUserById(state, id))
    const dispatch = useDispatch()


    return (
        <nav>
            <div className='menu-group'>

            <NavLink to="/">Home</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/add">New</NavLink>
            </div>
            {authedUser && <div className='button-group'>
                <img className='avatar' src={authedUser.avatarURL} alt={authedUser.name}/>
                <span>{authedUser.name}</span>
                <button onClick={() => dispatch(logout())}>Logout</button>
            </div>}
        </nav>
    )
}

export default Nav;