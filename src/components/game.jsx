import React, {useRef, useState, useEffect} from "react";
import {useLoader, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {TextureLoader} from "three";

import BoxTexture from "../assets/box.jpg";
import BackgroundOfTheWall from "../assets/wall.png";
import BackgroundOfTheWall1 from "../assets/wall_1.png";
import BackgroundOfTheWall2 from "../assets/wall_2.png";
import BackgroundOfTheWall3 from "../assets/wall_3.png";

import Base from "./game/base.jsx";
import BlocksRendering from "./game/blocksRendering.jsx";

import Data from "../data/block.json";

const Game = ({isPlayed, playedCallback, counter, setCounter, movingDirection, directionCallback, rotatingDirection, rotationCallback}) => {
    
    const [currentBlocks, setCurrentBlocks] = useState([]);
    const [filledBlocks, setFilledBlocks] = useState([]);
    const [isBlockMoving, toggleIsBlockMoving] = useState(false);
    const [boxMap, wallMap, wallMap1, wallMap2, wallMap3] = useLoader(TextureLoader, [BoxTexture, BackgroundOfTheWall,
        BackgroundOfTheWall1, BackgroundOfTheWall2, BackgroundOfTheWall3]);
    const orbitsRef = useRef();

    const LIGHT_POS_COORD = 14;

    const StopTheBlock = (i, operand) => {
        if(isPlayed === true){
            let filledOperand = [...filledBlocks];
            for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                const forAdding = [operand[i]["centerCoords"][0]+operand[i]["blocksPositions"][j][0],
                operand[i]["centerCoords"][1]+operand[i]["blocksPositions"][j][1],
                operand[i]["centerCoords"][2]+operand[i]["blocksPositions"][j][2]];
                if(forAdding[1] <= 4) filledOperand.push({
                    color: operand[i]["color"],
                    coords: forAdding,
                    type: "static"
                });
                else{
                    playedCallback();
                    break;
                }
            }
            ClearUpTheBlocks(filledOperand);
        }
    };

    const ClearUpTheBlocks = (blocks) => {
        let mainOperand = [...blocks],
        passedHeightsOperand = [], counter = 0;
        let i = 0, isStoppedHelper = false;
        //console.log("beginning", mainOperand);
        while(i < mainOperand.length){
            if(passedHeightsOperand.includes(mainOperand[i]["coords"][1]) === false){
                const helperHeight = mainOperand[i]["coords"][1];
                counter = 1;
                isStoppedHelper=false;
                for(let j = i+1; j < mainOperand.length; j++){
                    //console.log(mainOperand[j]["coords"][1], helperHeight);
                    if(mainOperand[j]["coords"][1].toFixed(2) > 4){
                        isStoppedHelper = true;
                        break;
                    }
                    if(mainOperand[j]["coords"][1].toFixed(2) === helperHeight.toFixed(2)) counter++;
                }
                if(isStoppedHelper === true){
                    playedCallback();
                    break;
                }
                //console.log(counter);
                if(counter === 25){ // number of possible fields
                    let helperInd = 0;
                    while(helperInd < mainOperand.length){
                        if(mainOperand[helperInd]["coords"][1].toFixed(2) === helperHeight.toFixed(2)){
                            mainOperand = mainOperand.splice(0,helperInd).concat(mainOperand.splice(helperInd+1, mainOperand.length));
                        }
                        else {
                            mainOperand[helperInd]["coords"][1]--;
                            helperInd++;
                        }
                    }
                    setCounter(counter+25);
                }
                passedHeightsOperand.push(helperHeight);
            }
            //console.log(mainOperand);
            i++;
        }
        setFilledBlocks(mainOperand);
    };

    const StartTheNewBlock = () => {
        let operand = [];//...currentBlocks
            operand.push({
                centerCoords: [0,7,0],
                color: `rgb(${100+Math.floor(Math.random()*155)}, ${100+Math.floor(Math.random()*155)}, 
                ${100+Math.floor(Math.random()*155)})`,
                blocksPositions: Data["blocks"][Math.floor(Math.random()*Data["blocks"].length)],
                counted: false,
                type: "dynamic"
            });
        if(isPlayed) setCurrentBlocks(operand);
        toggleIsBlockMoving(false);
    }

    useFrame(({clock}) => {

        //const elapsedTime = clock.getElapsedTime();

        let operand = [...currentBlocks];
        let flag = false, movingFlag = false; // flag is for detecting if any of the blocks are moving
        // movingFlag is for detecting if the block can be moved
        for(let i = 0 ; i < operand.length; i++){
            if(operand[i]["centerCoords"][1] >= -1.45){
                flag = true;
                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                    for(let k = 0 ; k < filledBlocks.length; k++){                        
                        if(operand[i]["blocksPositions"][j][0]+operand[i]["centerCoords"][0] === filledBlocks[k]["coords"][0] && 
                        operand[i]["blocksPositions"][j][2]+operand[i]["centerCoords"][2] === filledBlocks[k]["coords"][2] && 
                        operand[i]["blocksPositions"][j][1]+operand[i]["centerCoords"][1] <= filledBlocks[k]["coords"][1]+1){
                            StopTheBlock(i, operand);
                            operand[i]["counted"] = true;
                            flag = false;
                            break;
                        }
                    }
                }
                if(flag === true){
                        
                    operand[i]["centerCoords"][1] -= 0.03;

                    if(movingDirection !== 0){
                        movingFlag = true;
                        switch(movingDirection){
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

                        directionCallback(); // we reset the direction back to zero
                    } 
                    if(rotatingDirection !== 0){
                        switch(rotatingDirection){
                            case 1:
                                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                                    let helper = operand[i]["blocksPositions"][j][0];
                                    operand[i]["blocksPositions"][j][0] = operand[i]["blocksPositions"][j][2];
                                    operand[i]["blocksPositions"][j][2] = helper;
                                    operand[i]["blocksPositions"][j][0]*=(-1);
                                }
                                break;
                            case -1: 
                                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                                    let helper = operand[i]["blocksPositions"][j][2];
                                    operand[i]["blocksPositions"][j][2] = operand[i]["blocksPositions"][j][0];
                                    operand[i]["blocksPositions"][j][0] = helper;
                                    operand[i]["blocksPositions"][j][2]*=(-1);
                                }
                                break;
                            case 2:
                                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                                    let helper = operand[i]["blocksPositions"][j][1];
                                    operand[i]["blocksPositions"][j][1] = operand[i]["blocksPositions"][j][2];
                                    operand[i]["blocksPositions"][j][2] = helper;
                                    operand[i]["blocksPositions"][j][1]*=(-1);
                                }
                                break;
                            case -2:
                                for(let j = 0 ; j < operand[i]["blocksPositions"].length; j++){
                                    let helper = operand[i]["blocksPositions"][j][2];
                                    operand[i]["blocksPositions"][j][2] = operand[i]["blocksPositions"][j][1];
                                    operand[i]["blocksPositions"][j][1] = helper;
                                    operand[i]["blocksPositions"][j][2]*=(-1);
                                }
                                break;
                            default: 
                                break;
                        }
                        rotationCallback(); // we reset the rotation back to zero
                    }

                }       
            }
            else if(operand[i]["counted"] === false){
                StopTheBlock(i, operand);
                operand[i]["counted"] = true;
            }

        }
        if(flag !== isBlockMoving) toggleIsBlockMoving(flag);
        setCurrentBlocks(operand);
    });

    useEffect(() => {
        if(isBlockMoving === false){
            StartTheNewBlock();
        }
    }, [isBlockMoving, isPlayed]);
    useEffect(() => {
        if(isPlayed === true){
            setCurrentBlocks([]);
            setFilledBlocks([]);
            StartTheNewBlock();
        }
    }, [isPlayed]);

    return <>       
        <spotLight position={[-LIGHT_POS_COORD,-10,-LIGHT_POS_COORD]} color={currentBlocks.length > 0 ? currentBlocks[0]["color"] : "#fff"} intensity={2}/>
        <spotLight position={[LIGHT_POS_COORD,-10,-LIGHT_POS_COORD]} color={currentBlocks.length > 0 ? currentBlocks[0]["color"] : "#fff"} intensity={2}/>
        <spotLight position={[-LIGHT_POS_COORD,-10,LIGHT_POS_COORD]} color={currentBlocks.length > 0 ? currentBlocks[0]["color"] : "#fff"} intensity={2}/>
        <spotLight position={[LIGHT_POS_COORD,-10,LIGHT_POS_COORD]} color={currentBlocks.length > 0 ? currentBlocks[0]["color"] : "#fff"} intensity={2}/>
        <spotLight position={[LIGHT_POS_COORD,15,LIGHT_POS_COORD]} angle={180} color={currentBlocks.length > 0 ? currentBlocks[0]["color"] : "#fff"} intensity={2}/>
        <group position={[0,-6,-6]}>
            <Base textureMap={boxMap} wallMaps={[wallMap, wallMap1, wallMap2, wallMap3]}/>
            <BlocksRendering currentBlocks={[...currentBlocks, ...filledBlocks]}/>
            <OrbitControls enableZoom={true} enableRotation={true} enablePan={false}
                rotateSpeed={0.8} zoomSpeed={0.6} zoom0={0.4} maxZoom={0.9} minZoom={0.4} 
                target={[0 , -6, -6]} ref = {orbitsRef}/>
        </group>
    </>
};
//<ambientLight color="#fff"/>

export default Game;