import React from 'react'
import styles from './Error.module.css'

interface Props {
    error: string;
    fontSize?: string;
    top?: string;
    bottom?: string;
}

export default function Error({ error, fontSize, top, bottom }: Props) {
    return (
        <div style={{
            fontSize,
            top,
            bottom
        }} className={styles.error}>
            <p>{error}</p>
        </div>
    )
}
