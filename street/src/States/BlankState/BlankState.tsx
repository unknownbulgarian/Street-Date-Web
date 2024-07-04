import React, { createContext, useContext, ReactNode, useState, } from 'react';


interface ContextType {
    isBlank: boolean;
    toggleBlank: () => void;
    enableBlank: () => void;
    disableBlank: () => void;
    setBlankValue: (b: boolean) => void;
}

const BlankContext = createContext<ContextType | undefined>(undefined);

export const useBlank = () => {
    const context = useContext(BlankContext);
    if (!context) {
        throw new Error('');
    }
    return context;
};

interface BlankProps {
    children: ReactNode;
}

export const BlankProvider: React.FC<BlankProps> = ({ children }) => {

    const [isBlank, setBlank] = useState<boolean>(false)

    const toggleBlank = () => {
        setBlank(p => !p)
    }

    const enableBlank = () => {
        setBlank(true)
    }

    const disableBlank = () => {
        setBlank(false)
    }

    const setBlankValue = (b: boolean) => {
        setBlank(b)
    }


    const value = {
        isBlank,
        toggleBlank,
        enableBlank,
        disableBlank,
        setBlankValue
    };

    return <BlankContext.Provider value={value}>{children}</BlankContext.Provider>;
};