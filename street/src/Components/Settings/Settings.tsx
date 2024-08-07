import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'
import styles from './Settings.module.css'
import { IoMdClose } from "react-icons/io";
import SettingToggler from '../SettingToggler/SettingToggler';
import { GrDocumentUpdate } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import API from '../../Utils/API';

import InputIcon from '../InputIcon/InputIcon';


import { FaLock, FaUser } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import TextIcon from '../TextIcon/TextIcon';
import { useSettings } from '../../States/Settings/SettingsState';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { FaUnlock } from 'react-icons/fa6';

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

    const nav = useNavigate()

    const { isParticles, setIsParticles } = useSettings()
    const [fa, setFa] = useState<boolean>(false)


    const [progessP, setProgressP] = useState<string>('')
    const [photoPreview, setPhotoPreview] = useState<any>('')

    const [error, setError] = useState<string>('')
    const [errorNum, setErrorNum] = useState<number>(0)

    const [success, setSuccess] = useState<string>('')
    const [successNum, setSuccessNum] = useState<number>(0)

    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')

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
                setSuccess('Updated successfully')
                setSuccessNum(1)
                setErrorNum(0)
                setError('')
                setTimeout(() => {
                    location.reload()
                }, 1000);
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
                setTimeout(() => {
                    location.reload()
                }, 1000);
            }
        } catch (error) {
            console.error('Photo update failed', error);
        }
    };

    const updatePassword = async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await fetch(API.api + '/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, oldPassword, newPassword }),
            });

            const responseData = await response.json();

            const data = responseData

            console.log(data)

            if (data.error) {
                setError(data.error)
                setErrorNum(1)
                setSuccess('')
                setSuccessNum(0)
            } else {
                setSuccess('Updated successfully')
                setSuccessNum(1)
                setErrorNum(0)
                setError('')
                setTimeout(() => {
                    location.reload()
                }, 1000);
            }

            // console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    };



    return (
        <div className={styles.settings}>
            <div className={styles.settingsbox} data-aos="zoom-in">
                <span onClick={close} className={styles.settingsclose}><IoMdClose /></span>
                <div className={styles.settingstop}>
                    <h2>Settings</h2>
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
                            <p>General</p>
                        </div>



                        <div style={{
                            borderLeft: progress === 3 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 3 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(3) }}
                            className={styles.sidebox}>
                            <p>Security</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 4 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 4 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(4) }}
                            className={styles.sidebox}>
                            <p>The Game</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 5 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 5 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { nav('/documentation') }}
                            className={styles.sidebox}>
                            <p>Help</p>
                        </div>

                    </div>

                    <div className={styles.right}>
                        {progress === 1 &&
                            <>
                                <SettingToggler
                                    title='Background Particles'
                                    description='Enable/Disable the Background Particles'
                                    onClick={() => { }}
                                    toggled={isParticles}
                                    setToggle={setIsParticles}
                                />
                            </>
                        }

                        {progress === 3 &&
                            <>
                                <div className={styles.gameinfo}>
                                    <div className={styles.all}>
                                        <h2>Change Password</h2>
                                        <p>Change your password</p>

                                        <div className={styles.profileinputs}>
                                            <InputIcon
                                                background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                                borderRadius='0.3em'
                                                color='white'
                                                title='Old Password'
                                                value={oldPassword}
                                                width='70%'
                                                isBoxShadow={true}
                                                titleColor='white'
                                                height='30px'
                                                iconFontSize='1.1rem'
                                                type='password'
                                                border='unset'
                                                onInput={(e) => { setOldPassword(e.currentTarget.value) }}
                                            >
                                                <FaUnlock />
                                            </InputIcon>

                                            <InputIcon
                                                background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                                borderRadius='0.3em'
                                                color='white'
                                                value={newPassword}
                                                title='New Password'
                                                width='70%'
                                                isBoxShadow={true}
                                                titleColor='white'
                                                height='30px'
                                                iconFontSize='1.1rem'
                                                type='password'
                                                border='unset'
                                                onInput={(e) => { setNewPassword(e.currentTarget.value) }}
                                            >
                                                <FaLock />
                                            </InputIcon>

                                            <TextIcon
                                                marginTop='0.3em'
                                                title='Update'
                                                background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                                width='115px'
                                                titleColor='white'
                                                borderRadius='0.3em'
                                                color='white'
                                                height='30px'
                                                onHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.7)' }}
                                                onUnHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.5)' }}
                                                fontSize='0.9rem'
                                                onClick={() => { updatePassword() }}
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

                                <SettingToggler
                                    title='2FA'
                                    description='Enable/Disable 2FA'
                                    onClick={() => { alert('Coming Soon') }}
                                    toggled={fa}
                                    setToggle={setFa}
                                />
                            </>
                        }

                        {progress === 4 &&
                            <>
                                <div className={styles.gameinfo}>
                                    <div className={styles.all}>
                                        <h2>Profile Information</h2>
                                        <p>Change your personal information</p>

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
                                                {gender === '' && <option>Choose your Gender</option>}
                                                <option value='Man'>Man</option>
                                                <option value='Woman'>Woman</option>
                                                <option value='Other'>Other</option>
                                            </select>

                                            <TextIcon
                                                marginTop='0.3em'
                                                title='Update'
                                                background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                                width='115px'
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
                                        <h2>Your Showcase Picture</h2>
                                        <p style={{
                                            marginBottom: photoPreview ? '' : '1em'
                                        }}>Change your Main Picture</p>
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
                                        <label htmlFor="file">Upload Photo</label>
                                        <TextIcon
                                            marginTop='1em'
                                            title='Update'
                                            background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                            width='115px'
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
