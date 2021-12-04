import styled from "styled-components";

export const SteeringPanel = styled.div`
    width: 20%;
    height: 100%;
    background: rgba(0,0,0,.9);
    text-align: center;
    position: relative;
    top: -100%;
    left: 40%;
`;

export const SteeringButtons = styled.section`
    width: calc(95% - 10px);
    height: calc(60% - 10px);
    padding: 5px;
    position: relative;
    top: 2vh;
    text-align: center;
`;

export const SteeringButton = styled.div`
    width: calc(33% - 10px);
    height: calc(10vh - 10px);
    margin: 5px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    color: rgba(240,240,240,.95);
    line-height: calc(12vh - 10px);
    font-size: 1.9em;
    ${(props) => 
        props.isbutton ? `
            background: rgba(240,240,240,.1);
            border-radius: 50%;
            cursor: pointer;
            transition: filter 0.4s;

            &:hover{
                filter: brightness(70%);
            }
        ` : ``}
`;