import React from 'react';
import Auth from '../utils/Auth'

export default function DashBoard(){

    const auth = React.useContext(Auth);
    const handleLogout = () => {
        auth.setAuth(false);
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}