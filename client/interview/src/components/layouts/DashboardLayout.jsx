import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';

const DashboardLayout = ({children}) =>  {
    const { user } = useContext(UserContext);
    return (
        <>
        <div>
            <Navbar/>

            <main>{children}</main>
        </div>
        </>
    );
};

export default DashboardLayout;
