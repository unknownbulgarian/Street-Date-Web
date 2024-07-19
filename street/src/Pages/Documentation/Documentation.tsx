import styles from './Documentation.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import { useState } from 'react'

import { IoIosArrowForward } from "react-icons/io";

export default function Documentation() {

    const [progress, setProgress] = useState<number>(1)



    const returnMainTop = () => {
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
                        <h2>Einführung</h2>
                    </div>

                    <div className={styles.themain}>
                        <div className={styles.theside}>
                            <div className={styles.progress}>
                                <div style={{
                                    top: returnMainTop()
                                }} className={styles.bar}></div>
                            </div>
                        </div>

                        <div className={styles.boxes}>
                            <div onClick={() => { setProgress(1) }} className={styles.box}>
                                <p>Was ist StreetDate ?</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(2) }} className={styles.box}>
                                <p>Einrichtung</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(3) }} className={styles.box}>
                                <p>Tutorial</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>

                            <div onClick={() => { setProgress(4) }} className={styles.box}>
                                <p>Konto</p>
                                <IoIosArrowForward className={styles.arrow} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.content}></div>
            </div>
        </>
    )
}
