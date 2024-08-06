import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../../States/Session/Session';
import styles from '../ProtectedRoute.module.css'


import { AiOutlineLoading } from "react-icons/ai";

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const { isSession, checkSession, isChecked } = useSession();

    useEffect(() => {
        const verifySession = async () => {
            try {
                await checkSession();
                //setIsChecked(true);
            } catch (error) {
                console.error('Error checking session:', error);
             //   setIsChecked(true); 
            }
        };

        verifySession();
    }, [checkSession]);

    if (!isChecked) {
        return <div className={styles.loader}><span className={styles.loadericon}><AiOutlineLoading /></span></div>;
    }

    return isSession ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
