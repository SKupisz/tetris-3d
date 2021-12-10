import React, {Suspense, useState} from "react";
import styled from "styled-components";
import {Canvas} from "@react-three/fiber";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { WelcomePanel, WelcomeHeader, PlayButton,
    SteeringPanel, SteeringPanelScore, SteeringButtons, SteeringButton,
    RotatingButtonsPanel, RotateButton, LosingPanelScore } from "../styled/styled.jsx";

import Game from "./game.jsx";

const CanvasContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Main = () => {

    const [movingDirection, setMovingDirection] = useState(0); // 1 - north, 2 - west, 3 - south, 4 - east
    const [rotatingDirection, setRotatingDirection] = useState(0); // 1 - right, -1 - left
    const [isPlayed, toggleIsPlayed] = useState(false);
    const [isGameStarted, toggleIsGameStarted] = useState(false);
    const [scoreCounter, setScoreCounter] = useState(0);

    const BeginningProcedure = () => {
        setScoreCounter(0);
        toggleIsGameStarted(true);
        toggleIsPlayed(true);
    }

    return <CanvasContainer>
        <Canvas>
            <Suspense fallback={null}>
                <Game isPlayed={isPlayed} playedCallback={() => toggleIsPlayed(!isPlayed)} 
                counter={scoreCounter} setCounter={(newScore) => setScoreCounter(newScore)}
                movingDirection = {movingDirection}
                directionCallback={() => setMovingDirection(0)}
                rotatingDirection={rotatingDirection}
                rotationCallback={() => setRotatingDirection(0)}/>
            </Suspense>
        </Canvas>
        {
                isGameStarted ? <SteeringPanel className="block-center">
                    <SteeringPanelScore className="block-center">
                        Current Score: {scoreCounter}
                    </SteeringPanelScore>
                <SteeringButtons className="block-center">
                    <SteeringButton/>
                    <SteeringButton isbutton onClick = {() => setMovingDirection(1)} color="rgba(222, 247, 0,.2)">
                        <ArrowUpwardIcon style={{fontSize: "1.3em"}}/>
                    </SteeringButton>
                    <SteeringButton/>

                    <SteeringButton isbutton onClick = {() => setMovingDirection(4)} color="rgba(20,200,20,.2)">
                        <ArrowBackIcon style={{fontSize: "1.3em"}}/>
                    </SteeringButton>
                    <SteeringButton/>
                    <SteeringButton isbutton onClick = {() => setMovingDirection(2)}>
                        <ArrowForwardIcon style={{fontSize: "1.3em"}}/>
                    </SteeringButton>

                    <SteeringButton/>
                    <SteeringButton isbutton onClick = {() => setMovingDirection(3)} color="rgba(200,20,20,.2)">
                        <ArrowDownwardIcon style={{fontSize: "1.3em"}}/>
                    </SteeringButton>
                    <SteeringButton/>
                </SteeringButtons>
                <RotatingButtonsPanel className="block-center">
                    <RotateButton onClick = {() => setRotatingDirection(-1)}>Left</RotateButton>
                    <RotateButton onClick={() => setRotatingDirection(1)}>Right</RotateButton>
                </RotatingButtonsPanel>
            </SteeringPanel> : <WelcomePanel className="block-center">
                <WelcomeHeader className="block-center">
                    Tetris 3d
                </WelcomeHeader>
                <PlayButton className="block-center" onClick = {() => BeginningProcedure()}>Play</PlayButton>
            </WelcomePanel>
        }
        {
            (isGameStarted === true && isPlayed === false) ? null: null
        }
        
    </CanvasContainer>
};
/* <WelcomePanel className="block-center">
            <WelcomeHeader className="block-center">
                You've lost
            </WelcomeHeader>
            <LosingPanelScore className="block-center">
                Your score: {scoreCounter}
            </LosingPanelScore>
            <PlayButton className="block-center" onClick = {() => BeginningProcedure()} top={"49vh"}>Play</PlayButton>
        </WelcomePanel>*/
export default Main;