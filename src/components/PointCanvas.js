import React, { useState, useRef, useEffect } from 'react'
import { getMousePos, getReferencedMousePos } from "../utility/getMousePos"
import styled from 'styled-components'
import canvasRenderer from './CanvasRenderer'
import { radius } from './constants'

const SvgContainer = styled.div`
    border: 1px solid green;
    height: 50%;
    width: 50%;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`

function PointCanvas(props) {

    const [points, setPoints] = useState([]);
    const [isAnimated, setIsAnimated] = useState(false)
    const canvasRef = useRef();
    const containerRef = useRef();
    const phase = useRef(0.25);
    const cancelAnimation = useRef();


    useEffect(() => {

        function scaleCanvas() {
            canvasRef.current.width = containerRef.current.clientWidth;
            canvasRef.current.height = containerRef.current.clientWidth;
        }

        function resizeHandler() {
            scaleCanvas();
        }
        resizeHandler();

        
        window.addEventListener('resize', resizeHandler);
        return () => { window.removeEventListener('resize', resizeHandler) }
    },[])
    
    useEffect(() => {
        console.log("i'm here")
        if (isAnimated) {
            cancelAnimation.current = canvasRenderer(points, canvasRef, phase, isAnimated);
            return () => cancelAnimation.current()
        } else {
            canvasRenderer(points, canvasRef, phase, isAnimated)
        }
    }, [points, isAnimated])

    function handleClick(e) {
        
        const mouse = getMousePos(e);
        const withinMouseRange = compareRange(mouse, radius)
        let moved;

        let newState = points.map((p, i) => {
            const inRange = withinMouseRange(p);
            if (inRange && moved === undefined) {
                moved = i;
                return [mouse.x, mouse.y]
            } else {
                return p;
            }
        })

        newState = moved !== undefined ? newState : [...newState, [mouse.x, mouse.y]]
        moved = moved === undefined ? points.length : moved

        setPoints(newState)
        
        function cleanUp() {
            window.removeEventListener('mousemove', handleDrag)
            window.removeEventListener('mouseup', cleanUp)
        }

        function handleDrag(e) {
            const mouse = getReferencedMousePos(canvasRef.current, e);
            setPoints(prev => prev.map((p, i) => {
                return i === moved ? [mouse.x, mouse.y] : p
            }))
        }

        window.addEventListener('mousemove', handleDrag)
        window.addEventListener('mouseup', cleanUp)
    }

    function compareRange(mouse, range) {
        return function inner(point) {
            const dist = Math.sqrt((mouse.x-point[0]) ** 2 + (mouse.y-point[1]) ** 2)
            return dist < range
        }
    }
    
    return (
        <Wrapper>
            <button onClick={() => setIsAnimated(prev => !prev)}>animate!</button>
            <SvgContainer>
                <div ref={containerRef} style={{width: "100%", height: "100%"}}>
                    <canvas ref={canvasRef} onMouseDown={handleClick}/>
                </div>
            </SvgContainer>
        </Wrapper>
        );
}

export default PointCanvas