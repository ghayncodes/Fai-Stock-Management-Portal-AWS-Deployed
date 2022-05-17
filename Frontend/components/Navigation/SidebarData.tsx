import * as React from 'react';

import DashboardIcon from '../../assets/dasIcon';
import OrderIcon from '../../assets/orderIcon';
import StatisticsIcon from '../../assets/statisticsIcon';

export const SidebarData = [
    {
        display: 'Dashboard',
        icon: <DashboardIcon />,
        to: '/',
        section: '',
        cName: 'nav-text'
    },
    {
        display: 'Statistics',
        icon: <StatisticsIcon />,
        to: '/statistics',
        section: 'statistics',
        cName: 'nav-text'
    },
    {
        display: 'Orders',
        icon: <OrderIcon />,
        to: '/orders',
        section: 'orders',
        cName: 'nav-text'
    },
]
