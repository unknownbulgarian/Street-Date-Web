import React, { useEffect, useState } from 'react'
import styles from './ProfileArea.module.css'

import API from '../../Utils/API.tsx';


import DefaultGame from '../../Components/DefaultGame/DefaultGame.tsx';
import Navbar from '../../Components/Navbar/Navbar.tsx';

import { IoIosSettings } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import Settings from '../../Components/Settings/Settings.tsx';

import { useSession } from '../../States/Session/Session.tsx';
import { useOnlineProvider } from '../../States/Online/Online.tsx';
import { useNavigate } from 'react-router-dom';

export default function ProfileArea() {

    const router = useNavigate()

    const { removeOnline } = useOnlineProvider()

    const [isUserInfo, setIsUserInfo] = useState<boolean>(true)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isSettings, setIsSettings] = useState<boolean>(false)

    const [gender, setGender] = useState<string>('')
    const [instagram, setInstagram] = useState<string>('')
    const [photo, setPhoto] = useState<any>(null);

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')





    useEffect(() => {
        if (isPlaying === false) {
            removeOnline()
        }
    }, [isPlaying])





    const checkUserInfo = async () => {
        try {
            const response = await fetch(API.api + '/checkUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            //console.log(data)

            if (data.error) {
                setIsUserInfo(false)
            } else {
                setIsUserInfo(true)
                play()
            }

            //console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    }


    const getUserInfo = async () => {
        try {
            const response = await fetch(API.api + '/getUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            // console.log(data)

            if (data.error) {

            } else {
                setGender(data.gender)
                setInstagram(data.instagram)
                setPhoto(data.photo)
                setName(data.name)

            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const getUserMain = async () => {
        try {
            const response = await fetch(API.api + '/getNameEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            // console.log(data)

            if (data.error) {

            } else {
                setName(data.name)
                setEmail(data.email)
            }
            //console.log(data)

        } catch (error: any) {
        }
    }

    const updateName = async () => {
        try {
            const response = await fetch(API.api + '/updateName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), newName: name })
            });

            const responseData = await response.json();

            const data = responseData
            // console.log(data)

            if (data.error) {
                //  setError(data.error)
                //     setSuccess('')

            } else {
                // setName(data.name)
                //  setError('')
                //    setSuccess('Name wurde erfolgreich aktualisiert')
                //    setSuccessCode(2)
            }
            //console.log(data)

        } catch (error: any) {
        }
    }

    const play = async () => {
        try {
            const response = await fetch(API.api + '/onlineMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), online_id: localStorage.getItem('online_id') })
            });

            const responseData = await response.json();

            const data = responseData
            //console.log(data)

            if (data.error) {

            } else {
                localStorage.setItem('online_id', data._id)
                setIsPlaying(true)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }



    useEffect(() => {
        getUserInfo()
        getUserMain()
    }, [])



    return (
        <>
            {!isPlaying &&
                <>
                    <Navbar />
                    {!isUserInfo &&
                        <div className={styles.firststeps}>
                            <div className={styles.stepsbox} data-aos="fade-down">
                                <h2>Du hast dein Konto immer noch nicht eingerichtet !</h2>
                                <p>Suchen Sie nach Ihren Profileinstellungen und geben Sie die erforderlichen Informationen ein.</p>
                                <button onClick={() => { setIsUserInfo(true) }}>Schließen</button>
                            </div>
                        </div>
                    }


                    {isSettings &&
                        <Settings
                            gender={gender}
                            instagram={instagram}
                            name={name}
                            photoUrl={photo}
                            setGender={setGender}
                            setPhoto={setPhoto}
                            setName={setName}
                            setInstagram={setInstagram}
                            close={() => { setIsSettings(false); getUserInfo() }} />
                    }


                    <div className={styles.area}>
                        <div className={styles.boxes}>
                            <div data-aos="zoom-in" onClick={() => { setIsSettings(true) }} className={styles.box}>
                                <span className={styles.boxicon}><IoIosSettings /></span>
                                <h2>Einstellungen</h2>
                                <p>Gestalten Sie Ihr Profil so, dass Sie die andere Person beeindrucken können</p>
                                <button>Profil bearbeiten</button>
                            </div>

                            <div data-aos="zoom-in" onClick={() => { checkUserInfo() }} className={`${styles.box} ${styles.box2}`}>
                                <span className={styles.boxicon}><FaInstagram /></span>
                                <h2>Partnersuche</h2>
                                <p>Mit unserer App kannst du im Handumdrehen ein Date finden</p>
                                <button className={styles.playbtn}>Jetzt spielen</button>
                            </div>

                            <div onClick={() => { router('/statistiken/' + localStorage.getItem('publicId')) }} className={styles.box} data-aos="zoom-in">
                                <span className={styles.boxicon}><IoIosSettings /></span>
                                <h2>Deine Statistiken</h2>
                                <p>Du kannst deine Lebenszeitstatistik sehen</p>
                                <button>Jetzt anzeigen</button>
                            </div>
                        </div>
                    </div>

                </>
            }


            {isPlaying && <DefaultGame setIsPlaying={setIsPlaying} />}


        </>
    )
}
