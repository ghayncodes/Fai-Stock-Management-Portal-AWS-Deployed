import * as React from 'react';

import BorderSection from '../components/BorderSection';

import {
    StatContainer,
    StatArea1,
    StatArea2
} from '../Styles/StatStyle/StatStyles';

import { 
    lpObj, 
    statMPItemObj ,
} from '../components/Dashboard/MainData';

export default class Statistics extends React.Component<any, any> {
    render() {
        return(
            <>
                <StatContainer>
                    <StatArea1>
                        <BorderSection {...statMPItemObj}/>
                    </StatArea1>
                    <StatArea2>
                        <BorderSection {...lpObj}/> 
                    </StatArea2>
                </StatContainer>
            </> 
        );
    }
}