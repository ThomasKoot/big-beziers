import React, { useState, useRef, useEffect } from 'react'
import { getMousePos, getReferencedMousePos } from "../utility/getMousePos"
import styled from 'styled-components'
import canvasRenderer from './CanvasRenderer'

const SvgContainer = styled.div`
    border: 1px solid green;
    height: 500px;
    width: 500px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`

function PointCanvas(props) {

    const [points, setPoints] = useState([]);
    const [isAnimated, setIsAnimated] = useState(false)
    const canvasRef = useRef();
    const radius = 20;
    const phase = useRef(0.5)
    const cancelAnimation = useRef()
    

    useEffect(() => {
        if (isAnimated) {
            cancelAnimation.current = canvasRenderer(points, canvasRef.current, phase, isAnimated);
            return () => cancelAnimation.current()
        } else {
            canvasRenderer(points, canvasRef.current, phase, isAnimated)
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
                <canvas ref={canvasRef} width="500px" height="500px" onMouseDown={handleClick}/>
            </SvgContainer>
        </Wrapper>
        );
}

export default PointCanvas