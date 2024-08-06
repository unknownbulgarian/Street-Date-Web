import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import API from '../../Utils/API';

import InputIcon from '../../Components/InputIcon/InputIcon';
import { MdSupervisorAccount } from "react-icons/md";

import Navbar from '../../Components/Navbar/Navbar';

import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import TextIcon from '../../Components/TextIcon/TextIcon';

export default function Login() {

    const router = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')



    const [error, setError] = useState<string>('')

    const login = async () => {
        try {
            const response = await fetch(API.api + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const responseData = await response.json();

            const data = responseData
            //console.log(data)

            if (data.error) {
                setError(data.error)
            } else {
                setError('')
                router('/play')
                localStorage.setItem('token', data.userId)
                localStorage.setItem('publicId', data.publicId)
            }

            //console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    }

    return (
        <>
            <div className={styles.login} data-aos="zoom-in">

                <h1>Anmelden</h1>
                <p className={styles.lol}>Melde dich in deinem Konto an</p>

                <div className={styles.box}>
                    <InputIcon
                        background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                        borderRadius='0.3em'
                        color='white'
                        title='Email'
                        width='450px'
                        titleColor='white'
                        height='30px'
                        type='Email'
                        onFocus={() => { }}
                        border='unset'
                        onInput={(e: any) => { setEmail(e.currentTarget.value) }}
                    >
                        <MdEmail />
                    </InputIcon>

                    <InputIcon
                        background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                        borderRadius='0.3em'
                        color='white'
                        title='Passwort'
                        width='450px'
                        titleColor='white'
                        height='30px'
                        type='password'
                        onFocus={() => { }}
                        border='unset'
                        onInput={(e: any) => { setPassword(e.currentTarget.value) }}
                    >
                        <MdOutlinePassword />
                    </InputIcon>
                    <div className={styles.already}>
                        <Link className='link' to={'/registrierung'}><p>Sie haben kein Konto ?</p></Link>
                    </div>


                    <TextIcon
                        borderRadius='0.3em'
                        title='Jetzt Anmelden'
                        width='210px'
                        color='white'
                        background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                        boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                        height='33px'
                        iconFontSize='1.3rem'
                        transition='all 800ms'
                        onClick={() => { login() }}
                    >
                        <MdSupervisorAccount />
                    </TextIcon>
                </div>

                <div className={styles.errors}>
                    {error !== '' && <li data-aos="fade-right">{error}</li>}
                </div>
            </div>
        </>
    )
}