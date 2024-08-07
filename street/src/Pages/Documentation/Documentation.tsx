import styles from './Documentation.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import { useEffect, useState } from 'react'

import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";

import { FiKey } from "react-icons/fi";
import StreetInfo from './StreetInfo/StreetInfo';
import Tutorial from './Tutorial/Tutorial';
import ExploreFeatures from './Explore/Explore';
import AccountFeatures from './Account/Accounts';

export default function Documentation() {

    const [isClicked, setClicked] = useState<boolean>(false)
    const [mainTitle, setMainTitle] = useState<string>('Welcome')
    const [streetTitle, setStreetTitle] = useState<string>('About')
    const [tutorialTitle, setTutorialTitle] = useState<string>('How can I play')
    const [featuresTitle, setFeaturesTitle] = useState<string>('Explore StreetDate Features')
    const [accountTitle, setAccountTitle] = useState<string>('Learn more about your Account')

    const [progress, setProgress] = useState<number>(1)
    const [mainProgress, setMainProgress] = useState<number>(0)


    const [streetProgress, setStreetProgress] = useState<number>(1)
    const [tutorialProgress, setTutorialProgress] = useState<number>(1)
    const [featuresProgress, setFeaturesProgress] = useState<number>(1)
    const [accountProgress, setAccountProgress] = useState<number>(1)


    const returnMainTitle = () => {
        switch (mainProgress) {
            case 0:
                return 'Introduction'
            case 1:
                return 'About'
            case 2:
                return 'Features'
            case 3:
                return 'Tutorial'
            case 4:
                return 'Account'
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
                                        top: returnTop(featuresProgress)
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
                                        top: returnTop(accountProgress)
                                    }} className={styles.bar}></div>
                                </div>
                            }
                        </div>



                        <div className={`${styles.boxes} ${mainProgress > 0 ? styles.leftL : isClicked ? styles.reverse : ''}`}>
                            <div onClick={() => { setProgress(1); setMainProgress(1); setClicked(true); }} className={styles.box}>
                                <p>What is StreetDate ?</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(2); setMainProgress(2); setClicked(true) }} className={styles.box}>
                                <p>Features</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(3); setMainProgress(3); setClicked(true) }} className={styles.box}>
                                <p>Tutorial</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(4); setMainProgress(4);; setClicked(true) }} className={styles.box}>
                                <p>Account</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>
                        </div>

                        {mainProgress === 1 &&
                            <div className={`${styles.boxes} ${styles.rightL}`}>
                                <div onClick={(e) => { setStreetProgress(1); setStreetTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>About</p>
                                </div>

                                <div onClick={(e) => { setStreetProgress(2); setStreetTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Who started it ?</p>
                                </div>

                                <div onClick={(e) => { setStreetProgress(3); setStreetTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>How it all began ?</p>
                                </div>
                            </div>
                        }


                        {mainProgress === 2 &&
                            <div className={`${styles.boxes} ${styles.rightL}`}>
                                <div onClick={() => { setFeaturesProgress(1) }} className={styles.box}>
                                    <p>General</p>
                                </div>
                                <div onClick={() => { setFeaturesProgress(2) }} className={styles.box}>
                                    <p>In the Future</p>
                                </div>
                            </div>
                        }

                        {mainProgress === 3 &&
                            <div className={`${styles.boxes} ${styles.rightL}`}>
                                <div onClick={(e) => { setTutorialProgress(1); setTutorialTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>How to play ?</p>
                                </div>

                                <div onClick={(e) => { setTutorialProgress(2); setTutorialTitle(e.currentTarget.innerText) }} className={styles.box}>
                                    <p>Creating Account</p>
                                </div>

                            </div>
                        }

                        {mainProgress === 4 &&
                            <div className={`${styles.boxes} ${styles.rightL}`}>

                                <div onClick={() => { setAccountProgress(1) }} className={styles.box}>
                                    <p>Security</p>
                                </div>

                                <div onClick={() => { setAccountProgress(2) }} className={styles.box}>
                                    <p>Change Password</p>
                                </div>

                                <div onClick={() => { setAccountProgress(3) }} className={styles.box}>
                                    <p>Change Email</p>
                                </div>
                            </div>
                        }


                    </div>

                </div>
                <div className={styles.content}>
                    <div className={styles.maintitle}>
                        {mainProgress === 0 && <h1>{mainTitle}</h1>}
                        {mainProgress === 1 && <h1>{streetTitle}</h1>}
                        {mainProgress === 2 && <h1>{featuresTitle}</h1>}
                        {mainProgress === 3 && <h1>{tutorialTitle}</h1>}
                        {mainProgress === 4 && <h1>{accountTitle}</h1>}
                        <FiKey className={styles.mainicon} />
                    </div>


                    {mainProgress === 0 &&
                        <div className={`${styles.thecontent} ${styles.op}`}>
                            <p className={styles.header}>Welcome to the official documentation of the Online Street Date.</p>
                            <p className={styles.small}>
                                Only maintained by one person, you will find all the information about the app here.
                                Online Street Date gives you the opportunity to find a date in seconds.
                                I can promise you one thing: this platform is not profit-oriented.
                                Have fun with the simplest dating!
                            </p>

                            <p>
                                <strong>Would you like to learn more about it? </strong>
                                <span style={{
                                    textDecoration: 'underline',
                                    color: 'rgba(114, 221, 247, 0.8)'
                                }}>Join in our Discord Server</span>
                            </p>

                            <img src='https://i.postimg.cc/SNdjmtVM/Screenshot-20.png'></img>
                        </div>
                    }

                    {mainProgress === 1 && <StreetInfo
                        progress={streetProgress}
                        headerClass={styles.header}
                        smallClass={styles.small}
                        styles={`${styles.thecontent} ${styles.op}`}
                    />}

                    {mainProgress === 2 && <ExploreFeatures
                        progress={featuresProgress}
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

                    {mainProgress === 4 && <AccountFeatures
                        progress={accountProgress}
                        headerClass={styles.header}
                        smallClass={styles.small}
                        styles={`${styles.thecontent} ${styles.op}`}
                    />}
                </div>
            </div >
        </>
    )
}
