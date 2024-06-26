import React, { useEffect, useState } from 'react'
import styles from './ProfileArea.module.css'

import API from '../../Utils/API';

import InputIcon from '../../Components/InputIcon/InputIcon';

import DefaultGame from '../DefaultGame/DefaultGame.tsx';
import Navbar from '../../Components/Navbar/Navbar';

import { IoIosSettings } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import { useSession } from '../../States/Session/Session';
import { useOnlineProvider } from '../../States/Online/Online';

export default function ProfileArea() {

    const { removeOnline } = useOnlineProvider()

    const [isUserInfo, setIsUserInfo] = useState<boolean>(true)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isSettings, setIsSettings] = useState<boolean>(false)

    const [gender, setGender] = useState<string>('')
    const [instagram, setInstagram] = useState<string>('')
    const [photo, setPhoto] = useState<any>(null);

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const [errorCode, setErrorCode] = useState<number>(1)
    const [successCode, setSuccessCode] = useState<number>(1)

    useEffect(() => {
        if (isPlaying === false) {
            removeOnline()
        }
    }, [isPlaying])

    const resetLogs = () => {
        setError('')
        setSuccess('')
    }



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

    const updateUserInfo = async () => {
        try {
            const formData = new FormData();
            formData.append('gender', gender);
            formData.append('instagram', instagram);
            const token = localStorage.getItem('token');
            if (token) {
                formData.append('token', token);
            }
            if (photo) {
                formData.append('photo', photo);
            }
            const response = await fetch(API.api + '/addUserInfoMember', {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();

            const data = responseData

            //  console.log(data)

            if (data.error) {
                setError(data.error)
                setErrorCode(1)
                setSuccess('')
            } else {
                setSuccess('Benutzerinformationen erfolgreich aktualisiert')
                setSuccessCode(1)
                setError('')
            }

            // console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    };

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

                if (data.photo === '') {
                    setPhoto('e')
                }
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
                setError(data.error)
                setSuccess('')
                setErrorCode(2)
            } else {
                setName(data.name)
                setError('')
                setSuccess('Name wurde erfolgreich aktualisiert')
                setSuccessCode(2)
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
                        <div className={styles.settings}>
                            <div className={styles.settingsbox} data-aos="zoom-in">
                                <span onClick={() => { setIsSettings(false); resetLogs() }} className={styles.settingsclose}><IoMdClose /></span>
                                <h2>Profil-Einstellungen</h2>
                                <div className={styles.thesettings}>
                                    <h3>Spiel-Einstellungen</h3>
                                    <select value={gender} onChange={(e) => { setGender(e.currentTarget.value) }}>
                                        <option value=''>Wählen Sie Ihr Geschlecht</option>
                                        <option value='Männlich'>Männlich</option>
                                        <option value='Weiblich'>Weiblich</option>
                                        <option value='Andere'>Andere</option>
                                    </select>

                                    <InputIcon
                                        backColor='rgba(122, 12, 247, 0.856)'
                                        border='none'
                                        borderRadius='0.3em'
                                        color='white'
                                        height='30px'
                                        title='Schreiben Sie Ihr Instagram'
                                        titleColor='white'
                                        width='320px'
                                        value={instagram}
                                        onInput={(e: any) => { setInstagram(e.currentTarget.value) }}
                                        type='text'

                                    >
                                        <FaInstagram />
                                    </InputIcon>

                                    <input onChange={(e) => {
                                        if (e.currentTarget.files && e.currentTarget.files[0]) {
                                            setPhoto(e.currentTarget.files[0]);
                                        }
                                    }} type="file" name="file" id="file" className={styles.inputfile} />
                                    <label htmlFor="file">Wählen Sie ein Foto</label>
                                    <button onClick={() => { updateUserInfo() }}>Aktualisieren</button>
                                    {success !== '' && successCode === 1 && <p data-aos="fade-right" className={styles.success}>{success}!</p>}
                                    {error !== '' && errorCode === 1 && <p data-aos="fade-right" className={styles.error}>{error}!</p>}
                                </div>

                                <h2>Kontoeinstellungen</h2>
                                <div className={styles.thesettings}>
                                    <h3>Allgemein</h3>
                                    <InputIcon
                                        backColor='rgba(122, 12, 247, 0.856)'
                                        border='none'
                                        borderRadius='0.3em'
                                        color='white'
                                        height='30px'
                                        title='Schreiben Sie Ihr Instagram'
                                        titleColor='white'
                                        width='320px'
                                        value={name}
                                        onInput={(e: any) => { setName(e.currentTarget.value) }}
                                        type='text'

                                    >
                                        <IoPersonSharp />
                                    </InputIcon>

                                    <button onClick={() => { updateName() }}>Name aktualisieren</button>
                                    {success !== '' && successCode === 2 && <p  className={styles.success}>{success}!</p>}
                                    {error !== '' && errorCode === 2 && <p  className={styles.error}>{error}!</p>}
                                    <InputIcon
                                        backColor='rgba(122, 12, 247, 0.856)'
                                        border='none'
                                        borderRadius='0.3em'
                                        color='white'
                                        height='30px'
                                        title='Schreiben Sie Ihr Instagram'
                                        titleColor='white'
                                        disabled={true}
                                        width='320px'
                                        value={email}
                                        onInput={(e: any) => { setEmail(e.currentTarget.value) }}
                                        type='text'

                                    >
                                        <MdEmail />
                                    </InputIcon>

                                </div>
                            </div>
                        </div>
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

                            <div className={styles.box} data-aos="zoom-in">
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
