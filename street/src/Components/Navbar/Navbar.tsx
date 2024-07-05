import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';

import { useSession } from '../../States/Session/Session';


import { FaDiscord } from "react-icons/fa";

export default function Navbar() {

    const { isSession } = useSession()

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Link className='link' to='/'><img src='https://i.ibb.co/hFtwvZb/Street-Date-transparent.png'></img></Link>
            </div>

            <div className={styles.hrefs}>
                <Link className='link' to='/'><p>Startseite</p></Link>
                <Link className='link' to='/herunterladen'><p>Herunterladen</p></Link>
                <Link className='link' to='/erkunden/1'><p className={styles.dates}>Erkunde Dates</p></Link>
                <Link className='link' to='/dokumentation'><p>Dokumentation</p></Link>
                {isSession && <Link className='link' to='/profilbereich'><p>Profilbereich</p></Link>}
                {!isSession &&
                    <>
                        <Link className='link' to='/registrierung'><p>Registrieren</p></Link>
                        <Link className='link' to='/anmelden'> <p>Anmeldung</p></Link>
                    </>
                }
            </div>

            <div className={styles.discord}>
                <span onClick={() => { window.open('https://discord.gg/YDWqmevJxk', '_blank') }}><FaDiscord /></span>
            </div>
        </div>
    )
}
