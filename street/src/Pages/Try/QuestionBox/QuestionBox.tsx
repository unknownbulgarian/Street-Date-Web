import React from 'react'
import styles from './QuestionBox.module.css'

interface QuestionProps {
    gameProgress: number;
    isFirst: boolean;
    partnerUsername: string;
    question: string;
    answer: string
    writeQuestion: (value: string) => void;
    writeAnswer: (value: string) => void;

    firstNum: number;
    secondNum: number;
    lastNum: number;

}

export default function QuestionBox({ gameProgress, isFirst, writeQuestion, writeAnswer, partnerUsername, answer, question, firstNum, secondNum, lastNum }: QuestionProps) {
    return (

        <div className={styles.questionbox}>

            <div className={styles.thequestion}>
                {gameProgress === firstNum && isFirst &&
                    <input data-aos="fade-right" spellCheck={false} autoComplete='off' onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            writeQuestion(e.currentTarget.value)
                        }
                    }}  className={`${styles.question}`} placeholder='Schreibe deine Frage auf'></input>
                }
                {gameProgress > firstNum &&
                    <div className={styles.finalquestion} data-aos="fade-right">
                        <p><span style={{ textDecoration: 'underline', fontWeight: '800' }}>{!isFirst && `${partnerUsername}`}</span> {!isFirst && 'fragt:'} {question}</p>
                    </div>
                }
            </div>

            <div className={styles.theanswer}>
                {!isFirst && gameProgress === secondNum && <input spellCheck={false} autoComplete='off' onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        writeAnswer(e.currentTarget.value)
                    }
                }} className={styles.answer} placeholder='Schreibe deine Antwort auf'></input>
                }
                {gameProgress > lastNum &&
                    <div className={styles.finalanswer} data-aos="fade-left">
                        <p><span style={{ textDecoration: 'underline', fontWeight: '800' }}>{isFirst && `${partnerUsername}`}</span> {isFirst && 'sagt:'} {answer}</p>
                    </div>
                }
            </div>
        </div>
    )
}
