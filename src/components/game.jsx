import React, {useRef, useState, useEffect} from "react";
import {useLoader, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {TextureLoader} from "three";
import * as THREE from "three";

import BoxTexture from "../assets/box.jpg";
import BackgroundOfTheWall from "../assets/wall.png";

import Base from "./game/base.jsx";
import BlocksRendering from "./game/blocksRendering.jsx";

import Data from "../data/block.json";

const Game = (props) => {
    
    const [currentBlocks, setCurrentBlocks] = useState([{
        centerCoords: [0,7,0],
        color: "red",
        blocksPositions: [
            [0,0,0]
        ],
        counted: false
    }]);

    const [filledBlocks, setFilledBlocks] = useState([]);

    const [isBlockMoving, toggleIsBlockMoving] = useState(true);

    const [boxMap, wallMap] = useLoader(TextureLoader, [BoxTexture, BackgroundOfTheWall]);

    const orbitsRef = useRef();

    const StopTheBlock = (i, operand) => {
        let filledOperand = [...filledBlocks];
        for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
            const forAdding = [operand[i]["centerCoords"][0]+operand[i]["blocksPositions"][j][0],
            operand[i]["centerCoords"][1]+operand[i]["blocksPositions"][j][1],
            operand[i]["centerCoords"][2]+operand[i]["blocksPositions"][j][2]];
            filledOperand.push(forAdding);
        }
        setFilledBlocks(filledOperand);
    };

    useFrame(({clock}) => {

        const elapsedTime = clock.getElapsedTime();

        let operand = [...currentBlocks];
        let flag = false, movingFlag = false; // flag is for detecting if any of the blocks are moving
        // movingFlag is for detecting if the block can be moved
        for(let i = 0 ; i < operand.length; i++){
            if(operand[i]["centerCoords"][1] >= -1.5){
                flag = true;
                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                    for(let k = 0 ; k < filledBlocks.length; k++){                        
                        if(operand[i]["blocksPositions"][j][0]+operand[i]["centerCoords"][0] === filledBlocks[k][0] && 
                        operand[i]["blocksPositions"][j][2]+operand[i]["centerCoords"][2] === filledBlocks[k][2] && 
                        operand[i]["blocksPositions"][j][1]+operand[i]["centerCoords"][1] <= filledBlocks[k][1]+1){
                            StopTheBlock(i, operand);
                            operand[i]["counted"] = true;
                            flag = false;
                            break;
                        }
                    }
                }
                if(flag === true){
                        
                    operand[i]["centerCoords"][1] -= 0.05;

                    if(props.movingDirection !== 0){
                        movingFlag = true;
                        switch(props.movingDirection){
                            case 1:
                                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                                    if(operand[i]["blocksPositions"][j][2]+operand[i]["centerCoords"][2] <= -1.5) {
                                        movingFlag = false;
                                        break;
                                    }
                                }
                                if(movingFlag === true) operand[i]["centerCoords"][2]-=1;
                                break;
                            case 2:
                                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                                    if(!(operand[i]["blocksPositions"][j][0]+operand[i]["centerCoords"][0] <= 1.5)) {
                                        movingFlag = false;
                                        break;
                                    }
                                }
                                if(movingFlag) operand[i]["centerCoords"][0]+=1;
                                break;
                            case 3:
                                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                                    if(operand[i]["blocksPositions"][j][2]+operand[i]["centerCoords"][2] >= 1.5) {
                                        movingFlag = false;
                                        break;
                                    }
                                }
                                if(movingFlag === true) operand[i]["centerCoords"][2]+=1;
                                break;
                            case 4:
                                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                                    if(operand[i]["blocksPositions"][j][0]+operand[i]["centerCoords"][0] < -1.5) {
                                        movingFlag = false;
                                        break;
                                    }
                                }
                                if(movingFlag) operand[i]["centerCoords"][0]-=1;
                                break;
                            default:
                                break;
                        }

                        props.directionCallback(); // we reset the direction back to zero
                    } 

                }          
            }
            else if(operand[i]["counted"] === false){
                StopTheBlock(i, operand);
                operand[i]["counted"] = true;
                console.log(operand);
            }

        }
        if(flag !== isBlockMoving) toggleIsBlockMoving(flag);
        setCurrentBlocks(operand);
    });

    useEffect(() => {
        if(isBlockMoving === false){
            let operand = [...currentBlocks];
            operand.push({
                centerCoords: [0,7,0],
                color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`,
                blocksPositions: Data["blocks"][Math.floor(Math.random()*3)],
                counted: false
            });
            setCurrentBlocks(operand);
            toggleIsBlockMoving(false);
        }
    }, [isBlockMoving]);

    return <>       
        <ambientLight color="#fff"/>
        <group position={[0,-6,-6]}>
            <Base textureMap={boxMap} wallMap={wallMap}/>
            <BlocksRendering currentBlocks={currentBlocks}/>
            <OrbitControls enableZoom={true} enableRotation={true} enablePan={false}
                rotateSpeed={0.8} zoomSpeed={0.6} zoom0={0.4} maxZoom={0.9} minZoom={0.4} 
                target={[0 , -6, -6]} ref = {orbitsRef}/>
        </group>
    </>
};

export default Game;