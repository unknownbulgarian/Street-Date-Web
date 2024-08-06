import { FaHome } from 'react-icons/fa'
import TextIcon from '../../Components/TextIcon/TextIcon'
import styles from './NotFound.module.css'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {

    const router = useNavigate()

    return (
        <div className={styles.main}>
            <h2>Oops!</h2>


            <div className={styles.downel}>
                <p className={styles.smalltitle}>404 - page not found</p>
                <p className={styles.desc}>You are <strong>alive</strong>. and the universe said I love you because <strong>you are love</strong>. And the game was over and the player <strong>woke up from the dream</strong>. And the player began <strong>a new dream</strong>.</p>
                <TextIcon
                    title='Home'
                    height='30px'
                    width='120px'
                    borderRadius='0.3em'
                    color='white'
                    background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                    marginTop='1.5em'
                    onClick={() => { router('/') }}
                >
                    <FaHome />
                </TextIcon>
            </div>
        </div>
    )
}
