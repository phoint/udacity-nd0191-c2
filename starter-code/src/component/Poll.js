import { useDispatch, useSelector } from "react-redux"
import { fetchUser, getUserById } from "../features/users/userSlice"
import { fetchQuestions, getQuestionById, saveQuestionAnswer } from "../features/questions/questionSlice"
import { useParams } from "react-router-dom"
import { LoadingStatus } from "../app/util"


export const Poll = () => {
    const { id } = useParams();
    const loadingQuestion = useSelector(state => state.questions.status)
    const loadingUser = useSelector(state => state.users.status)
    const authedUser = useSelector(state => state.authedUser.id)
    const dispatch = useDispatch()

    if (loadingQuestion === LoadingStatus.IDLE) {
        dispatch(fetchQuestions())
    }
    if (loadingUser === LoadingStatus.IDLE) {
        dispatch(fetchUser())
    }
    console.log("Question Id: ", id);
    const question = useSelector(state => getQuestionById(state, id))
    const author = useSelector(state => getUserById(state, question.author))
    console.log("Question: ", question)
    const fullLoaded = [loadingQuestion, loadingUser].every(loading => loading === LoadingStatus.SUCCESS)

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
        <div>
            <h2>{author.name}</h2>
            <img src={author.avatar} />
            <h3>Would you rather</h3>
            <div>
                <div>
                    <h4>{question.optionOne.text}</h4>
                    <button onClick={onClickOptionOne}>Click</button>
                </div>
                <div>
                    <h4>{question.optionTwo.text}</h4>
                    <button onClick={onClickOptionTwo}>Click</button>
                </div>
            </div>
        </div>
    )
}
