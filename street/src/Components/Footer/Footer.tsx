import React from 'react'
import styles from './Footer.module.css'

import { Link } from 'react-router-dom'

import { IoStarSharp } from "react-icons/io5";

export default function Footer() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.review}>
                    <h2><span style={{ textDecoration: 'underline' }}>Online</span> StreetDate</h2>
                    <div className={styles.stars}>
                        <IoStarSharp />
                        <IoStarSharp />
                        <IoStarSharp />
                        <IoStarSharp />
                        <IoStarSharp />
                        <IoStarSharp />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerboxes}>

                        <div onClick={() => { location.href = '/' }} className={styles.name}>
                            <img src='https://i.postimg.cc/SKH1Dy1G/Screenshot-6-removebg-preview.png'></img>
                            <p>StreetDate</p>
                        </div>

                        <div className={styles.footerbox}>
                            <h2>General</h2>
                            <Link className='link' to='/'><p>Home</p></Link>
                            <Link className='link' to='/about'><p>About</p></Link>
                        </div>

                        <div className={styles.footerbox}>
                            <h2>The App</h2>
                            <Link className='link' to='/download'><p>Download</p></Link>
                            <p onClick={() => { window.open('', '_blank') }}>For Android</p>
                            <p onClick={() => { window.open('', '_blank') }}>For IOS</p>
                            <Link className='link' to='/try'><p>Try as Guest</p></Link>
                            <p onClick={() => { window.open('https://discord.gg/YDWqmevJxk', '_blank') }}>Discord Server</p>
                            <Link className='link' to='/play'><p>Play</p></Link>
                        </div>

                        <div className={styles.footerbox}>
                            <h2>Account</h2>
                            <Link className='link' to='/register'><p>Register</p></Link>
                            <Link className='link' to='/login'><p>Login</p></Link>
                        </div>

                        <div className={styles.footerbox}>
                            <h2>Read without fail</h2>
                            <Link className='link' to='/terms and conditions'><p>Terms and conditions</p></Link>
                            <Link className='link' to='/policies'><p>Policies</p></Link>
                            <Link className='link' to='/rules'><p>Rules</p></Link>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
