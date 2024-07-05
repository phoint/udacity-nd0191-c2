import {Link, NavLink} from'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/new">New</NavLink>
        </nav>
    )
}

export default Nav;