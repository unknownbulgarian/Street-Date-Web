import styles from './Blank.module.css'
import { useBlank } from '../../States/BlankState/BlankState'
import { useEffect } from 'react'

export default function Blank() {

    const { isBlank } = useBlank()

    useEffect(() => {
        if (isBlank) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'visible'
        }
    }, [isBlank])

    return (
        <>
            {isBlank && <div className={styles.blank}></div>}
        </>
    )
}
