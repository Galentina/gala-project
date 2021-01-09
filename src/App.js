import React, {useState} from 'react';
import './App.css';

function App() {

    const randomNumber = () => Math.floor(Math.random() * 10);
    const signs = ['+', '-', '*', '+', '-', '*', '+', '-', '*', '+'];
    const [examples, setExamples] = useState([]);
    const result = ['😍', '😰'];
    const result2 = ['✔️', '❌']

    const [counter, setCounter] = useState(0);
    const [userAnswer, setUserAnswers] = useState();

    const newQuestion = () => {
        const newExample = [...examples];
        const newId = counter + 1;
        setCounter(newId);
        const newNumX = randomNumber();
        const newNumY = randomNumber();
        const newSign = signs[Math.floor(Math.random() * 10)];
        const nNewAnswer = newAnswer(newNumX, newNumY, newSign)
        console.log(nNewAnswer);
        const newEl = {id: newId, numX: newNumX, numY: newNumY, sign: newSign, answer: +nNewAnswer, userResult: ''};
        newExample.push(newEl);
        setExamples(newExample);
    }


    const newAnswer = (num1, num2, sing) => {
        let answer;
        switch (sing) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
            default:
                answer = 'Error';
        }
        return answer;
    }

    const [message, setMessage] = useState([]);
    const onClickSubmit = (id, userAnswer) => {
        const newExamples = [...examples];
        const newMessage = [...message];
        newExamples.map(el => {
            if (el.id === id) {
                el.userResult = userAnswer;
                if (el.answer === +el.userResult)
                    newMessage.push(result[0]);
                else
                    newMessage.push(result[1]);
                } return el;
        })
        if (counter<10) {
            setMessage(newMessage);
            setExamples(newExamples);
            setUserAnswers('');
            newQuestion();
        }   else {
            alert('You have done it!!! Do you want to do it again?');
            setMessage([]);
            setExamples([]);
            setCounter(0);
            setUserAnswers('');
        }
    }

    return (
        <div className='App'>

            <header className='App-header'>Welcome to QUIZ!</header>
            <button disabled={counter > 0 && counter<10} onClick={newQuestion}>START</button>
            <hr/>
            <div>
                <p className="result">{message}</p>
            </div>
            <hr/>
            {examples.map(el =>
                <div >
                    <div className='divExample'>
                        {el.id}){'  '}{el.numX}{'  '}{el.sign} {'  '}{el.numY}{'  '}={'  '}{'  '}
                        <div className={(el.userResult !== '') ? 'divNon' : 'divYes'}>
                            <input type='number' value={userAnswer}
                                   onChange={(event) => setUserAnswers(event.target.value)}/>{'    '}
                            <button disabled={!userAnswer} className='buttonS'
                                    onClick={() => onClickSubmit(el.id, userAnswer)}>Submit
                            </button>

                        </div>
                        <div className={(el.userResult === '') ? 'divNon' : 'divYes'}>{el.userResult}</div>
                        &nbsp;&nbsp;{el.userResult !== '' && (el.answer === +el.userResult ? result2[0] : (result2[1]+ '  Right answer: ' + el.answer))}
                    </div>
                    <p>{' '}</p>
                </div>
            )}
            <div className='divF'>{'Galina Malareva'}</div>
        </div>

    );
}

export default App;
