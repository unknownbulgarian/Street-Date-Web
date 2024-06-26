import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';


interface AOSContextType {

}

const AOSContext = createContext<AOSContextType | undefined>(undefined);

export const useApiUrl = () => {
    const context = useContext(AOSContext);
    if (!context) {
        throw new Error('useApiUrl must be used within an ApiUrlProvider');
    }
    return context;
};

interface AOSProviderProps {
    children: ReactNode;
}

export const AOSProvider: React.FC<AOSProviderProps> = ({ children }) => {

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1000,
        });
    })


    const value = {};

    return <AOSContext.Provider value={value}>{children}</AOSContext.Provider>;
};