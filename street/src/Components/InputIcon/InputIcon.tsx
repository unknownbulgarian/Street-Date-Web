import { ReactNode, forwardRef, Ref, FormEventHandler } from 'react';
import styles from './InputIcon.module.css';

interface InputIconProps {
    backColor: string;
    width: string;
    height: string;
    borderRadius: string;
    children: ReactNode;
    color: string;
    fontSize?: string;
    iconBackColor?: string;
    iconBorderRadius?: string;
    title: string;
    titleColor: string;
    titleFontSize?: string;
    type: string;
    classN?: string;
    border?: string;
    iconFontSize?: string;
    disabled?: boolean;
    isBoxShadow?: boolean;
    onInput?: FormEventHandler<HTMLInputElement>
    onKeyDown?: FormEventHandler<HTMLInputElement>
    onBlur?: FormEventHandler<HTMLInputElement>;
    onFocus?: FormEventHandler<HTMLInputElement>;
    onChange?: FormEventHandler<HTMLInputElement>;

    value?: string
    marginBottom?: string;
}

const InputIcon = forwardRef<HTMLInputElement, InputIconProps>(({
    backColor, width, height, borderRadius, children, color,
    fontSize, iconBackColor, iconBorderRadius,
    title, titleColor,  type, classN, onInput,
    value, marginBottom, onKeyDown, onBlur, onFocus, onChange,
     border, iconFontSize, disabled, isBoxShadow
}: InputIconProps, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={styles.inputicon}
            style={{
                backgroundColor: backColor,
                width: width,
                height: height,
                borderRadius: borderRadius,
                marginBottom: marginBottom,
                border,
                boxShadow: !isBoxShadow ? '5px 5px 10px rgba(0, 0, 0, 0.5)' : ''
            }}>
            <span className={styles.icon}
                style={{
                    color: color,
                    backgroundColor: iconBackColor,
                    borderRadius: iconBorderRadius,
                    fontSize: iconFontSize,
                }}>
                {children}
            </span>
            <input disabled={disabled ? true : false} spellCheck='false' autoComplete='off' className={`${styles.theinput} ${classN}`}
                name='InputIcon'
                ref={ref}
                type={type}
                onInput={onInput}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                placeholder={title}
                value={value}
                style={{
                    color: titleColor,
                    fontSize: fontSize,
                }} />
        </div>
    );
});

export default InputIcon;