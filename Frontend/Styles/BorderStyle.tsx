import styled from "styled-components";

export const BorderContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    overflow-x: hidden;
`;

export const BorderColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 6%;
`;

export const BorderRow1 = styled.div`
    display: flex;
`

export const BorderRow2 = styled.div`
    display: flex;
    margin-top: 5%;    
    overflow-y: auto;
`

export const Title = styled.h1`
    align-self: center;
    font-size: 1.8rem;
    color: #5F6369;
`
export const IconTitle = styled.div`
    position: relative;
    margin-right: 5%;
`