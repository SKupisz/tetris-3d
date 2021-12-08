import React from "react";

const column = (texture,elems, x, z) => {
    let list = [];
    for(let i = 0 ; i < elems; i++){
        list.push(<mesh position={[x,-1.5+i,z]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial map={texture} roughness={0.5} metalness={0.6}/>
        </mesh>);
    }
    return list;
}

const Base = (props) => {

    const COLUMNS_NUMBER = 7;

    return <>
            <mesh position={[0,-2.5,0]}>
                <boxGeometry args={[7,1,7]}/>
                <meshStandardMaterial map={props.textureMap} roughness={0.5} metalness={0.6}/>
            </mesh>
            {column(props.textureMap, COLUMNS_NUMBER, 3, 3)}
            {column(props.textureMap, COLUMNS_NUMBER, 3, -3)}
            {column(props.textureMap, COLUMNS_NUMBER, -3, 3)}
            {column(props.textureMap, COLUMNS_NUMBER, -3, -3)}
            <mesh position={[3,1.5,0]}>
                <boxGeometry args={[1,COLUMNS_NUMBER,5]}/>
                <meshStandardMaterial map={props.wallMaps[0]} transparent={true}/>
            </mesh>
            <mesh position={[0,1.5,3]}>
                <boxGeometry args={[5,COLUMNS_NUMBER,1]}/>
                <meshStandardMaterial map={props.wallMaps[1]} transparent={true}/>
            </mesh>
            <mesh position={[-3,1.5,0]}>
                <boxGeometry args={[1,COLUMNS_NUMBER,5]}/>
                <meshStandardMaterial map={props.wallMaps[2]} transparent={true}/>
            </mesh>
            <mesh position={[0,1.5,-3]}>
                <boxGeometry args={[5,COLUMNS_NUMBER,1]}/>
                <meshStandardMaterial map={props.wallMaps[3]} transparent={true}/>
            </mesh>
    </>
};

export default Base;