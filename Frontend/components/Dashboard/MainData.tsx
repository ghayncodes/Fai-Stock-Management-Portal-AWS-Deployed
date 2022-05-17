import * as React from 'react';

import ItemStatSection from '../Stats/ItemStatSection';
import StockTableSection from './StockTable';
import OrderTableSection from '../Orders/OrdersTable';
import IncomingOrderSection from '../Orders/IncomingOrdersSection';
import StatSection from '../Stats/StatsSections';


// For Statistics most purchased item border container
export const mostPurchasedObj = {
    url: "http://localhost:3000/getMostPurchased"
}

// For Dashboard most purchased item border container
export const dashMPItemObj = {
    title: 'The most purchased item is:',
    component: <ItemStatSection {...mostPurchasedObj}/>
}

// For Statistics most purchased reorder item button
export const reorderButtonObj = {
    itsText:'Reorder Item',
    itsColor: '#00A3E0',
    hoverColor: '#00ADEE',
    url: "http://localhost:3000/getMostPurchased",
    urlCreate: "http://localhost:3000/reorderItem",
}

// For Dashboard most purchased item border container
export const statMPItemObj = {
    title: 'The most purchased item is:',
    component: <StatSection {...reorderButtonObj}/>
}

// For Dashboard stock levels list border container
export const stockLevelObj = {
    title: 'Stock Levels:',
    component: <StockTableSection />
}

// For Active order list table
export const activeTableObj = {
    url: "http://localhost:3000/getActiveOrders"
}

// For Dashboard active orders list border container
export const activeOrderObj = {
    title: 'Currently Active Orders:',
    component: <OrderTableSection {...activeTableObj}/>
}

// For Delayed order list table
export const delayTableObj = {
    url: "http://localhost:3000/getDelayedOrders"
}

// For Dashboard delayed orders list border container
export const delayOrderObj = {
    title: 'Currently Delayed Orders:',
    component: <OrderTableSection {...delayTableObj}/>
}

// For Statistics least purchased item border container
export const leastPurchasedObj = {
    url: "http://localhost:3000/getLeastPurchased"
}

export const lpObj = {
    title: 'The least purchased item is:',
    component: <ItemStatSection {...leastPurchasedObj}/>
}

// For Orders Buttons
export const orderButtonObj = {
    recText:'Orders Received',
    recColor: '#84BD00',
    hoverRecColor: '#8BC700',
    recLeft: '1400px',
    recTop: '950px',
    notText:'Orders Not Received',
    notColor: '#00A3E0',
    hoverNotColor: '#00ADEE',
    notLeft: '1050px',
    notTop: '950px',
    url: "http://localhost:3000/getCompletedOrders",
    urlUpdate: "http://localhost:3000/updateOrderStatus"
}

// For Orders completed orders list border container
export const incomingOrdersObj = {
    title: 'Incoming Orders',
    component: <IncomingOrderSection {...orderButtonObj}/> 
}