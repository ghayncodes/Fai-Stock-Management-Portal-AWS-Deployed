import * as React from 'react';
import BorderSection from '../components/BorderSection';

import { 
    activeOrderObj, 
    dashMPItemObj, 
    delayOrderObj, 
    stockLevelObj,
} from '../components/Dashboard/MainData';

import {
    DashboardContainer,
    DashboardArea1,
    DashboardArea2,
    DashboardArea3,
    DashboardArea4
} from '../Styles/DashboardStyle/DashboardStyles'

export default class Dashboard extends React.Component<any, any> {
    render() {
        return(
            <>
                <DashboardContainer>
                    <DashboardArea1>
                        <BorderSection {...dashMPItemObj}/>
                    </DashboardArea1>
                    <DashboardArea2>
                        <BorderSection {...stockLevelObj}/>
                    </DashboardArea2>
                    <DashboardArea3>
                        <BorderSection {...activeOrderObj}/>
                    </DashboardArea3>
                    <DashboardArea4>
                        <BorderSection {...delayOrderObj}/>
                    </DashboardArea4>
                </DashboardContainer> 
            </>
        );  
    }
}