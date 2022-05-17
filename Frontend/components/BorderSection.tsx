import * as React from 'react';
import TitleIcon from '../assets/TitleIcon';

import {
    BorderContainer,
    BorderColumn,
    BorderRow1,
    BorderRow2,
    IconTitle,
    Title
} from '../Styles/BorderStyle'

export default class BorderSection extends React.Component<any,any> {

    constructor(props: any){
        super(props);
    }
       
    render() {
       const { 
            title,
            component
        } = this.props; 

       return( 
            <BorderContainer>
                <BorderColumn>
                    <BorderRow1>
                        <IconTitle>
                            <TitleIcon/>
                        </IconTitle>
                        <Title>{title}</Title>
                    </BorderRow1>
                    <BorderRow2>{component}</BorderRow2>
                </BorderColumn>
            </BorderContainer> 
       );
    }
}



