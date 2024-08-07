import { useEffect } from 'react'
import styles from './Welcome.module.css'
import { useWelcome } from '../../States/Welcome/Welcome'
import { AiOutlineLoading } from 'react-icons/ai'



export default function Welcome() {

    const { isWelcome } = useWelcome()


    useEffect(() => {
        if (isWelcome) {

        }
    }, [isWelcome])


    return (
        <>
            {isWelcome &&
                <div className={styles.welcome}>
                    <h1 data-aos="zoom-in">Welcome to StreetDate</h1>
                </div>
            }
        </>
    )
}
