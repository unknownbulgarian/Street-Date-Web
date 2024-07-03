import { MouseEventHandler, ReactNode } from 'react'
import styles from './TextIcon.module.css'

interface BoxIconProps {
    width: string;
    height: string;
    borderRadius: string;
    backgroundColor: string;
    title: string;
    children: ReactNode;
    border?: string;
    fontSize?: string;
    color?: string;
    titleFontWeight?: string;
    padding?: string;
    paddingLeft?: string;
    paddingRight?: string;
    textTransform?: any;
    transition?: string;
    iconFontSize?: string;
    titleColor?: string;
    nav?: boolean;
    boxShadow?: string;
    marginTop?: string;
    textShadow?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onHover?:  MouseEventHandler<HTMLDivElement>;
    onUnHover?:  MouseEventHandler<HTMLDivElement>;
}

export default function TextIcon({ width, height, borderRadius, backgroundColor,
    title, children, border, titleFontWeight, padding, 
    paddingLeft, paddingRight, textTransform, nav, transition, color, fontSize, iconFontSize,
    onClick, marginTop, onHover, onUnHover, titleColor, textShadow,boxShadow }: BoxIconProps) {
    return (
        <div onClick={onClick} onMouseOver={onHover} onMouseLeave={onUnHover} style={{ width, height, borderRadius, backgroundColor, 
            border, paddingLeft, paddingRight, transition, color, fontSize, padding, marginTop, boxShadow }} 
        className=
        {`${nav ? `${styles.box} ${styles.navhover}` : `${styles.box} ${styles.default}` }`}>
               <span style={{fontSize: iconFontSize}} className={styles.icon}>{children}</span>
            <p style={{
                fontWeight: titleFontWeight,
                textTransform,
                color: titleColor,
                fontSize,
                textShadow
            }}
            >{title}</p>
          
        </div>
    )
}