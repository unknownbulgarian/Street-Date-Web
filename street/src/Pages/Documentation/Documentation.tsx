import styles from './Documentation.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import { useEffect, useState } from 'react'

import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";

import { FiKey } from "react-icons/fi";
import StreetInfo from './StreetInfo/StreetInfo';
import Tutorial from './Tutorial/Tutorial';

export default function Documentation() {

    const [isClicked, setClicked] = useState<boolean>(false)
    const [mainTitle, setMainTitle] = useState<string>('Willkommen')
    const [streetTitle, setStreetTitle] = useState<string>('Über')
    const [tutorialTitle, setTutorialTitle] = useState<string>('Wie man spielt')

    const [progress, setProgress] = useState<number>(1)
    const [mainProgress, setMainProgress] = useState<number>(0)


    const [streetProgress, setStreetProgress] = useState<number>(1)
    const [tutorialProgress, setTutorialProgress] = useState<number>(1)


    const returnMainTitle = () => {
        switch (mainProgress) {
            case 0:
                return 'Einführung'
            case 1:
                return 'Über'
            case 2:
                return 'Herunterladen'
            case 3:
                return 'Tutorial'
            case 4:
                return 'Konto'
        }
    }

    const returnTop = (progress: number) => {
        switch (progress) {
            case 1:
                return '0px'
            case 2:
                return '40px'
            case 3:
                return '85px'
            case 4:
                return '120px'
        }
    }




    return (
        <>
            <Navbar />
            <div className={styles.main}>
                <div className={styles.side}>
                    <div className={styles.top}>
                        {mainProgress > 0 && <IoMdArrowBack onClick={() => { setMainProgress(0) }} className={styles.backarrow} />}
                        <h2>{returnMainTitle()}</h2>
                    </div>

                    <div className={styles.themain}>
                        <div className={styles.theside}>

                            <div className={`${styles.progress} ${mainProgress !== 0 ? styles.leftL : isClicked ? styles.reverse : ''}`}>
                                <div style={{
                                    top: returnTop(progress)
                                }} className={styles.bar}></div>
                            </div>


                            {mainProgress === 1 &&
                                <div className={`${styles.progress} ${styles.rightL} `}>
                                    <div style={{
                                        top: returnTop(streetProgress)
                                    }} className={styles.bar}></div>
                                </div>
                            }

                            {mainProgress === 2 &&
                                <div className={`${styles.progress} ${styles.rightL} `}>
                                    <div style={{
                                        top: returnTop(progress)
                                    }} className={styles.bar}></div>
                                </div>
                            }

                            {mainProgress === 3 &&
                                <div className={`${styles.progress} ${styles.rightL} `}>
                                    <div style={{
                                        top: returnTop(tutorialProgress)
                                    }} className={styles.bar}></div>
                                </div>
                            }

                            {mainProgress === 4 &&
                                <div className={`${styles.progress} ${styles.rightL} `}>
                                    <div style={{
                                        top: returnTop(progress)
                                    }} className={styles.bar}></div>
                                </div>
                            }
                        </div>



                        <div className={`${styles.boxes} ${mainProgress > 0 ? styles.leftL : isClicked ? styles.reverse : ''}`}>
                            <div onClick={() => { setProgress(1); setMainProgress(1); setClicked(true); }} className={styles.box}>
                                <p>Was ist StreetDate ?</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(2); setMainProgress(2); setClicked(true) }} className={styles.box}>
                                <p>Einrichtung</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(3); setMainProgress(3); setClicked(true) }} className={styles.box}>
                                <p>Tutorial</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(4); setMainProgress(4);; setClicked(true) }} className={styles.box}>
                                <p>Konto</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>
                        </div>

                        {mainProgress === 1 &&
                            <div className={`${styles.boxes} ${styles.rightL}`}>
                                <div onClick={(e) => { setStreetProgress(1); setStreetTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Über</p>
                                </div>

                                <div onClick={(e) => { setStreetProgress(2); setStreetTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Wer hat damit begonnen ?</p>
                                </div>

                                <div onClick={(e) => { setStreetProgress(3); setStreetTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Wie es begann ?</p>
                                </div>
                            </div>
                        }


                        {mainProgress === 2 &&
                            <div className={`${styles.boxes} ${styles.rightL}`}>
                                <div onClick={() => { setStreetProgress(1) }} className={styles.box}>
                                    <p>Android</p>
                                </div>

                                <div onClick={() => { setStreetProgress(1) }} className={styles.box}>
                                    <p>IOS</p>
                                </div>
                            </div>
                        }

                        {mainProgress === 3 &&
                            <div className={`${styles.boxes} ${styles.rightL}`}>
                                <div onClick={(e) => { setTutorialProgress(1); setTutorialTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Wie man spielt ?</p>
                                </div>

                                <div onClick={(e) => { setTutorialProgress(2); setTutorialTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Konto erstellen</p>
                                </div>

                                <div onClick={(e) => { setTutorialProgress(3); setTutorialTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Profileinstellungen ändern</p>
                                </div>

                                <div onClick={(e) => { setTutorialProgress(4); setTutorialTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Spiel hochladen</p>
                                </div>

                                <div onClick={(e) => { setTutorialProgress(5); setTutorialTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Spiel löschen</p>
                                </div>
                            </div>
                        }

                        {mainProgress === 4 &&
                            <div className={`${styles.boxes} ${styles.rightL}`}>

                                <div onClick={() => { setStreetProgress(1) }} className={styles.box}>
                                    <p>Sicherheit</p>
                                </div>

                                <div onClick={() => { setStreetProgress(1) }} className={styles.box}>
                                    <p>Passwort ändern</p>
                                </div>

                                <div onClick={() => { setStreetProgress(1) }} className={styles.box}>
                                    <p>E-Mail ändern</p>
                                </div>
                            </div>
                        }


                    </div>

                </div>
                <div className={styles.content}>
                    <div className={styles.maintitle}>
                        {mainProgress === 0 && <h1>{mainTitle}</h1>}
                        {mainProgress === 1 && <h1>{streetTitle}</h1>}
                        {mainProgress === 3 && <h1>{tutorialTitle}</h1>}
                        <FiKey className={styles.mainicon} />
                    </div>


                    {mainProgress === 0 &&
                        <div className={`${styles.thecontent} ${styles.op}`}>
                            <p className={styles.header}>Willkommen bei der offiziellen Dokumentation des Online Street Date.</p>
                            <p className={styles.small}>
                                Nur von <strong>einer Person gepflegt</strong>, finden Sie hier alle Informationen über die App.
                                Online Street Date gibt Ihnen die Möglichkeit, in <strong>Sekundenschnelle</strong> ein Date zu finden.
                                Ich kann Ihnen eines versprechen: Diese Plattform ist nicht <strong>gewinnorientiert</strong>.
                                Viel Spaß mit dem <strong>einfachsten</strong> Dating !
                            </p>

                            <p>
                                <strong>Möchten Sie mehr darüber erfahren? </strong>
                                <span style={{
                                    textDecoration: 'underline',
                                    color: 'rgba(114, 221, 247, 0.8)'
                                }}>Unserem Discord-Server beitreten</span>
                            </p>
                        </div>
                    }

                    {mainProgress === 1 && <StreetInfo
                        progress={streetProgress}
                        headerClass={styles.header}
                        smallClass={styles.small}
                        styles={`${styles.thecontent} ${styles.op}`}
                    />}

                    {mainProgress === 3 && <Tutorial
                        progress={tutorialProgress}
                        headerClass={styles.header}
                        smallClass={styles.small}
                        styles2={`${styles.thecontent} ${styles.op}`}
                    />}
                </div>
            </div >
        </>
    )
}
