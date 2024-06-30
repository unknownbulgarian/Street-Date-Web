import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import styles from './SettingToggler.module.css'

import { TiTick } from "react-icons/ti";

interface TogglerProps {
    title: string;
    description: string;
    toggled: boolean;
    selected?: boolean;
    onClick: MouseEventHandler<HTMLDivElement>
    setToggle: Dispatch<SetStateAction<boolean>>;
}

export default function SettingToggler({ title, description, toggled, setToggle, selected, onClick }: TogglerProps) {
    return (
        <div onClick={onClick} style={{
            background: selected ? 'rgba(176, 176, 176, 0.078)' : '',
            border: selected ? '1px solid rgba(255, 255, 255, 0.288)' : ''
            }} className={styles.toggler}>
            <div className={styles.all}>
                <h2>{title}</h2>
                <div className={styles.checker}>
                    <div onClick={() => { setToggle(p => !p) }} className={styles.checkbox}>
                        <TiTick style={{ color: toggled ? 'green' : 'rgba(255, 255, 255, 0)' }} className={styles.tick} />
                    </div>
                    <div className={styles.description}>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
