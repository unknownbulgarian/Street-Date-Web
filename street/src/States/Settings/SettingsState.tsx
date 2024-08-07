import React, { createContext, useState, useContext, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

import API from '../../Utils/API';


interface ContextType {
    isParticles: boolean;
    setIsParticles: Dispatch<SetStateAction<boolean>>


}

const SettingsContext = createContext<ContextType | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('');
    }
    return context;
};

interface SessionProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SessionProviderProps> = ({ children }) => {

    const [isParticles, setIsParticles] = useState<boolean>(true)

    const value = {
       isParticles,
       setIsParticles

    };

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};