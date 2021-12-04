import React from "react";

const BlockBox = (props) => {
    return <mesh position = {props.position ? props.position : [0,0,0]}>
        <boxGeometry args={[1,1,1]}/>
        <meshPhongMaterial color={props.color}/>
    </mesh>
};

export default BlockBox;