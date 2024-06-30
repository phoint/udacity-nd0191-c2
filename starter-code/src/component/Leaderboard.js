import { useSelector } from "react-redux"
import { selectUserByLeaderdoard } from "../features/users/userSlice"

export const Leaderboard = () => {

    const users = useSelector(state => selectUserByLeaderdoard(state))

    return (
        <div>
            <ul>
                {users.map(u => (
                    <li key={u.id}>
                        {u.name} - {u.question} - {u.answer}
                    </li>
                ))}
            </ul>
        </div>
    )
}