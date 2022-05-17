import styled from "styled-components";

export const ItemContainer = styled.div`
    display: flex;
    flex-direction: row:
    flex: 1;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

export const ItemColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ItemName = styled.h1` 
    color: #5F6369;
    font-size: 1.8rem;
    font-family: 'ManifaPro2';
`;

export const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50%;
`;

export const QRCodeWrapper = styled.div`
    border-radius: 1rem;
    padding: 2%;
    -webkit-box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
    margin-top: 10px;
`;