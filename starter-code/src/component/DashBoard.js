import { selectAllQuestions } from "../features/questions/questionSlice"
import { useSelector } from 'react-redux';

export const Dashboard = () => {
    const authedUser = useSelector(state => state.authedUser.id)
    const questionList = useSelector(state => selectAllQuestions(state, authedUser))
    

    return <div>
        <h3>Dashboard</h3>
        <h4>New question</h4>
        {questionList
            .filter(question => !question.done)
            .map(question => (
            <div key={question.id}>{question.id} - {question.author}</div>
            )
        )}
        <h4>Done</h4>
        {questionList
            .filter(question => question.done)
            .map(question => (
            <div key={question.id}>{question.id} - {question.author}</div>
            )
        )}
    </div>
}