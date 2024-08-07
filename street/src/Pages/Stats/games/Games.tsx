import API from '../../../Utils/API';
import Loader from '../../../Components/Loader/Loader';
import LoaderTime from '../../../Utils/LoaderTime';
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearchengin } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";

import styles from './Games.module.css'

import { FaRegTrashAlt } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import Pagination from '../../../Components/Pagination/Pagination';
import InputIcon from '../../../Components/InputIcon/InputIcon';
import TextIcon from '../../../Components/TextIcon/TextIcon';

import { IoMdArrowRoundBack } from "react-icons/io";

interface answers {
    answer: string;
    instagram: string;
    userId: string;
}

interface questions {
    question: string;
    answer: string;
}



interface games {
    answers: Array<answers>
    createdAt: string;
    finalAnswer: string;
    first: boolean;
    img: string;
    myUserId: string;
    partnerUsername: string;
    questions: Array<questions>
    isPublic: boolean;
    roomId: string;
    users: Array<string>
}

export default function Games() {

    const { publicId, page } = useParams()
    const router = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [games, setGames] = useState<Array<games>>()

    const [isPublicGames, setIsPublicGames] = useState<boolean>(false)
    const [isPrivateGames, setIsPrivateGames] = useState<boolean>(false)

    const togglePublicGames = () => {
        setIsPublicGames(p => !p)
    }

    const togglePrivateGames = () => {
        setIsPrivateGames(p => !p)
    }

    useEffect(() => {
        if (isPrivateGames) {
            setIsPublicGames(false)
        }
    }, [isPrivateGames])

    useEffect(() => {
        if (isPublicGames) {
            setIsPrivateGames(false)
        }
    }, [isPublicGames])


    const getUserInfo = async () => {
        try {
            const response = await fetch(API.api + '/getPublicData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ publicId })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {
                LoaderTime.loader(setIsLoading)
                router('/stats/' + publicId)
            } else {
                getAuth()
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

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
                getGames()
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const getGames = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/getGames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, page })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {
                LoaderTime.loader(setIsLoading)
            } else {
                LoaderTime.loader(setIsLoading)
                setGames(data.games);
                setTotalPages(data.totalPages);
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const removeGame = async (roomId: string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/removeLocalGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, roomId })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {

            } else {
                location.reload()
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const searchGames = async (value: string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/searchGames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, value })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {
                LoaderTime.loader(setIsLoading)
            } else {
                LoaderTime.loader(setIsLoading)
                setGames(data.games);
                setTotalPages(data.totalPages);
            }

            //console.log(data)

        } catch (error: any) {
        }
    }


    useEffect(() => {
        getUserInfo()
    }, [publicId, page])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading &&
                <>
                    {games &&
                        <div className={styles.games}>
                            <div className={styles.search}>
                                <InputIcon
                                    title='Suche (Benutzernamen...)'
                                    color='white'
                                    width='500px'
                                    height='35px'
                                    borderRadius='0.3em'
                                    background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                    titleColor='white'
                                    type='text'
                                >
                                    <FaSearchengin />
                                </InputIcon>
                            </div>

                            <div className={styles.filters}>
                                <p>Filters</p>
                                <div className={styles.thefilters}>
                                    <div
                                        style={{
                                            backgroundColor: isPublicGames ? 'hsla(246, 100%, 72%, 1)' : ''
                                        }}
                                        onClick={() => { togglePublicGames() }} className={styles.filterbox}>
                                        <p>Public Games</p>
                                    </div>

                                    <div
                                        style={{
                                            backgroundColor: isPrivateGames ? 'hsla(246, 100%, 72%, 1)' : ''
                                        }}
                                        onClick={() => { togglePrivateGames() }} className={styles.filterbox}>
                                        <p>Private Games</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.thegames}>

                                {games?.map((game, index) => (
                                    <React.Fragment key={index}>
                                        {!isPrivateGames && !isPublicGames &&
                                            <div className={styles.gamecontainer}>
                                                <div className={styles.gamebox} onClick={() => { window.open(`/stats/${publicId}/games/history/${game.roomId}`, '_blank') }}>
                                                    <h2>Du hast gespielt mit
                                                        <span style={{
                                                            color: 'hsla(293, 100%, 79%, 1)'
                                                        }}> {game.partnerUsername}</span>
                                                    </h2>
                                                    <p>{game.createdAt}</p>
                                                </div>

                                                <div className={styles.actions}>
                                                    <FaRegTrashAlt onClick={() => { removeGame(game.roomId) }} className={styles.trashicon} />
                                                    {game.isPublic !== true
                                                        &&
                                                        <FaCloudUploadAlt onClick={() => { router(`/upload/${game.roomId}`) }} className={styles.uploadicon} />
                                                    }
                                                    {game.isPublic === true && <FaEye onClick={() => {router(`/explore/1/${game.roomId}`)}} className={styles.eyeicon} />}
                                                </div>
                                            </div>
                                        }

                                        {isPrivateGames &&
                                            <>
                                                {!game.isPublic &&
                                                    <div className={styles.gamecontainer}>
                                                        <div className={styles.gamebox} onClick={() => { window.open(`/stats/${publicId}/games/history/${game.roomId}`, '_blank') }}>
                                                            <h2>Du hast gespielt mit
                                                                <span style={{
                                                                    color: 'hsla(293, 100%, 79%, 1)'
                                                                }}> {game.partnerUsername}</span>
                                                            </h2>
                                                            <p>{game.createdAt}</p>
                                                        </div>

                                                        <div className={styles.actions}>
                                                            <FaRegTrashAlt onClick={() => { removeGame(game.roomId) }} className={styles.trashicon} />
                                                            <FaCloudUploadAlt onClick={() => { router(`/upload/${game.roomId}`) }} className={styles.uploadicon} />
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }

                                        {isPublicGames &&
                                            <>
                                                {game.isPublic === true &&
                                                    <div className={styles.gamecontainer}>
                                                        <div className={styles.gamebox} onClick={() => { window.open(`/stats/${publicId}/games/history/${game.roomId}`, '_blank') }}>
                                                            <h2>Du hast gespielt mit
                                                                <span style={{
                                                                    color: 'hsla(293, 100%, 79%, 1)'
                                                                }}> {game.partnerUsername}</span>
                                                            </h2>
                                                            <p>{game.createdAt}</p>
                                                        </div>

                                                        <div className={styles.actions}>
                                                            <FaRegTrashAlt onClick={() => { removeGame(game.roomId) }} className={styles.trashicon} />
                                                            <FaEye className={styles.eyeicon} />
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }

                                    </React.Fragment>
                                ))}
                            </div>

                            {games &&
                                <Pagination
                                    publicId={publicId}
                                    currentPage={Number(page)}
                                    isGames={true}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            }
                        </div>
                    }

                    {!games &&
                        <div className={styles.nogames}>
                            <p>You didn't finish any games {'):'}</p>
                            <div className={styles.btns}>
                                <TextIcon
                                    title='Go Back'
                                    fontSize='1rem'
                                    background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                    boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                                    borderRadius='0.3em'
                                    width='125px'
                                    height='30px'
                                    onClick={() => { router('/stats/' + publicId) }}
                                >
                                    <IoMdArrowRoundBack />
                                </TextIcon>

                                <TextIcon
                                    title='Documentation'
                                    fontSize='1rem'
                                    background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                    boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                                    borderRadius='0.3em'
                                    width='170px'
                                    height='30px'
                                    onClick={() => { router('/documentation') }}
                                >
                                    <IoIosDocument />
                                </TextIcon>
                            </div>
                        </div>
                    }

                </>
            }

        </>
    )
}
