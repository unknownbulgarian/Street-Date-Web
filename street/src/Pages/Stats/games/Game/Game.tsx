import { useParams } from "react-router-dom"
import API from "../../../../Utils/API"
import { useNavigate } from "react-router-dom"
import LoaderTime from "../../../../Utils/LoaderTime"
import Loader from "../../../../Components/Loader/Loader"
import React, { useEffect, useState } from "react"
import styles from './Game.module.css'

import QuestionBox from "../../../Try/QuestionBox/QuestionBox"
import QuestionBoxO from "../../../Try/QuestionBoxO/QuestionBoxO"
import TextIcon from "../../../../Components/TextIcon/TextIcon"
import { FaCloudUploadAlt } from "react-icons/fa";

interface answers {
    userId: string;
    answer: string;
    instagram: string;
}

interface questions {
    question: string;
    answer: string;
}

interface GameProps {
    error?: string;
    answers: Array<answers>
    createdAt: string;
    finalAnswer: string;
    first: boolean;
    img: string;
    myUserId: string;
    partnerUsername: string;
    questions: Array<questions>
    roomId: string;
    users: Array<string>

}

export default function Game() {

    const { publicId, game } = useParams()

    const [gameProgress, setGameProgress] = useState<number>(15)
    const [photoUrl, setPhotoUrl] = useState<string>('')
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<GameProps>(
        { answers: [], createdAt: '', finalAnswer: '', first: false, img: '', myUserId: '', partnerUsername: '', questions: [], roomId: '', users: [] }
    )

    const router = useNavigate()

    const getAuth = async () => {
        const token = localStorage.getItem('token')
        const publicIdg = localStorage.getItem('publicId')
        try {
            const response = await fetch(API.api + '/getStatsAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, publicId: publicIdg })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {
                router(`/stats/${publicId}`)
            } else {
                //LoaderTime.loader(setIsLoading)
                checkIfGameExist()
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const checkIfGameExist = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/checkIfGameExist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, roomId: game })
            });

            const responseData = await response.json();

            const data = responseData

           // console.log(data)

            if (data.error) {
                LoaderTime.loader(setIsLoading)
                router(`/stats/${publicId}/games/1`)
            } else {
                LoaderTime.loader(setIsLoading)
                setIsFirst(data.first)
                setPhotoUrl(data.img)
                setData(data)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }


    useEffect(() => {
        getAuth()
    }, [])

    return (
        <>


            {isLoading && <Loader />}


            {!isLoading &&
                <>
                    <div className={styles.found}>
                        <div className={styles.foundmain} data-aos="fade-down">
                            <h1>You had Blind Date with {data?.partnerUsername}</h1>
                            <p>The history of the Game {game}</p>
                            <TextIcon
                                title='Upload Game'
                                color="white"
                                background="linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)"
                                width="170px"
                                marginTop="1em"
                                borderRadius="0.3em"
                                height="30px"
                                onClick={() => {router(`/upload/${game}`)}}
                                onHover={(e) => {e.currentTarget.style.backgroundColor = 'hsla(290, 100%, 69%, 1)'}}
                                onUnHover={(e) => {e.currentTarget.style.backgroundColor = 'hsla(290, 100%, 69%, 0.8)'}}
                            >
                                <FaCloudUploadAlt />
                            </TextIcon>
                        </div>

                        <div className={styles.questions}
                            style={{

                            }}>
                            <div className={styles.firstquestion}>

                                {data.questions.map((game, index) => (
                                    <React.Fragment key={index}>
                                        {index <= 2 &&
                                            <QuestionBox
                                                writeQuestion={() => { }}
                                                writeAnswer={() => { }}
                                                question={game.question}
                                                answer={game.answer}
                                                isFirst={isFirst}
                                                gameProgress={gameProgress}
                                                partnerUsername={data?.partnerUsername}
                                                firstNum={1}
                                                secondNum={2}
                                                lastNum={2}
                                            />
                                        }

                                    </React.Fragment>
                                ))}



                            </div>

                            {gameProgress > 6 && <p data-aos="fade-right" className={styles.middletxt}>{isFirst ? 'Nun wird Ihnen die Person 3 Fragen stellen' : 'Jetzt kannst du der Person 3 Fragen stellen'}</p>}


                            <div className={styles.firstquestion}>
                                {data.questions.map((game, index) => (
                                    <React.Fragment key={index}>
                                        {index > 2 &&
                                            <QuestionBoxO
                                                writeQuestion={() => { }}
                                                writeAnswer={() => { }}
                                                question={game.question}
                                                answer={game.answer}
                                                isFirst={isFirst}
                                                gameProgress={gameProgress}
                                                partnerUsername={data?.partnerUsername}
                                                firstNum={7}
                                                secondNum={8}
                                                lastNum={8}
                                            />
                                        }


                                    </React.Fragment>
                                ))}



                            </div>

                        </div>

                        {gameProgress > 12 &&
                            <div className={styles.showphoto}>
                                <h2>Endgültige Ergebnisse</h2>
                                {photoUrl === '' &&
                                    <div className={styles.timerdiv}>
                                        <p className={styles.timertxt}>Zeigen des Fotos der anderen Person in 5 Sekunden.</p>
                                        <div className={styles.thetimer}></div>
                                    </div>
                                }
                                {photoUrl !== '' &&
                                    <div className={styles.interests}>
                                        {data.finalAnswer !== '' &&
                                            <div className={styles.finalanswer}>
                                                <p><span style={{ textDecoration: 'underline' }}>{data?.partnerUsername}</span> {` sagt: ${data.finalAnswer}`}</p>
                                            </div>
                                        }
                                    </div>
                                }

                            </div>
                        }
                    </div>
                </>
            }

        </>

    )
}

