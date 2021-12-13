import styled from "styled-components";

export const WelcomePanel  = styled.section`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    text-align: center;
    line-height: 50%;
    color: rgba(240,240,240,.9);
    background: rgba(25,25,25,1);
`;

export const WelcomeHeader = styled.header`
    width: calc(100% - 20px);
    padding: 10px;
    text-align: center;
    font-size: 2.1em;
    letter-spacing: 0.07em;
    color: rgba(240,240,240,.9);
    text-shadow: 3px 3px 4px #000;
    font-family: "Mohave", sans-serif;
    margin-bottom: 4vh;
    text-transform: uppercase;
    position: relative;
    top: 35vh;
        
    @media screen and (min-width: 320px){
        font-size: 2.9em;
    }
    
    @media screen and (min-width: 425px){
        font-size: 3.9em;
    }

    @media screen and (min-width: 768px){
        width: calc(80% - 20px);
        font-size: 4.9em;
    }
`;

export const PlayButton = styled.button`
    width: calc(60% - 40px);
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    text-align: center;
    font-size: 1.4em;
    letter-spacing: 0.05em;
    font-family: "Mohave", sans-serif;
    color: rgba(240,240,240,.9);
    background: rgba(10,10,10,1);
    box-shadow: 3px 3px 4px #000;
    text-transform: uppercase;
    position: relative;
    top: ${(props) => 
        props.top ? props.top : "40vh"};
    cursor: pointer;
    transition: filter 0.4s;

    &:hover{
        filter: brightness(70%);
    }

    @media screen and (min-width: 320px){
        font-size: 1.9em;
    }
    
    @media screen and (min-width: 425px){
        width: calc(40% - 40px);
    }

    @media screen and (min-width: 768px){
        width: calc(20% - 40px);
    }
`;

export const LosingPanelScore = styled.header`
    width: calc(90% - 20px);
    padding: 10px;
    text-align: center;
    font-size: 2.1em;
    letter-spacing: 0.05em;
    color: rgba(230,230,230,.9);
    font-family: "Mohave", sans-serif;
    text-shadow: 3px 3px 4px #000;
    margin-bottom: 4vh;
    margin-top: 2vh;
    position: relative;
    top: 42vh;
`;

export const SteeringPanel = styled.div`
    width: 100%;
    height: 30%;
    background: rgba(0,0,0,.9);
    text-align: center;
    position: relative;
    top: -30%;
    left: 0%;
    
    @media screen and (min-width: 768px){
        width: 30%;
        height: 100%;
        top: -100%;
        left: 35%;
    }

    @media screen and (min-width: 1024px){
        width: 20%;
        left: 40%;
    }
`;

export const SteeringPanelScore = styled.header`
    width: calc(100% - 20px);
    padding: 10px;
    text-align: center;
    font-size: 1.6em;
    letter-spacing: 0.05em;
    color: rgba(240,240, 240, .6);
    font-family: "Mohave", sans-serif;
    text-shadow: 3px 3px 4px #000;
    margin-bottom: 2vh;
    position: relative;
    top: 1vh;

    @media screen and (min-width: 768px){
        margin-bottom: 4vh;
    }
`;

export const SteeringButtons = styled.section`
    width: calc(50% - 20px);
    height: calc(100% - 10px);
    padding: 5px;
    position: relative;
    top: 2vh;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    margin: 0px 5px;

    @media screen and (min-width: 425px){
        width: calc(40% - 20px);
    }

    @media screen and (min-width: 685px){
        width: calc(30% - 20px);
    }

    @media screen and (min-width: 768px){    
        width: calc(95% - 10px);
        height: calc(40% - 10px);
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const SteeringButton = styled.div`
    width: calc(26% - 10px);
    height: calc(5vh - 10px);
    margin: 5px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    color: rgba(240,240,240,.95);
    line-height: calc(6vh - 10px);
    font-size: 0.95em;
    ${(props) => 
        props.isbutton ? `
            background: ${
                props.color ? props.color : "rgba(240,240,240,.7)"};
            border-radius: 50%;
            cursor: pointer;
            transition: filter 0.4s;

            &:hover{
                filter: brightness(70%);
            }
        ` : ``}

    @media screen and (min-width: 425px){
        width: calc(30% - 10px);
    }

    @media screen and (min-width: 768px){
        width: calc(33% - 10px);
        height: calc(10vh - 10px);
        line-height: calc(12vh - 10px);
        font-size: 1.9em;
    }
`;

export const RotatingButtonsPanel = styled.section`
    width: calc(50% - 20px);
    height: calc(100% - 10px);
    padding: 5px;
    position: relative;
    top: 2vh;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    margin: 0px 5px;
    
    @media screen and (min-width: 768px){
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: calc(100% - 10px);
        height: calc(40% - 10px);
    }
`;

export const RotateButton = styled.div`
    width: calc(70% - 20px);
    padding: 5px;
    margin: 5px;
    height: calc(7vh - 20px);
    display: inline-block;
    vertical-align: top;
    text-align: center;
    border-radius: 10px;
    font-size: 1em;
    transition: filter 0.4s;
    color: rgba(240,240,240,.9);
    background: rgba(240,240,240,.1);
    cursor: pointer;
    line-height: calc(7vh - 20px);

    &:hover{
        filter: brightness(70%);
    }

    @media screen and (min-width: 425px){
        width: calc(50% - 20px);
        height: calc(10vh - 20px);
        line-height: calc(10vh - 20px);
    }
`;