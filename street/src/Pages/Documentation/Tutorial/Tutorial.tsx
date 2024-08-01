import { RefObject, useRef } from 'react';
import styles from './Tutorial.module.css'

import { FiUser } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";

interface Props {
    progress: number;
    styles2: string;
    headerClass: string;
    smallClass: string;
}

export default function Tutorial({ progress, styles2, headerClass, smallClass }: Props) {

    const box1 = useRef<HTMLDivElement>(null)
    const box2 = useRef<HTMLDivElement>(null)



    const expandBox = (ref: RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.style.width = '100%'
            ref.current.style.cursor = 'default'
            setTimeout(() => {
                if (ref.current) {
                    ref.current.style.justifyContent = 'unset'
                    ref.current.style.height = '800px'  
                }
            }, 1000);
        }
    }



    return (
        <>
            {progress === 1 &&
                <div className={styles2}>
                    <p className={headerClass}>
                        Wie kann ich das Spiel spielen ?
                    </p>
                    <p className={smallClass}>
                        Sie können das Spiel <strong>als Gast spielen</strong>, d.h. es ist <strong>keine Anmeldung</strong> erforderlich.
                        Bitte beachten Sie, dass die Gäste nur <strong>eine begrenzte Anzahl von Spielen pro Tag haben</strong>.
                    </p>

                    <div className={styles.boxes}>
                        <div className={styles.box} ref={box1} onClick={() => { expandBox(box1) }}>
                            <FiUser className={styles.boxicon} />
                            <h2>Gast-Tutorial</h2>
                            <p>Sehen Sie sich die ausführliche Anleitung für das Spielen als Gast an</p>
                        </div>
                        <div className={styles.box} ref={box2} onClick={() => {expandBox(box2)}}>
                            <FiUserCheck className={styles.boxicon} />
                            <h2>Registriertes Tutorial</h2>
                            <p>Siehe das Tutorial, wenn Sie bereits registriert sind</p>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}
