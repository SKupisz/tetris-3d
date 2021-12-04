import React, {useRef, useState} from "react";
import {useLoader, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {TextureLoader} from "three";
import * as THREE from "three";

import BoxTexture from "../assets/box.jpg";
import BackgroundOfTheWall from "../assets/wall.png";

import Base from "./game/base.jsx";
import BlocksRendering from "./game/blocksRendering.jsx";

const Game = () => {
    
    const [currentBlocks, setCurrentBlocks] = useState([{
        centerCoords: [0,7,0],
        color: "red",
        blocksPositions: [
            [0,0,0],
            [1,0,0]
        ]
    }]);

    const [isBlockMoving, toggleIsBlockMoving] = useState(true);

    const [boxMap, wallMap] = useLoader(TextureLoader, [BoxTexture, BackgroundOfTheWall]);

    const orbitsRef = useRef();

    useFrame(({clock}) => {

        const elapsedTime = clock.getElapsedTime();

        let operand = [...currentBlocks];
        for(let i = 0 ; i < operand.length; i++){
            if(operand[i]["centerCoords"][1] >= -1.5){
                operand[i]["centerCoords"][1] -= 0.01;
            }
        }
        setCurrentBlocks(operand);
    });

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