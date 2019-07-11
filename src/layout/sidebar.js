import React from 'react';
import logo from '../assets/media/sw-logo.png';

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="navbar-brand align-content-center">
                <img src={logo} className="logo" alt="logo Sherwin"/>
            </div>
        </div>
    );
}

export default Sidebar;