import React from "react"
import { useState } from "react"
import { useSelector, useDispatch} from 'react-redux'
import { LoadingStatus } from "../app/util"
import { addNewQuestion } from "../features/questions/questionSlice"
import { useLocation, useNavigate } from "react-router-dom"

export const NewQuestion = () => {
    const [optionOneText, setOptionOneText] = useState('')
    const [optionTwoText, setOptionTwoText] = useState('')
    const author = useSelector(state => state.authedUser.id)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const canSave = [optionOneText, optionTwoText, author].every(Boolean)
    const onSaveQuestionClicked = async () => {
        if (canSave) {
            try {
                await dispatch(addNewQuestion({optionOneText,optionTwoText, author})).unwrap()
                setOptionOneText('')
                setOptionTwoText('')
                navigate("/", {replace: true, state: {from: location}})
            } catch (error) {
                alert('Error while adding New Question. \n', error.message)
            }
        }
    }

    return (
        <div className="form-container">
            <h2>Would You Rather</h2>
            <p className="sub-heading">Create Your Own Poll</p>
            <div className="form">
                <div className="form-group">
                    <label>First Option</label>
                    <input type="text" data-testid="option-one-input" placeholder="Option One" value={optionOneText} onChange={e => setOptionOneText(e.target.value)} />
                    <label>Second Option</label>
                    <input type="text" data-testid="option-two-input" placeholder="Option Two" value={optionTwoText} onChange={e => setOptionTwoText(e.target.value)} />
                    <button className="submit-button" onClick={onSaveQuestionClicked} disabled={!canSave}>Submit</button>
                </div>
            </div>
        </div>
    )
}