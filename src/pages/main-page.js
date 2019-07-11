import React from 'react';
import Layout from '../layout/layout';
import MainContainer from '../components/main-container';
import SimulatorContainer from '../components/simulator/simulator-container';

const MainPage = (props) => {
    return (
        <div>
            <Layout content={<MainContainer />} simulator={<SimulatorContainer />}/>
        </div>
    )
}

export default MainPage;