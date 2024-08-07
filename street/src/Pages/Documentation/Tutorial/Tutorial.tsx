import { RefObject, useRef } from 'react';
import styles from './Tutorial.module.css'

import { FiUser } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";

import { useNavigate } from 'react-router-dom';

interface Props {
    progress: number;
    styles2: string;
    headerClass: string;
    smallClass: string;
}

export default function Tutorial({ progress, styles2, headerClass, smallClass }: Props) {


    const router = useNavigate()


    return (
        <>
            {progress === 1 &&
                <div className={styles2}>
                    <p className={headerClass}>
                        How can I play the game?
                    </p>
                    <p className={smallClass}>
                        You can play the game as a guest, i.e. no registration is required. Please note that guests only have a limited number of games per day.
                    </p>

                    <div style={{ marginTop: '1em' }}>
                        <h2 style={{ marginBottom: '0.5em' }}>For Guests</h2>
                        <li>Visit the <span onClick={() => { router('/try') }} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Try Page</span></li>
                        <li>Enter your Username (1 - 15 characters)</li>
                        <img src='https://i.postimg.cc/NFkHRGts/Screenshot-16.png'></img>
                        <li>Enter your Gender (If Male search = Female, If Female search - Male, if Other search Other)</li>
                        <li>Enter your Instagram(It should be real and yours)</li>
                        <li>Upload your own photo (It should be a image of you.. selfie .. )</li>
                        <img src='https://i.postimg.cc/dQ5QZTP7/Screenshot-13.png'></img>
                        <h2 style={{ marginBottom: '0.5em' }}>For Authenticated Users</h2>
                        <li>Visit the <span onClick={() => { router('/play') }} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Play Page</span></li>
                        <li>You will need to provide Gender, Instagram and a Showcase Photo in the Settings in order to Play</li>
                        <img src='https://i.postimg.cc/JnwxqhfZ/Screenshot-18.png'></img>
                        <li>Simply click on the Play Button</li>
                        <img src='https://i.postimg.cc/jSFZDcv8/Screenshot-17.png'></img>
                    </div>

                </div>
            }

            {progress === 2 &&
                <div className={styles2}>
                    <p className={headerClass}>
                       How to create an Account ?
                    </p>
                    <p className={smallClass}>
                    Please read our terms and conditions and policies before signing up to our app.
                    </p>

                    <div style={{ marginTop: '1em' }}>
                       <li>Visit the <span  onClick={() => { router('/register') }} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Register Page</span></li>
                       <li>Enter a Username (1 - 20 characters)</li>
                       <li>Enter a Email (It should be a valid email format ... having @ .. trusted domains gmail.com .. yahoo ...)</li>
                       <li>Enter a Password(It should be at least 8 characters long, at least one lowercase, at least one uppercase, at least one number, at least one special character)</li>
                       <li>Confirm your Password</li>
                       <li>By clicking the Button Register you simply Agree with our <span onClick={() => { router('/Terms') }}  style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms & Conditions</span></li>
                       <img src='https://i.postimg.cc/J4m1FcNd/Screenshot-19.png'></img>
                    </div>

                </div>
            }
        </>
    )
}
