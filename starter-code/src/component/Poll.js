import { useDispatch, useSelector } from "react-redux"
import { fetchUser, getUserById } from "../features/users/userSlice"
import { fetchQuestions, getQuestionById, saveQuestionAnswer } from "../features/questions/questionSlice"
import { useParams } from "react-router-dom"
import { LoadingStatus } from "../app/util"


export const Poll = () => {
    const { id } = useParams();
    const authedUser = useSelector(state => state.authedUser.id)
    const dispatch = useDispatch()

    console.log("Question Id: ", id);
    const question = useSelector(state => getQuestionById(state, id))
    const author = useSelector(state => getUserById(state, question ? question.author : ''))
    console.log("Question: ", question)
    const fullLoaded = question && author;

    const onClickOptionOne = () => {
        const answer = {
            authedUser,
            qid: question.id,
            answer: 'optionOne'
        }

        dispatch(saveQuestionAnswer(answer))
    }

    const onClickOptionTwo = () => {
        const answer = {
            authedUser,
            qid: question.id,
            answer: 'optionTwo'
        }

        dispatch(saveQuestionAnswer(answer))
    }


    return (fullLoaded &&
        <div className="poll-container">
            <h2>Poll by {author.name}</h2>
            <div className="poll-header">
                <img src={author.avatarURL} />
                <h3>Would you rather</h3>
            </div>
            <div className="poll-options">
                <div className="option">
                    <p>{question.optionOne.text}</p>
                    <button className="vote-button" onClick={onClickOptionOne}>Click</button>
                </div>
                <div className="option">
                    <p>{question.optionTwo.text}</p>
                    <button className="vote-button" onClick={onClickOptionTwo}>Click</button>
                </div>
            </div>
        </div>
    )
}
