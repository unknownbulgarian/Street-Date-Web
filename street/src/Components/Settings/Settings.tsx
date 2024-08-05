import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'
import styles from './Settings.module.css'
import { IoMdClose } from "react-icons/io";
import SettingToggler from '../SettingToggler/SettingToggler';
import { GrDocumentUpdate } from "react-icons/gr";
import API from '../../Utils/API';

import InputIcon from '../InputIcon/InputIcon';


import { FaUser } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import TextIcon from '../TextIcon/TextIcon';

interface SettingsProps {
    close: MouseEventHandler<any>;
    setGender: Dispatch<SetStateAction<string>>;
    setName: Dispatch<SetStateAction<string>>;
    setInstagram: Dispatch<SetStateAction<string>>;
    setPhoto: any;
    name: string;
    photoUrl: string;
    gender: string;
    instagram: string;
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
}

export default function Settings({ close, name, photoUrl, gender, instagram, setGender, setPhoto, setName, setInstagram, progress, setProgress }: SettingsProps) {

    const [isParticles, setIsParticles] = useState<boolean>(true)


    const [progessP, setProgressP] = useState<string>('')
    const [photoPreview, setPhotoPreview] = useState<any>('')

    const [error, setError] = useState<string>('')
    const [errorNum, setErrorNum] = useState<number>(0)

    const [success, setSuccess] = useState<string>('')
    const [successNum, setSuccessNum] = useState<number>(0)

    useEffect(() => {
        switch (progress) {
            case 1:
                setProgressP('15%')
                break;
            case 2:
                setProgressP('35%')
                break;
            case 3:
                setProgressP('65%')
                break;
            case 4:
                setProgressP('80%')
                break;
            case 5:
                setProgressP('100%')
                break;
        }
    }, [progress])



    const updateUserInfo = async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await fetch(API.api + '/addUserInfoMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, name, gender, instagram }),
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {
                setError(data.error)
                setErrorNum(1)
                setSuccess('')
                setSuccessNum(0)
            } else {
                setSuccess('Benutzerinformationen erfolgreich aktualisiert')
                setSuccessNum(1)
                setErrorNum(0)
                setError('')
            }

            // console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    };

    const updatePhoto = async () => {
        const token = localStorage.getItem('token')
        const formData = new FormData();

        if (token) {
            formData.append('token', token);
        }


        if (photoUrl) {
            formData.append('photo', photoUrl);
        }

        try {
            const response = await fetch(API.api + '/updatePhoto', {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            const data = responseData;

            //console.log(data)

            if (data.error) {
                setError(data.error);
                setErrorNum(2)
                setSuccess('')
                setSuccessNum(0)
            } else {
                //router.push('/Settings/Profile/Profile');
                setSuccess('')
                setSuccessNum(2)
                setError('');
                setErrorNum(0)
            }
        } catch (error) {
            console.error('Photo update failed', error);
        }
    };



    return (
        <div className={styles.settings}>
            <div className={styles.settingsbox} data-aos="zoom-in">
                <span onClick={close} className={styles.settingsclose}><IoMdClose /></span>
                <div className={styles.settingstop}>
                    <h2>Einstellungen</h2>
                    <div className={styles.settingprogress}>
                        <div style={{ width: progessP }} className={styles.progress}></div>
                    </div>
                </div>

                <div className={styles.mainsettings}>
                    <div className={styles.sidesetting}>
                        <div style={{
                            borderLeft: progress === 1 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 1 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(1) }}
                            className={styles.sidebox}>
                            <p>Allgemein</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 2 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 2 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(2) }}
                            className={styles.sidebox}>
                            <p>Konto Typ</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 3 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 3 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(3) }}
                            className={styles.sidebox}>
                            <p>Sicherheit</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 4 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 4 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(4) }}
                            className={styles.sidebox}>
                            <p>Das Spiel</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 5 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 5 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(5) }}
                            className={styles.sidebox}>
                            <p>Hilfe</p>
                        </div>

                    </div>

                    <div className={styles.right}>
                        {progress === 1 &&
                            <>
                                <SettingToggler
                                    title='Hintergrundpartikel'
                                    description='Aktivieren/Deaktivieren der Hintergrundpartikel'
                                    onClick={() => { }}
                                    toggled={isParticles}
                                    setToggle={setIsParticles}
                                />

                                <SettingToggler
                                    title='Hintergrundpartikel'
                                    description='Aktivieren/Deaktivieren der Hintergrundpartikel'
                                    onClick={() => { }}
                                    toggled={isParticles}
                                    setToggle={setIsParticles}
                                />
                            </>
                        }

                        {progress === 4 &&
                            <>
                                <div className={styles.gameinfo}>
                                    <div className={styles.all}>
                                        <h2>Profil-Informationen</h2>
                                        <p>Ändern Sie Ihre persönlichen Daten</p>

                                        <div className={styles.profileinputs}>
                                            <InputIcon
                                                background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                                borderRadius='0.3em'
                                                color='white'
                                                title='Name'
                                                value={name}
                                                width='70%'
                                                isBoxShadow={true}
                                                titleColor='white'
                                                height='30px'
                                                type='text'
                                                border='unset'
                                                onInput={(e) => { setName(e.currentTarget.value); }}
                                            >
                                                <FaUser />
                                            </InputIcon>

                                            <InputIcon
                                                background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                                borderRadius='0.3em'
                                                color='white'
                                                value={instagram}
                                                title='Instagram'
                                                width='70%'
                                                isBoxShadow={true}
                                                titleColor='white'
                                                height='30px'
                                                type='text'
                                                border='unset'
                                                onInput={(e) => { setInstagram(e.currentTarget.value) }}
                                            >
                                                <IoLogoInstagram />
                                            </InputIcon>

                                            <select value={gender} onChange={(e) => { setGender(e.currentTarget.value) }} >
                                                {gender === '' && <option>Wählen Sie Ihr Geschlecht</option>}
                                                <option value='Männlich'>Männlich</option>
                                                <option value='Weiblich'>Weiblich</option>
                                                <option value='Andere'>Andere</option>
                                            </select>

                                            <TextIcon
                                                marginTop='0.3em'
                                                title='Aktualisierung'
                                                background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                                width='145px'
                                                titleColor='white'
                                                borderRadius='0.3em'
                                                color='white'
                                                height='30px'
                                                onHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.7)' }}
                                                onUnHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.5)' }}
                                                fontSize='0.9rem'
                                                onClick={() => { updateUserInfo() }}
                                            >
                                                <GrDocumentUpdate />
                                            </TextIcon>

                                            {error !== '' && errorNum === 1 && <p style={{
                                                color: 'red',
                                                fontWeight: '500'
                                            }} >{error} !</p>}

                                            {success !== '' && successNum === 1 &&
                                                <p style={{
                                                    color: 'green',
                                                    fontWeight: '500'
                                                }} >{success} !</p>}


                                        </div>
                                    </div>
                                </div>

                                <div className={styles.gameinfo}>
                                    <div className={styles.all}>
                                        <h2>Ihr Vorzeigefoto</h2>
                                        <p style={{
                                            marginBottom: photoPreview ? '' : '1em'
                                        }}>Ändern Ihres Hauptfotos</p>
                                        {photoPreview && <img alt="Selected file preview" src={photoPreview ? photoPreview : photoUrl}></img>}
                                        <input onChange={(e) => {
                                            const files = e.currentTarget.files;

                                            if (files && files.length > 0 && files[0]) {
                                                const file = files[0];
                                                const fileUrl = URL.createObjectURL(file);
                                                setPhoto(file)
                                                setPhotoPreview(fileUrl);
                                            } else {

                                            }

                                        }} type="file" name="file" id="file" className={styles.inputfile} />
                                        <label htmlFor="file">Wählen Sie ein Foto</label>
                                        <TextIcon
                                            marginTop='1em'
                                            title='Aktualisierung'
                                            background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                            width='145px'
                                            titleColor='white'
                                            borderRadius='0.3em'
                                            color='white'
                                            height='30px'
                                            onClick={() => { updatePhoto() }}
                                            onHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.7)' }}
                                            onUnHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.5)' }}
                                            fontSize='0.9rem'
                                        >
                                            <GrDocumentUpdate />
                                        </TextIcon>

                                        {error !== '' && errorNum === 2 && <p style={{
                                            color: 'red',
                                            fontWeight: '500',
                                            marginTop: '1em'
                                        }} >{error} !</p>}

                                        {success !== '' && successNum === 2 &&
                                            <p style={{
                                                color: 'green',
                                                fontWeight: '500',
                                                marginTop: '1em'
                                            }} >{success} !</p>}


                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>


            </div>
        </div>
    )
}
