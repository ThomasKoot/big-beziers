import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components'

import canvasRenderer from './renderers/canvasRenderer';
import { setupClickHandler } from './uiHandlers/handleClick'
import calculateBezierArray from './calculations/berzierFunction';
import { data } from './data.js';


const Paragraph = styled.p`
    margin: 20px;
    font-size: 2.5vh;
    color: rgb(160,160,160)
`

const ParagraphContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CanvasContainer = styled.div`
    height: ${props => "" + props.height + "px"};
    background-color: white;
    border-radius: 10px;
    width: 100%;
    background-color: white;
    display: flex;
    position: relative;
`


function CanvasArea( { points, setPoints, phase, displayInfo, setDisplayInfo } ) {
  
    const [canvasSize, setCanvasSize] = useState(0);
    const [bezierArray, setBezierArray] = useState()
    const canvasRef = useRef();
    const containerRef = useRef();

    useEffect(() => {   
        //calculates the function of the bezier curve, runs only when points are updated

        setBezierArray((points) ? calculateBezierArray(points, 100) : undefined);
    }, [points])
    
    useEffect(() => {    
        //renders the canvas

        if (canvasRef.current) {
            canvasRenderer(points, phase, canvasRef, bezierArray)
        }
    })

    useEffect(() => {   
        //scale the canvas on resize

        function scaleCanvas() {
            setCanvasSize(containerRef.current.clientWidth)
        }
        scaleCanvas();
        window.addEventListener('resize', scaleCanvas);
        return () => { window.removeEventListener('resize', scaleCanvas) }
    }, [])
    
    const handleClick = displayInfo ? () => setDisplayInfo(false) : setupClickHandler(points, setPoints);

    const isMobile = (matchMedia('(pointer:coarse)').matches) ? true : false;

    function renderParagraph(text) {
        //render the text when the canvas is not in view (landing page & info page)
        return (
            <ParagraphContainer>
                <Paragraph>{text}</Paragraph>
            </ParagraphContainer>
        )
    }

    function renderCanvas() {
        return (
            <canvas ref={canvasRef} style={{touchAction: "none"}} width={canvasSize} height={canvasSize}></canvas>
        )
    }

    return (
        <div>
            <CanvasContainer ref={containerRef} height={canvasSize} onMouseDown={isMobile ? null : handleClick} onTouchStart={handleClick}>
                {displayInfo ? renderParagraph(data.info) : (points.length === 0 ? renderParagraph(data.blank) : renderCanvas())}
            </CanvasContainer>
        </div>
    );
}

export default CanvasArea;