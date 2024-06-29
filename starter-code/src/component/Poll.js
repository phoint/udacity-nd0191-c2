import { useSelector } from "react-redux"
import { getUserById } from "../features/users/userSlice"
import { getQuestionById } from "../features/questions/questionSlice"


export const Poll = ({id}) => {
    const question = useSelector(state => getQuestionById(state, id))
    const author = useSelector(state => getUserById(state, question.author))

    return (
        <div>
            <h2>{author.name}</h2>
            <img src={author.avatar}/>
            <h3>Would you rather</h3>
            <div>
                <div>
                    <h4>{question.optionOne.text}</h4>
                    <button>Click</button>
                </div>
                <div>
                    <h4>{question.optionTwo.text}</h4>
                    <button>Click</button>
                </div>
            </div>
        </div>
    )
}
