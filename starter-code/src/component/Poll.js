import { useDispatch, useSelector } from "react-redux"
import { getUserById } from "../features/users/userSlice"
import { getQuestionById, saveQuestionAnswer } from "../features/questions/questionSlice"
import { useParams } from "react-router-dom"


export const Poll = () => {
    const { id } = useParams();
    const authedUser = useSelector(state => state.authedUser.id)
    const dispatch = useDispatch()

    console.log("Question Id: ", id);
    const question = useSelector(state => getQuestionById(state, id))
    const author = useSelector(state => getUserById(state, question?.author || ''))
    console.log("Question: ", question)
    const fullLoaded = question && author;
    const isAnswered = question?.optionOne.votes.includes(authedUser) || question?.optionTwo.votes.includes(authedUser);
    const totalVotes = (question?.optionOne.votes.length + question?.optionTwo.votes.length || 0);
    let percntOne = (question?.optionOne.votes.length || 0) / totalVotes * 100;
    let percntTwo = (question?.optionTwo.votes.length || 0) / totalVotes * 100;

    const onClickOptionOne = () => {
        const answer = {
            authedUser,
            qid: question.id,
            answer: 'optionOne'
        }
        if (!voted(question.optionOne.votes, authedUser)) {
            dispatch(saveQuestionAnswer(answer))
        }
    }

    const onClickOptionTwo = () => {
        const answer = {
            authedUser,
            qid: question.id,
            answer: 'optionTwo'
        }
        if (!voted(question.optionTwo.votes, authedUser)) {
            dispatch(saveQuestionAnswer(answer))
        }
    }

    const voted = (votes, userId) => votes.includes(userId)

    return (fullLoaded &&
        <div className="poll-container">
            <h2>Poll by {author.name}</h2>
            <div className="poll-header">
                <img src={author.avatarURL} alt={author.name}/>
                <h3>Would you rather</h3>
            </div>
            <div className="poll-options">
                <div className={`option ${voted(question.optionOne.votes, authedUser) ? 'voted' : ''}`}>
                    <p>{isAnswered && percntOne}%</p>
                    <p>{question.optionOne.text}</p>
                    <button className="vote-button" onClick={onClickOptionOne}>Click</button>
                </div>
                <div className={`option ${voted(question.optionTwo.votes, authedUser) ? 'voted' : ''}`}>
                    <p>{isAnswered && percntTwo}%</p>
                    <p>{question.optionTwo.text}</p>
                    <button className="vote-button" onClick={onClickOptionTwo}>Click</button>
                </div>
            </div>
        </div>
    )
}
