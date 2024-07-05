import React, { createContext, useState, useContext, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

import API from '../../Utils/API';


interface ContextType {
    isSession: boolean;
    name: string;
    email: string;
    isChecked: boolean;
    setIsChecked: Dispatch<SetStateAction<boolean>>;
    checkSession: () => void;


}

const SessionContext = createContext<ContextType | undefined>(undefined);

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('');
    }
    return context;
};

interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {

    const [isSession, setIsSession] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')



    const checkSession = async () => {
        try {
            const response = await fetch(API.api + '/checkSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            //console.log(data)

            if (data.error) {
                setIsSession(false);
                setName('');
                setEmail('');
                setTimeout(() => {
                    setIsChecked(true)
                }, 1);
            } else {
                setIsSession(true)
                setName(data.name)
                setEmail(data.email)

                if (data.gender) {
                }

                setTimeout(() => {
                    setIsChecked(true)
                }, 1);
            }

            //console.log(data)

        } catch (error: any) {
            setTimeout(() => {
                setIsChecked(true)
            }, 1);
        }
    }

    useEffect(() => {
        checkSession()
    }, [])


    const value = {
        isSession,
        name,
        email,
        isChecked,
        setIsChecked,
        checkSession,

    };

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};