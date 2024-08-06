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

import { FaComment, FaEdit, FaHeart, FaLaughBeam } from "react-icons/fa";
import { IoIosSend, IoMdExit, IoMdTrash } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsEmojiDizzyFill, BsFillEmojiHeartEyesFill } from 'react-icons/bs';
import InputIcon from '../../../Components/InputIcon/InputIcon';

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

interface interactions {
    likes: number;
    laugh: number;
    lol: number;
    love: number;
}

interface isInteractions {
    lolExists: boolean;
    likeExists: boolean;
    laughExists: boolean;
    loveExists: boolean;
}

interface comments {
    comment: string;
    name: string;
    publicId: string;
    timestamp: string;
    userId: string;
    commentId: string;
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

    const [interactions, setInteractions] = useState<interactions>()
    const [isInteractions, setIsInteractions] = useState<isInteractions>()

    const [title, setTitle] = useState<string>('')

    const [isEditTitle, setIsEditTitle] = useState<boolean>(false)

    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState<Array<comments>>()
    const [commentsIds, setCommentsIds] = useState<Array<string>>()

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
        const publicId = localStorage.getItem('publicId')
        try {
            const response = await fetch(API.api + '/getAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, publicId, roomId: game })
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
                router(`/explore/${page}`)
            } else {
                LoaderTime.loader(setIsLoading)
                setIsFirst(data.game.first)
                setPhotoUrl(data.game.img)
                setData(data)
                getGameInfo()
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
                router(`/explore/${page}`)
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


    const getGameInfo = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/getGameInfo', {
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
            } else {
                setInteractions(data)
                checkInteractions()
                getComments()
            }
        } catch (error: any) {
        }
    }


    const addLike = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addLike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game, token })
            });

            const responseData = await response.json();

            const data = responseData

            // console.log(data)

            if (data.error) {

            } else {
                if (data.message === 'Like removed.') {
                    setIsInteractions((prevI) => ({
                        ...prevI,
                        likeExists: false,
                        lolExists: prevI?.lolExists ?? false,
                        laughExists: prevI?.laughExists ?? false,
                        loveExists: prevI?.loveExists ?? false
                    }));

                    setInteractions((prevI) => ({
                        ...prevI,
                        likes: (prevI?.likes ?? 0) - 1,
                        laugh: prevI?.laugh ?? 0,
                        lol: prevI?.lol ?? 0,
                        love: prevI?.love ?? 0
                    }))

                } else if (data.message = 'Like added.') {
                    setIsInteractions((prevI) => ({
                        ...prevI,
                        likeExists: true,
                        lolExists: prevI?.lolExists ?? false,
                        laughExists: prevI?.laughExists ?? false,
                        loveExists: prevI?.loveExists ?? false
                    }));

                    setInteractions((prevI) => ({
                        ...prevI,
                        likes: (prevI?.likes ?? 0) + 1,
                        laugh: prevI?.laugh ?? 0,
                        lol: prevI?.lol ?? 0,
                        love: prevI?.love ?? 0
                    }))
                }
            }
        } catch (error: any) {
        }
    }

    const addLaugh = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addLaugh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game, token })
            });

            const responseData = await response.json();

            const data = responseData

            //   console.log(data)

            if (data.error) {


            } else {
                if (data.message === 'Like removed.') {
                    setIsInteractions((prevI) => ({
                        ...prevI,
                        likeExists: prevI?.likeExists ?? false,
                        lolExists: prevI?.lolExists ?? false,
                        laughExists: false,
                        loveExists: prevI?.loveExists ?? false
                    }));
                    setInteractions((prevI) => ({
                        ...prevI,
                        likes: prevI?.likes ?? 0,
                        laugh: (prevI?.laugh ?? 0) - 1,
                        lol: prevI?.lol ?? 0,
                        love: prevI?.love ?? 0
                    }))
                } else if (data.message = 'Like added.') {
                    setIsInteractions((prevI) => ({
                        ...prevI,
                        likeExists: prevI?.likeExists ?? false,
                        lolExists: prevI?.lolExists ?? false,
                        laughExists: true,
                        loveExists: prevI?.loveExists ?? false
                    }));
                    setInteractions((prevI) => ({
                        ...prevI,
                        likes: prevI?.likes ?? 0,
                        laugh: (prevI?.laugh ?? 0) + 1,
                        lol: prevI?.lol ?? 0,
                        love: prevI?.love ?? 0
                    }))
                }
            }
        } catch (error: any) {
        }
    }

    const addLol = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addLol', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game, token })
            });

            const responseData = await response.json();

            const data = responseData

            //  console.log(data)

            if (data.error) {


            } else {
                if (data.message === 'Like removed.') {
                    setIsInteractions((prevI) => ({
                        ...prevI,
                        likeExists: prevI?.likeExists ?? false,
                        lolExists: false,
                        laughExists: prevI?.laughExists ?? false,
                        loveExists: prevI?.loveExists ?? false
                    }));
                    setInteractions((prevI) => ({
                        ...prevI,
                        likes: prevI?.likes ?? 0,
                        laugh: prevI?.laugh ?? 0,
                        lol: (prevI?.lol ?? 0) - 1,
                        love: prevI?.love ?? 0
                    }))
                } else if (data.message = 'Like added.') {
                    setIsInteractions((prevI) => ({
                        ...prevI,
                        likeExists: prevI?.likeExists ?? false,
                        lolExists: true,
                        laughExists: prevI?.laughExists ?? false,
                        loveExists: prevI?.loveExists ?? false
                    }));
                    setInteractions((prevI) => ({
                        ...prevI,
                        likes: prevI?.likes ?? 0,
                        laugh: prevI?.laugh ?? 0,
                        lol: (prevI?.lol ?? 0) + 1,
                        love: prevI?.love ?? 0
                    }))
                }
            }
        } catch (error: any) {
        }
    }

    const addLove = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addLove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game, token })
            });

            const responseData = await response.json();

            const data = responseData

            // console.log(data)

            if (data.error) {


            } else {
                if (data.message === 'Like removed.') {
                    setIsInteractions((prevI) => ({
                        ...prevI,
                        likeExists: prevI?.likeExists ?? false,
                        lolExists: prevI?.lolExists ?? false,
                        laughExists: prevI?.laughExists ?? false,
                        loveExists: false
                    }));
                    setInteractions((prevI) => ({
                        ...prevI,
                        likes: prevI?.likes ?? 0,
                        laugh: prevI?.laugh ?? 0,
                        lol: prevI?.lol ?? 0,
                        love: (prevI?.love ?? 0) - 1
                    }))
                } else if (data.message = 'Like added.') {
                    setIsInteractions((prevI) => ({
                        ...prevI,
                        likeExists: prevI?.likeExists ?? false,
                        lolExists: prevI?.lolExists ?? false,
                        laughExists: prevI?.laughExists ?? false,
                        loveExists: true
                    }));
                    setInteractions((prevI) => ({
                        ...prevI,
                        likes: prevI?.likes ?? 0,
                        laugh: prevI?.laugh ?? 0,
                        lol: prevI?.lol ?? 0,
                        love: (prevI?.love ?? 0) + 1
                    }))
                }
            }
        } catch (error: any) {
        }
    }

    const addComment = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game, token, comment })
            });

            const responseData = await response.json();

            const data = responseData

            // console.log(data)

            if (data.error) {


            } else {
                setComment('')
            }
        } catch (error: any) {
        }
    }

    const checkInteractions = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/checkInteractions', {
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
                setIsInteractions(data)
            }
        } catch (error: any) {
        }
    }

    const getComments = async () => {
        try {
            const response = await fetch(API.api + '/getComments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId: game, })
            });

            const responseData = await response.json();

            const data = responseData

            // console.log(data)

            if (data.error) {


            } else {
                setComments(data.comments)
                getCommentsIDS()
            }
        } catch (error: any) {
        }
    }


    const adminRemoveComment = async (commentId: string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/adminRemoveComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, commentId, roomId: game })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {


            } else {

            }
        } catch (error: any) {
        }
    }

    const userRemoveComment = async (commentId: string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/userRemoveComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, commentId, roomId: game })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {


            } else {

            }
        } catch (error: any) {
        }
    }

    const getCommentsIDS = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/getCommentsIDS', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, roomId: game })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {


            } else {
                setCommentsIds(data.commentIds)
            }
        } catch (error: any) {
        }
    }




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
                            onClick={() => { router(`/explore/${page}`) }}
                        >
                            <IoMdExit />
                        </TextIcon>
                    </div>

                    <div className={styles.found}>
                        <div className={styles.foundmain} data-aos="fade-down">
                            <div className={styles.removetitle}>
                                <h1>Blind Date between {data?.from} and {data?.game.partnerUsername}</h1>
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
                                    {isAuth && <FaEdit onClick={() => { setIsEditTitle(true) }} className={styles.editicon} />}
                                </div>
                            }

                            <p className={styles.moreinfo}>
                                [{!isAuth && 'Post from'}  {isAuth && 'You posted'}
                                {!isAuth && <span onClick={() => { router(`/stats/${data?.publicId}`) }} className={styles.from}> {data?.from} </span>} at
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

                            {gameProgress > 6 && <p data-aos="fade-right" className={styles.middletxt}>{isFirst ? `Now ${data?.game.partnerUsername} asks ${data?.from} 3 Questions` : `Now ${data?.from} asks ${data?.game.partnerUsername} 3 Questions`}</p>}


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
                                <h2>Final Results</h2>
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
                                                <p><span style={{ textDecoration: 'underline' }}>{data?.game.partnerUsername}</span> {` said: ${data?.game.finalAnswer}`}</p>
                                            </div>
                                        }
                                    </div>
                                }

                            </div>
                        }

                        <div className={styles.actions}>
                            <div className={styles.action}>
                                <div className={styles.actionbox}>
                                    <FaHeart onClick={() => { addLike() }}
                                        style={{ cursor: 'pointer', color: isInteractions?.likeExists ? '#dd62c9' : '' }}
                                    />
                                    <p>{interactions?.likes}</p>
                                </div>

                                <div className={styles.actionbox}>
                                    <FaLaughBeam onClick={() => { addLaugh() }} style={{ cursor: 'pointer', color: isInteractions?.laughExists ? '#dd62c9' : '' }} />
                                    <p>{interactions?.laugh}</p>
                                </div>

                                <div className={styles.actionbox}>
                                    <BsEmojiDizzyFill onClick={() => { addLol() }} style={{ cursor: 'pointer', color: isInteractions?.lolExists ? '#dd62c9' : '' }} />
                                    <p>{interactions?.lol}</p>
                                </div>

                                <div className={styles.actionbox}>
                                    <BsFillEmojiHeartEyesFill onClick={() => { addLove() }} style={{ cursor: 'pointer', color: isInteractions?.loveExists ? '#dd62c9' : '' }} />
                                    <p>{interactions?.love}</p>
                                </div>
                            </div>

                            <div className={styles.commentaction}>
                                <InputIcon
                                    background='linear-gradient(90deg, rgba(176,88,242,1) 45%, rgba(197,165,255,1) 100%)'
                                    borderRadius='0.3em'
                                    color='white'
                                    title='Write comment'
                                    width='400px'
                                    value={comment}
                                    titleColor='white'
                                    iconFontSize='1.1rem'
                                    fontSize='0.9rem'
                                    height='35px'
                                    type='text'
                                    onFocus={() => { }}
                                    border={'unset'}
                                    onKeyDown={(e: any) => {
                                        if (e.keyCode === 13) {
                                            addComment()

                                        }
                                    }}
                                    onInput={(e) => { setComment(e.currentTarget.value) }}
                                >
                                    <FaComment />
                                </InputIcon>

                                <TextIcon
                                    borderRadius='0.3em'
                                    title='Send'
                                    width='110px'
                                    color='white'
                                    background='linear-gradient(98deg, rgba(221,98,201,1) 16%, rgba(247,192,192,1) 100%)'
                                    boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                                    height='33px'
                                    iconFontSize='1.3rem'
                                    transition='all 800ms'
                                    onClick={() => { addComment() }}
                                >
                                    <IoIosSend />
                                </TextIcon>
                            </div>

                            <h2>Comments {`(${comments?.length})`}</h2>
                            <div className={styles.comments}>
                                {comments?.map((comment, index) => (
                                    <div key={index} className={styles.maincommentbox}>
                                        <div className={styles.commentbox}>
                                            <h3><span onClick={() => { router(`/stats/${comment.publicId}`) }} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{comment.name}</span> commented: </h3>
                                            <p>{comment.comment}</p>
                                        </div>
                                        <div className={styles.commentinfo}>
                                            <p className={styles.commentdate}>[ {comment.timestamp} ]</p>
                                            {isAuth && <IoMdTrash onClick={() => { adminRemoveComment(comment.commentId) }} className={styles.commentremove} />}
                                            {!isAuth && commentsIds?.some((c) => c === comment.commentId) && <IoMdTrash onClick={() => { userRemoveComment(comment.commentId) }} className={styles.commentremove} />}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </>
            }

        </>

    )
}

