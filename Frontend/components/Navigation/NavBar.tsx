import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/logo';

import '../../Styles/NavigationStyle/NavBarStyles.scss';

import { SidebarData } from './SidebarData';

const NavBar:React.FC<any> = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [stepHeight, setStepHeight] = React.useState(0);

    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const indicatorRef = React.useRef<HTMLDivElement>(null);
    const location = useLocation();

    React.useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    React.useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = SidebarData.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return( 
        <>
            <div className='sidebar'>
                <div className="sidebar__logo">
                    <Logo />
                </div>
                <div ref={sidebarRef} className="sidebar__menu">
                    <div
                        ref={indicatorRef}
                        className="sidebar__menu__indicator"
                        style={{
                            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                        }}
                    ></div>
                    {
                        SidebarData.map((item, index) => (
                            <Link to={item.to} key={index} style={{textDecoration: 'none'}}>
                                <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                    <div className="sidebar__menu__item__icon">
                                        {item.icon}
                                    </div>
                                    {item.display}
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default NavBar;