import React from 'react';
import Sidebar from './sidebar';
import Content from './content';
import Footer from './footer';

const Layout = (props) => {
    return (
        <div className="wrapper">
            <Sidebar/>
            <div className="main">
                <Content content={props.content} simulator={props.simulator}/>
                <Footer/>
            </div>
        </div>
    )
};

export default Layout;