import * as React from 'react';

import BorderSection from '../components/BorderSection';
import { incomingOrdersObj } from '../components/Dashboard/MainData';
import { OrdersContainer, OrderArea1 } from '../Styles/OrdersStyle/OrdersStyles';

export default class Orders extends React.Component<any, any> {
    render() {
        return(
            <>
                <OrdersContainer>
                    <OrderArea1>
                        <BorderSection {...incomingOrdersObj}/>
                    </OrderArea1>
                </OrdersContainer>
            </>
        );
    }
}