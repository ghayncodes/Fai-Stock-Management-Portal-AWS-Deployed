import styled from "styled-components";

export const Nav = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 320px;
    background-color: #00A3E0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

    @media screen and (max-width: 1080px;) {

    }
`;

export const BrandLogo = styled.div`
    display: grid;
    place-items: center;
    height: 120px;
`;

export const Bars = styled.div`
    display: block;
    color: #000;

    @media screen and (max-width: 850px) {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    position: relative;
`;

export const MenuIndicator = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: calc(100% - 40px);
    border-radius: 10px;
    background-color: #308efe;
    z-index: -1;
    transform: translateX(-50%);
    transition: 0.3s ease-in-out;
`;

export const NavItem = styled.div<{ activeIndex: Number; index: Number}>`
    display: flex;
    align-items: center;
    place-content: flex-start;
    padding: 1rem 3rem;
    font-size: 1.25rem;
    font-weight: 500;
    color: #555555;
    transition: color 0.3s ease-in-out;

    &.active {
        color: ${({activeIndex, index}) => activeIndex === index ? '#fff': ''};
    }
`;

export const NavIcon = styled.div`
    margin-right: 1rem;
    font-size: 1.75rem;
`;
