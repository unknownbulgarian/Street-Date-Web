import { useEffect, useRef, useState, } from 'react';
import React from 'react';
import styles from './page.module.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import TextIcon from '../../../Components/TextIcon/TextIcon';
import QuestionBox from '../../Try/QuestionBox/QuestionBox';
import QuestionBoxO from '../../Try/QuestionBoxO/QuestionBoxO';

import { MdDelete } from "react-icons/md";

import API from '../../../Utils/API';

import LoaderTime from '../../../Utils/LoaderTime';
import Loader from '../../../Components/Loader/Loader';

import { FaEdit } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

interface answers {
    answer: string;
    instagram: string;
    userId: string;
}

interface questions {
    question: string;
    answer: string;
}


interface Post {
    Date: string;
    categories: Array<string>
    from: string;
    publicId: string;
    title: string;
    roomId: string;
    game: {
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
}


export default function ExploreGame() {

    const { page, game } = useParams()

    const router = useNavigate()

    const [gameProgress, setGameProgress] = useState<number>(15)
    const [photoUrl, setPhotoUrl] = useState<string>('')
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<Post>()
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const [title, setTitle] = useState<string>('')

    const [isEditTitle, setIsEditTitle] = useState<boolean>(false)

    const [error, setError] = useState<string>('')

    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        let errorTimeout: any;
        clearTimeout(errorTimeout)

        if (error !== '') {
            errorTimeout = setTimeout(() => {
                setError('')
            }, 6000);
        }

        return () => {
            clearInterval(errorTimeout)
        }
    }, [error])


    const getAuth = async () => {
        const token = localStorage.getItem('token')
        const publicIdg = localStorage.getItem('publicId')
        try {
            const response = await fetch(API.api + '/getAuth', {
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
                checkIfGameExist()
                setIsAuth(false)
            } else {
                //LoaderTime.loader(setIsLoading)
                setIsAuth(true)
                checkIfGameExist()
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const checkIfGameExist = async () => {
        try {
            const response = await fetch(API.api + '/getPublicGameData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game })
            });

            const responseData = await response.json();

            const data = responseData

            // console.log(data)

            if (data.error) {
                LoaderTime.loader(setIsLoading)
                router(`/erkunden/${page}`)
            } else {
                LoaderTime.loader(setIsLoading)
                setIsFirst(data.game.first)
                setPhotoUrl(data.game.img)
                setData(data)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const removeGame = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/removeGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game, token })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {

            } else {
                router(`/erkunden/${page}`)
            }

        } catch (error: any) {
        }
    }

    const changeTitle = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/changeTitle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game, token, title })
            });

            const responseData = await response.json();

            const data = responseData
 
            if (data.error) {
                setError(data.error)
                if (titleRef.current) {
                    titleRef.current.contentEditable = 'true';
                    titleRef.current.focus()
                }
            } else {
                location.reload()
                setError('')
            }

        } catch (error: any) {
        }
    }

    useEffect(() => {
        getAuth()
    }, [])

    useEffect(() => {
        if (isEditTitle) {
            if (titleRef.current) {
                titleRef.current.contentEditable = 'true';
                titleRef.current.focus()
            }
        }
    }, [isEditTitle])

    return (
        <>


            {error !== '' &&
                <div className={styles.error} data-aos="fade-down">
                    <p>{error}</p>
                </div>
            }



            {isLoading && <Loader />}


            {!isLoading &&
                <>
                    <div className={styles.exit}>
                        <TextIcon
                            title='Zurückgehen'
                            backgroundColor='red'
                            borderRadius='0.3em'
                            color='white'
                            width='170px'
                            height='30px'
                            onClick={() => { router(`/erkunden/${page}`) }}
                        >
                            <IoMdExit />
                        </TextIcon>
                    </div>

                    <div className={styles.found}>
                        <div className={styles.foundmain} data-aos="fade-down">
                            <div className={styles.removetitle}>
                                <h1>Blind Date zwischen {data?.from} und {data?.game.partnerUsername}</h1>
                                {isAuth && <FaRegTrashAlt onClick={() => { removeGame() }} className={styles.trashicon} />}
                            </div>
                            {data?.title &&
                                <div className={styles.titleedit}>
                                    <span
                                        onKeyDown={(e) => {
                                            if (e.keyCode === 13) {
                                                changeTitle();
                                                setIsEditTitle(false);
                                                e.currentTarget.contentEditable = 'false'
                                            }
                                        }}
                                        spellCheck={false}
                                        onInput={(e) => setTitle(e.currentTarget.innerText)}
                                        onBlur={(e) => {
                                            changeTitle();
                                            setIsEditTitle(false);
                                            e.currentTarget.contentEditable = 'false'
                                        }}
                                        ref={titleRef}
                                        style={{
                                            color: 'white',
                                            fontSize: '1.2rem',
                                            fontWeight: '600',
                                            paddingLeft: '0.2em',
                                            paddingRight: '0.2em'
                                        }}> {data?.title[0].toUpperCase() + data?.title.slice(1)}
                                    </span>
                                    <FaEdit onClick={() => { setIsEditTitle(true) }} className={styles.editicon} />
                                </div>
                            }
                            <p className={styles.moreinfo}>
                                [Gepostet von
                                <span onClick={() => { router(`/statistiken/${data?.publicId}`) }} className={styles.from}> {data?.from} </span>
                                am
                                <span className={styles.uploaddate}> {data?.Date} </span>]
                            </p>
                        </div>

                        <div className={styles.questions}
                            style={{

                            }}>
                            <div className={styles.firstquestion}>

                                {data?.game.questions.map((game, index) => (
                                    <React.Fragment key={index}>
                                        {index <= 2 &&
                                            <QuestionBox
                                                writeQuestion={() => { }}
                                                writeAnswer={() => { }}
                                                question={game.question}
                                                from={data.from}
                                                isGameReview='1'
                                                answer={game.answer}
                                                isFirst={isFirst}
                                                gameProgress={gameProgress}
                                                partnerUsername={data?.game.partnerUsername}
                                                firstNum={1}
                                                secondNum={2}
                                                lastNum={2}
                                            />
                                        }

                                    </React.Fragment>
                                ))}



                            </div>

                            {gameProgress > 6 && <p data-aos="fade-right" className={styles.middletxt}>{isFirst ? `Jetzt stellt ${data?.game.partnerUsername} ${data?.from} 3 Fragen` : `Jetzt stellt ${data?.from} ${data?.game.partnerUsername} 3 Fragen`}</p>}


                            <div className={styles.firstquestion}>
                                {data?.game.questions.map((game, index) => (
                                    <React.Fragment key={index}>
                                        {index > 2 &&
                                            <QuestionBoxO
                                                writeQuestion={() => { }}
                                                writeAnswer={() => { }}
                                                question={game.question}
                                                answer={game.answer}
                                                isFirst={isFirst}
                                                from={data.from}
                                                isGameReview='1'
                                                gameProgress={gameProgress}
                                                partnerUsername={data?.game.partnerUsername}
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
                                        {data?.game.finalAnswer !== '' &&
                                            <div className={styles.finalanswer}>
                                                <p><span style={{ textDecoration: 'underline' }}>{data?.game.partnerUsername}</span> {` sagt: ${data?.game.finalAnswer}`}</p>
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

