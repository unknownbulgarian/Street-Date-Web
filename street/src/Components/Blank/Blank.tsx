import styles from './Blank.module.css'
import { useBlank } from '../../States/BlankState/BlankState'

export default function Blank() {

    const { isBlank } = useBlank()

    return (
        <>
            {isBlank && <div className={styles.blank}></div>}
        </>
    )
}
