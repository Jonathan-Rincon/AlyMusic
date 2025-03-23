import styled from "styled-components";

const AlyHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props=> props.theme.colors.background.titleHeader};
    border-radius: 12px;
    padding: 15px 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: ${props=>props.theme.fonts.base};
    color:${props=> props.theme.colors.font.titleHeader};
`;
const AlyTitle = styled.h1`
    font-size: 28px;
    font-weight: bold;
    text-transform: uppercase;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 1.5px;
    margin: 0;
`;

export {
    AlyHeader,
    AlyTitle
}