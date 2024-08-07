import { useEffect, useState } from 'react'
import API from '../../Utils/API'
import styles from './Upload.module.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import InputIcon from '../../Components/InputIcon/InputIcon'
import LoaderTime from '../../Utils/LoaderTime'
import Loader from '../../Components/Loader/Loader'

import { FaFileUpload } from "react-icons/fa";

import { BsFileEarmarkTextFill } from "react-icons/bs";
import TextIcon from '../../Components/TextIcon/TextIcon'

interface gameInfo {
    partnerUsername: string;
    roomId: string;
}

export default function Upload() {

    const { game } = useParams()
    const router = useNavigate()

    const [title, setTitle] = useState<string>('')

    const [gameInfo, setGameInfo] = useState<gameInfo>()
    const [pushedCategories, setPushedCategories] = useState<string[]>([]);

    const [error, setError] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const pushCategorie = (categorie: string) => {
        if (pushedCategories.includes(categorie)) {
            setPushedCategories(pushedCategories.filter(cat => cat !== categorie));
        } else {
            setPushedCategories([...pushedCategories, categorie]);
        }
    };

    const categories: Array<string> = [
        'crazy',
        'Love',
        'Idiot',
        'goofy',
        'funny',
        'cool',
        'chill',
        '10/10',
        'skibidi',
        'no chance',
        'I am in love',
        '0/10',
        'premium bitch',
        '100/10',
        'hot',
        'meme',
    ]

    const checkAuth = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/checkUploader', {
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
                router(`/`)

            } else {
                setGameInfo(data)
                LoaderTime.loader(setIsLoading)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    const uploadGame = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/uploadGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, roomId: game, title, pushedCategories })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {
                setError(data.error)
            } else {
                setError('')
                router(`/explore/1/${data.roomId}`)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    return (
        <>

            {isLoading && <Loader />}


            {!isLoading &&
                <div className={styles.upload}>
                    <div className={styles.uploadbox}>
                        <h2>Upload your chat with <span style={{ color: 'hsla(299, 100%, 81%, 1)' }}>{gameInfo?.partnerUsername}</span></h2>
                        <div className={styles.input}>
                            <InputIcon
                                title='Titel'
                                background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                width='350px'
                                height='30px'
                                borderRadius='0.3em'
                                isBoxShadow={true}
                                color='white'
                                titleColor='white'
                                fontSize='0.9rem'
                                iconFontSize='1.1rem'
                                type='text'
                                onInput={(e) => { setTitle(e.currentTarget.value) }}
                            >
                                <BsFileEarmarkTextFill />
                            </InputIcon>
                        </div>

                        <div className={styles.categories}>
                            <p>Choose one or more Categories</p>
                            <div className={styles.thecategories}>
                                {categories.map((categorie, index) => (
                                    <div style={{
                                        background: pushedCategories.includes(categorie) ? 'green' : ''
                                    }} onClick={() => { pushCategorie(categorie) }} key={index} className={styles.categoriebox}>
                                        <h3>{categorie}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <TextIcon
                            title='Upload'
                            height='25px'
                            width='140px'
                            borderRadius='0.3em'
                            color='white'
                            background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                            marginTop='1.5em'
                            onClick={() => { uploadGame() }}
                        >
                            <FaFileUpload />
                        </TextIcon>

                        <div className={styles.error}>
                            {error !== '' && <p>{error}</p>}
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
