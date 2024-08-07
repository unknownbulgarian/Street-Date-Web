import React, { createContext, useState, useContext, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

import API from '../../Utils/API';


interface ContextType {
    isWelcome: boolean;
    setIsWelcome: Dispatch<SetStateAction<boolean>>


}

const WelcomeContext = createContext<ContextType | undefined>(undefined);

export const useWelcome = () => {
    const context = useContext(WelcomeContext);
    if (!context) {
        throw new Error('');
    }
    return context;
};

interface SessionProviderProps {
    children: ReactNode;
}

export const WelcomeProvider: React.FC<SessionProviderProps> = ({ children }) => {

    const [isWelcome, setIsWelcome] = useState<boolean>(true)

    const value = {
        isWelcome,
        setIsWelcome

    };


    useEffect(() => {
        const hey = setTimeout(() => {
            setIsWelcome(false)
        }, 1800);

        return () => clearTimeout(hey)
    }, [])

    return <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>;
};