import API from '../../../Utils/API';
import Loader from '../../../Components/Loader/Loader';
import LoaderTime from '../../../Utils/LoaderTime';
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearchengin } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";

import styles from './Games.module.css'



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
                router('/statistiken/' + publicId)
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
                router(`/statistiken/${publicId}`)

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
                                    backColor='hsla(273, 100%, 76%, 0.8)'
                                    titleColor='white'
                                    type='text'
                                >
                                    <FaSearchengin />
                                </InputIcon>
                            </div>

                            <div className={styles.thegames}>

                                {games?.map((game, index) => (
                                    <React.Fragment key={index}>
                                        <div className={styles.gamebox} onClick={() => { window.open(`/statistiken/${publicId}/spiele/geschichte/${game.roomId}`, '_blank') }}>
                                            <h2>Du hast gespielt mit
                                                <span style={{
                                                    color: 'hsla(293, 100%, 79%, 1)'
                                                }}> {game.partnerUsername}</span>
                                            </h2>
                                            <p>{game.createdAt}</p>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>

                            {games &&
                                <Pagination
                                    publicId={publicId}
                                    currentPage={Number(page)}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            }
                        </div>
                    }

                    {!games &&
                        <div className={styles.nogames}>
                            <p>Du hast keine Spiele gespielt {'):'}</p>
                            <div className={styles.btns}>
                                <TextIcon
                                    title='Zurückgehen'
                                    fontSize='1rem'
                                    backgroundColor='rgba(152, 78, 248, 0.568)'
                                    boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                                    borderRadius='0.3em'
                                    width='140px'
                                    height='25px'
                                    onClick={() => { router('/statistiken/' + publicId) }}
                                >
                                    <IoMdArrowRoundBack />
                                </TextIcon>

                                <TextIcon
                                    title='Dokumentation'
                                    fontSize='1rem'
                                    backgroundColor='rgba(176, 132, 226, 0.164)'
                                    boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                                    borderRadius='0.3em'
                                    width='170px'
                                    height='25px'
                                    onClick={() => { router('/dokumentation') }}
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
