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
        'verrückt',
        'Liebe',
        'Idiot',
        'goofy',
        'talahon',
        'cool',
        'chillen',
        '10/10',
        'skibidi',
        'auf keinen Fall',
        'Ich bin verliebt',
        '0/10',
        'Premium Chaya',
        '100/10',
        'heiß',
        'Meme',
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
                        <h2>Lade deinen Chat hoch mit <span style={{ color: 'hsla(299, 100%, 81%, 1)' }}>{gameInfo?.partnerUsername}</span></h2>
                        <div className={styles.input}>
                            <InputIcon
                                title='Titel'
                                backColor='hsla(279, 100%, 67%, 1)'
                                width='300px'
                                height='25px'
                                borderRadius='0.3em'
                                isBoxShadow={true}
                                color='white'
                                titleColor='white'
                                type='text'
                                onInput={(e) => { setTitle(e.currentTarget.value) }}
                            >
                                <BsFileEarmarkTextFill />
                            </InputIcon>
                        </div>

                        <div className={styles.categories}>
                            <p>Wähle eine oder mehrere Kategorien</p>
                            <div className={styles.thecategories}>
                                {categories.map((categorie, index) => (
                                    <div style={{
                                        backgroundColor: pushedCategories.includes(categorie) ? 'green' : ''
                                    }} onClick={() => { pushCategorie(categorie) }} key={index} className={styles.categoriebox}>
                                        <h3>{categorie}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <TextIcon
                            title='Hochladen'
                            height='25px'
                            width='160px'
                            borderRadius='0.3em'
                            color='white'
                            backgroundColor='hsla(279, 100%, 67%, 1)'
                            marginTop='1em'
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
