import { useDispatch, useSelector } from "react-redux"
import { fetchUser, getUserById } from "../features/users/userSlice"
import { fetchQuestions, getQuestionById } from "../features/questions/questionSlice"
import { useParams } from "react-router-dom"
import { LoadingStatus } from "../app/util"


export const Poll = () => {
    const { id } = useParams();
    const loadingQuestion = useSelector(state => state.questions.status)
    const loadingUser = useSelector(state => state.users.status)
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


    return (fullLoaded &&
        <div>
            <h2>{author.name}</h2>
            <img src={author.avatar} />
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
