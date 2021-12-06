import React from "react";

import BlockBox from "./blockBox.jsx";

const BlocksRendering = (props) => {
    console.log(props.currentBlocks);
    return <>
        {
            props.currentBlocks ? props.currentBlocks.map((elem, ind) => {
                if(elem["type"] === "dynamic") return elem["blocksPositions"].map((elem2, ind2) => <BlockBox
                    key={"block-"+ind+"-"+ind2} position={[elem["centerCoords"][0]+elem2[0], elem["centerCoords"][1]+elem2[1],
                    elem["centerCoords"][2]+elem2[2]]} color={elem["color"]}/>)
                else return <BlockBox key={"static-block-"+ind} position = {elem["coords"]} color={elem["color"]}/>
            }) : null
        }
    </>;
}
/* <BlockBox
                    key={"block-"+ind+"-"+ind2} position={[elem["centerCoords"][0]+elem2[0], elem["centerCoords"][1]+elem2[1],
                    elem["centerCoords"][2]+elem2[2]]} color={elem["color"]}/>*/

export default BlocksRendering;