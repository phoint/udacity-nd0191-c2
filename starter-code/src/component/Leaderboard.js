import { useSelector } from "react-redux"
import { selectUserByLeaderdoard } from "../features/users/userSlice"

export const Leaderboard = () => {

    const users = useSelector(state => selectUserByLeaderdoard(state))

    return (
        <div className="table-container">
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>
                                <div className="user-block">

                                <img src={u.avatarURL} className="avatar" alt={u.name}/>
                                <div>

                                <div>
                                    <span>{u.name}</span>
                                </div>
                                <div>

                                <span className="username">{u.id}</span>
                                </div>
                                </div>
                                </div>
                            </td>
                            <td>{u.answer}</td>
                            <td>{u.question}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}