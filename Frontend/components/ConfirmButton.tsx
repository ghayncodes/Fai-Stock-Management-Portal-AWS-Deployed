import * as React from 'react';

import { 
    OrderButton
 } from '../Styles/ButtonsStyle';

export default class ConfirmButton extends React.Component<any,any> {

    constructor(props: any){
        super(props);
    }
    
    render() {
       const { 
            itsText,
            itsColor,
            hoverColor,
        } = this.props;

       return( 
            <OrderButton buttonColor = {itsColor} buttonHoverColor= {hoverColor}>
                <p>{itsText}</p>
            </OrderButton> 
       );
    }
}



