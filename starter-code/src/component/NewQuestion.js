import { useState } from "react"
import { useSelector, useDispatch} from 'react-redux'
import { LoadingStatus } from "../app/util"
import { addNewQuestion } from "../features/questions/questionSlice"

export const NewQuestion = () => {
    const [optionOneText, setOptionOneText] = useState('')
    const [optionTwoText, setOptionTwoText] = useState('')
    const [addQuestionRequest, setAddQuestionRequest] = useState(LoadingStatus.IDLE)
    const author = useSelector(state => state.authedUser.id)
    const dispatch = useDispatch()

    const canSave = [optionOneText, optionTwoText, author].every(Boolean) && addQuestionRequest === LoadingStatus.IDLE
    const onSaveQuestionClicked = async () => {
        if (canSave) {
            try {
                setAddQuestionRequest(LoadingStatus.PENDING)
                await dispatch(addNewQuestion({optionOneText,optionTwoText, author})).unwrap()
                setOptionOneText('')
                setOptionTwoText('')
            } catch (error) {
                alert('Error while adding New Question. \n', error.message)
            } finally {
                setAddQuestionRequest(LoadingStatus.IDLE)
            }
        }
    }

    return (
        <div>
            <div>New Question</div>
            <input type="text" placeholder="add option one" value = {optionOneText} onChange={e => setOptionOneText(e.target.value)}/>
            <input type="text" placeholder="add option two" value = {optionTwoText} onChange={e => setOptionTwoText(e.target.value)}/>
            <button onClick={onSaveQuestionClicked}>Submit</button>
        </div>
    )
}