import styled from "styled-components";

export const StatContainer = styled.div`
    display: grid;
    height: 60vh;
    margin: 2%;
    margin-left: 350px;
    grid-template-areas: "a b";
    grid-gap: 50px;
`;

export const StatArea1 = styled.div`
    display: flex;
    grid-area: a;
    overflow: hidden;
    position: relative;
    width: 100%;
    align-items: center;
    border-radius: 2rem;
    -webkit-box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
`;

export const StatArea2 = styled.div`
    display: flex;
    grid-area: b;
    overflow: hidden;
    position: relative;
    width: 100%;
    align-items: center;
    border-radius: 2rem;
    -webkit-box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
`;

export const StatWrapper = styled.div`
    display: flex:
    align-items: center;
    justify-content: center;
`;



