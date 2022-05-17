import styled from "styled-components";

export const DashboardContainer = styled.div`
    display: grid;
    height: 90vh;
    margin: 2%;
    margin-left: 350px;
    grid-template-areas: "a b" "c d";
    grid-gap: 50px;
`;

export const DashboardArea1 = styled.div`
    display: flex;
    grid-area: a;
    overflow: hidden;
    position: relative;
    width: 100%;
    align-items: center;
    border-radius: 2rem;
    -webkit-box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);

`;

export const DashboardArea2 = styled.div`
    display: flex;
    grid-area: b;
    overflow: hidden;
    position: relative;
    width: 100%;
    align-items: center;
    border-radius: 2rem;
    -webkit-box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
`;

export const DashboardArea3 = styled.div`
    display: flex;
    grid-area: c;
    overflow: hidden;
    position: relative;
    width: 100%;
    align-items: center;
    border-radius: 2rem;
    -webkit-box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
`;

export const DashboardArea4 = styled.div`
    display: flex;
    grid-area: d;
    overflow: hidden;
    position: relative;
    width: 100%;
    align-items: center;
    border-radius: 2rem;
    -webkit-box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
`;


