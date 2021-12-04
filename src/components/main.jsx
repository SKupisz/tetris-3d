import React, {Suspense} from "react";
import styled from "styled-components";
import {Canvas} from "@react-three/fiber";

import Game from "./game.jsx";

const CanvasContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Main = () => {
    return <CanvasContainer>
        <Canvas>
            <Suspense fallback={null}>
                <Game/>
            </Suspense>
        </Canvas>
    </CanvasContainer>
};

export default Main;