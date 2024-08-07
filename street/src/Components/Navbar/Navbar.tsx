import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useSession } from '../../States/Session/Session';


import { FaDiscord } from "react-icons/fa";
import { MdOutlineMenu } from 'react-icons/md';
import Blank from '../Blank/Blank';
import { useBlank } from '../../States/BlankState/BlankState';

interface NavProps {
    tab?: number;
}

export default function Navbar({ tab }: NavProps) {

    const nav = useNavigate()

    const { isSession } = useSession()

    const { isBlank, enableBlank, disableBlank } = useBlank()

    const [isNav, setNav] = useState<boolean>(false)


    return (
        <>


            <Blank />

            {isNav &&
                <div className={styles.mobilenav}>
                    <h2>StreetDate</h2>

                    <div className={styles.mobilehrefs}>
                        <p onClick={() => { nav('/'); setNav(false); disableBlank() }}>Home</p>
                        <p onClick={() => { nav('/explore/1'); setNav(false); disableBlank()  }}>Explore Dates</p>
                        <p onClick={() => { nav('/play'); setNav(false); disableBlank() }} className={styles.play2}>Play</p>
                        {isSession && <p onClick={() => { nav(`/stats/${localStorage.getItem('publicId')}`); setNav(false); disableBlank() }}>Stats</p>}
                        {isSession && <p onClick={() => { nav(`/stats/${localStorage.getItem('publicId')}/games/1`); setNav(false); disableBlank() }} >Storage</p>}
                        <p onClick={() => {nav('/documentation');setNav(false); disableBlank()}}>Documentation</p>
                        {!isSession && <p onClick={() => {nav('/login'); setNav(false); disableBlank()}}>Login</p>}
                        {!isSession && <p onClick={() => {nav('/register'); setNav(false); disableBlank()}}>Register</p>}
                        <FaDiscord className={styles.mobiledisc} />
                    </div>
                </div>
            }

            <div className={styles.navbar} >
                <div className={styles.logo}>
                    <Link className='link' to='/'><img src='https://i.postimg.cc/SKH1Dy1G/Screenshot-6-removebg-preview.png'></img></Link>
                </div>

                <div className={styles.hrefs}>
                    <Link className='link' to='/'><p className={`${tab === 1 ? styles.selected : ''}`}>Home</p></Link>
                    <Link className='link' to='/explore/1'><p className={`${tab === 3 ? styles.selected : ''}`}>Explore Dates</p></Link>
                    {isSession && <Link className='link' to='/play'><p className={styles.play}>Play</p></Link>}
                    {isSession && <Link className='link' to={`/stats/${localStorage.getItem('publicId')}`}><p className={`${tab === 2 ? styles.selected : ''}`}>Stats</p></Link>}
                    {isSession && <Link className='link' to={`/stats/${localStorage.getItem('publicId')}/games/1`}><p className={`${tab === 2 ? styles.selected : ''}`}>Storage</p></Link>}
                    <Link className='link' to='/documentation'><p className={`${tab === 4 ? styles.selected : ''}`}>Documentation</p></Link>

                    {!isSession &&
                        <>
                            <Link className='link' to='/register'><p className={`${tab === 6 ? styles.selected : ''}`}>Register</p></Link>
                            <Link className='link' to='/login'> <p className={`${tab === 7 ? styles.selected : ''}`}>Login</p></Link>
                        </>
                    }
                </div>

                <div className={styles.discord}>
                    <span onClick={() => { window.open('https://discord.gg/YDWqmevJxk', '_blank') }}><FaDiscord /></span>
                </div>

                <MdOutlineMenu onClick={() => { enableBlank(); setNav(true) }} className={styles.burger} />
            </div>
        </>
    )
}
