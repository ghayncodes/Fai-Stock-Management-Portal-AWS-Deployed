import styled from "styled-components";

export const OrderButton = styled.button<{ buttonColor: string; buttonHoverColor:string;}>`
    background: ${({buttonColor})=> (buttonColor)};
    height: 50px;
    cursor: pointer;
    font-size: 1.6rem;
    margin: 20px 10px;
    text-align: center;
    color: white;
    border-radius: 30px;
    white-space: nowrap;
    padding: 0px 30px;
    border: solid;
    border-color: ${({buttonColor})=> (buttonColor)};
    outline: none;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({buttonHoverColor})=> (buttonHoverColor)};;
        border-color: ${({buttonHoverColor})=> (buttonHoverColor)};;
    }
`;
