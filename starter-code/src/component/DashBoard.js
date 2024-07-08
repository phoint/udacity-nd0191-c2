import React from "react";
import { Link } from "react-router-dom";
import { selectAllQuestions } from "../features/questions/questionSlice"
import { useSelector } from 'react-redux';
import {format} from 'date-fns';

export const Dashboard = () => {
    const authedUser = useSelector(state => state.authedUser.id)
    const questionList = useSelector(state => selectAllQuestions(state, authedUser))
    const answeredQuestions = questionList.filter(question => !question.done)
    const unansweredQuestions = questionList.filter(question => question.done)
    
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp)
        const formattedDate = format(date, 'hh:mm:a | MM/dd/yyyy')
        return formattedDate;
    }

    return (<div>
        <h3>Dashboard</h3>
        <div className="dashboard-container">
            <h2>New question</h2>
            <hr />
            <div className="questions">
                {questionList
                    .filter(question => !question.done)
                    .map(question => (
                        <div key={question.id} className="question-card">
                            <h3>{question.author}</h3>
                            <p>{formatDateTime(question.timestamp)}</p>
                            <Link to={`/question/${question.id}`}>
                                <button className="show-button">Show</button>
                            </Link>
                        </div>

                    )
                    )}
            </div>            
        </div>
        <div className="dashboard-container">
        <h2>Done</h2>
        <hr/>
        <div className="questions">



        {questionList
            .filter(question => question.done)
            .map(question => (
                <div key={question.id} className="question-card">
                <h3>{question.author}</h3>
                <p>{formatDateTime(question.timestamp)}</p>
                <Link to={`/question/${question.id}`}>
                    <button className="show-button">Show</button>
                </Link>
                </div>
            )
        )}
        </div>
        </div>
        </div>
        )
}