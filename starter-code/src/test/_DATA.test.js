import { _saveQuestion, _saveQuestionAnswer } from '../_DATA'

const newQuestion = {
    optionOneText: 'option one test',
    optionTwoText: 'option two test',
    author: 'anonymous'
}

const errorRequest = {
    ...newQuestion,
    author: null
}

const newPoll = {
    authedUser: 'sarahedo',
    qid: 'xj352vofupe1dqz9emx13r',
    answer: 'optionOne'
}

const errorPoll = {
    ...newPoll,
    answer: null
}



describe('save question', () => {
    test('save question successful', async () => {
        expect.assertions(5);
        return await _saveQuestion(newQuestion).then(data => {
            expect(data).toHaveProperty('id');
            expect(data).toHaveProperty('timestamp');
            expect(data).toHaveProperty('author', newQuestion.author);
            expect(data).toHaveProperty(['optionOne', 'text'], newQuestion.optionOneText);
            expect(data).toHaveProperty(['optionTwo', 'text'], newQuestion.optionTwoText);
        });
    });

    test('save question unsuccesful', async () => { 
        expect.assertions(1);
        return await _saveQuestion(errorRequest).catch(error => 
            expect(error).toEqual("Please provide optionOneText, optionTwoText, and author"),
        );
     });
})

describe('save answer question', () => {
    test('save answer successful', () => {
        expect.assertions(1);
        return expect(_saveQuestionAnswer(newPoll)).resolves.toEqual(true)
    });

    test('save answer unsuccessful', () => { 
        expect.assertions(1);
        return expect(_saveQuestionAnswer(errorPoll)).rejects.toBe("Please provide authedUser, qid, and answer")
    })
})