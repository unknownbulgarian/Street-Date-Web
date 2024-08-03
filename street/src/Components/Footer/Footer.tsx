import React from 'react'
import styles from './Footer.module.css'

import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footerboxes}>

                <div onClick={() => { location.href = '/' }} className={styles.name}>
                    <img src='https://i.postimg.cc/SKH1Dy1G/Screenshot-6-removebg-preview.png'></img>
                    <p>StreetDate</p>
                </div>

                <div className={styles.footerbox}>
                    <h2>Allgemein</h2>
                    <Link className='link' to='/'><p>Startseite</p></Link>
                    <Link className='link' to='/über'><p>Über</p></Link>
                </div>

                <div className={styles.footerbox}>
                    <h2>Die App</h2>
                    <Link className='link' to='/herunterladen'><p>Herunterladen</p></Link>
                    <p onClick={() => { window.open('', '_blank') }}>Für Android</p>
                    <p onClick={() => { window.open('', '_blank') }}>Für IOS</p>
                    <Link className='link' to='/versuchen'><p>Als Gast versuchen</p></Link>
                    <p onClick={() => { window.open('https://discord.gg/YDWqmevJxk', '_blank') }}>Discord Server</p>
                </div>

                <div className={styles.footerbox}>
                    <h2>Konto</h2>
                    <Link className='link' to='/registrierung'><p>Registrierung</p></Link>
                    <Link className='link' to='/anmelden'><p>Anmelden</p></Link>
                    <Link className='link' to='/profilbereich'><p>Profilbereich</p></Link>
                </div>

                <div className={styles.footerbox}>
                    <h2>Unbedingt lesen</h2>
                    <Link className='link' to='/bedingungen und konditionen'><p>Bedingungen und Konditionen</p></Link>
                    <Link className='link' to='/politiken'><p>Politiken</p></Link>
                    <Link className='link' to='/regeln'><p>Regeln</p></Link>
                </div>
            </div>


        </div>
    )
}
