import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';

import { useSession } from '../../States/Session/Session';


import { FaDiscord } from "react-icons/fa";

interface NavProps {
    tab?: number;
}

export default function Navbar({ tab }: NavProps) {

    const { isSession } = useSession()

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Link className='link' to='/'><img src='https://i.postimg.cc/SKH1Dy1G/Screenshot-6-removebg-preview.png'></img></Link>
            </div>

            <div className={styles.hrefs}>
                <Link className='link' to='/'><p className={`${tab === 1 ? styles.selected : ''}`}>Startseite</p></Link>
                <Link className='link' to='/herunterladen'><p className={`${tab === 2 ? styles.selected : ''}`}>Herunterladen</p></Link>
                <Link className='link' to='/erkunden/1'><p className={`${tab === 3 ? styles.selected : ''}`}>Erkunde Dates</p></Link>
                <Link className='link' to='/dokumentation'><p className={`${tab === 4 ? styles.selected : ''}`}>Dokumentation</p></Link>
                {isSession && <Link className='link' to='/profilbereich'><p className={`${tab === 5 ? styles.selected : ''}`}>Profilbereich</p></Link>}
                {!isSession &&
                    <>
                        <Link className='link' to='/registrierung'><p className={`${tab === 6 ? styles.selected : ''}`}>Registrieren</p></Link>
                        <Link className='link' to='/anmelden'> <p className={`${tab === 7 ? styles.selected : ''}`}>Anmeldung</p></Link>
                    </>
                }
            </div>

            <div className={styles.discord}>
                <span onClick={() => { window.open('https://discord.gg/YDWqmevJxk', '_blank') }}><FaDiscord /></span>
            </div>
        </div>
    )
}
