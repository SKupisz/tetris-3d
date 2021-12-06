import React, {Suspense, useState} from "react";
import styled from "styled-components";
import {Canvas} from "@react-three/fiber";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { SteeringPanel, SteeringButtons, SteeringButton,
    RotatingButtonsPanel, RotateButton } from "../styled/styled.jsx";

import Game from "./game.jsx";

const CanvasContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Main = () => {

    const [movingDirection, setMovingDirection] = useState(0); // 1 - north, 2 - west, 3 - south, 4 - east
    const [rotatingDirection, setRotatingDirection] = useState(0); // 1 - right, -1 - left

    return <CanvasContainer>
        <Canvas>
            <Suspense fallback={null}>
                <Game movingDirection = {movingDirection}
                directionCallback={() => setMovingDirection(0)}
                rotatingDirection={rotatingDirection}
                rotationCallback={() => setRotatingDirection(0)}/>
            </Suspense>
        </Canvas>
        <SteeringPanel className="block-center">
            <SteeringButtons className="block-center">
                <SteeringButton/>
                <SteeringButton isbutton onClick = {() => setMovingDirection(1)}>
                    <ArrowUpwardIcon style={{fontSize: "1.3em"}}/>
                </SteeringButton>
                <SteeringButton/>

                <SteeringButton isbutton onClick = {() => setMovingDirection(4)}>
                    <ArrowBackIcon style={{fontSize: "1.3em"}}/>
                </SteeringButton>
                <SteeringButton/>
                <SteeringButton isbutton onClick = {() => setMovingDirection(2)}>
                    <ArrowForwardIcon style={{fontSize: "1.3em"}}/>
                </SteeringButton>

                <SteeringButton/>
                <SteeringButton isbutton onClick = {() => setMovingDirection(3)}>
                    <ArrowDownwardIcon style={{fontSize: "1.3em"}}/>
                </SteeringButton>
                <SteeringButton/>
            </SteeringButtons>
            <RotatingButtonsPanel className="block-center">
                <RotateButton onClick = {() => setRotatingDirection(-1)}>Left</RotateButton>
                <RotateButton onClick={() => setRotatingDirection(1)}>Right</RotateButton>
            </RotatingButtonsPanel>
        </SteeringPanel>
    </CanvasContainer>
};

export default Main;