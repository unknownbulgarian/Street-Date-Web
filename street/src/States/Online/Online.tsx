import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import API from '../../Utils/API';

import { useSession } from '../Session/Session';

interface ContextType {
    removeOnline: () => void;
    isOnline: boolean;
}

const OnlineContext = createContext<ContextType | undefined>(undefined);

export const useOnlineProvider = () => {
    const context = useContext(OnlineContext);
    if (!context) {
        throw new Error('useApiUrl must be used within an ApiUrlProvider');
    }
    return context;
};

interface OnlineProviderProps {
    children: ReactNode;
}

export const OnlineProvider: React.FC<OnlineProviderProps> = ({ children }) => {

    const { isSession } = useSession()

    const [isOnline, setOnline] = useState<boolean>(false)

    useEffect(() => {
        const intervalId = setInterval(() => {
            const onlineId = localStorage.getItem('online_id');
            if (onlineId) {
                fetch(API.api + '/heartbeat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ online_id: onlineId }),
                })
                    .then(response => {
                        if (response.ok) {
                            setOnline(true);
                        } else {
                            setOnline(false);
                            if (isSession) {
                            //    window.location.href = '/profilbereich'
                            } else {
                                //window.location.href = '/'
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error sending heartbeat:', error);
                        setOnline(false);
                    });
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const removeOnline = async () => {
        try {
            const response = await fetch(API.api + '/removeUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ online_id: localStorage.getItem('online_id') })
            });

            const responseData = await response.json();

            const data = responseData

            if (data.error) {
                localStorage.removeItem('online_id')
            } else {
                localStorage.removeItem('online_id')
            }

            // console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    };


    const value = {
        removeOnline,
        isOnline,
    };

    return <OnlineContext.Provider value={value}>{children}</OnlineContext.Provider>;
};