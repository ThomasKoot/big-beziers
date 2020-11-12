import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import styled from 'styled-components'
import { getReferencedMousePos, constrain } from '../utility/getMousePos';

const Line = styled.line`
    stroke-width: 6;
    stroke: ${props => props.color};
    stroke-linecap: round;
`

const Circle = styled.circle`
    stroke: white;
    stroke-width: 1;
    fill: ${props => props.color};
    &:hover {
        fill: ${props => props.hoverColor};
        cursor: pointer;
    }
`

const SVG = styled.svg`
    height: 100%;
    width: ${props => props.width};
    max-width: 100%;
    touch-action: none;
    `

function Slider( {title, value, setValue, trackColor = "green", circleColor = "blue", hoverColor = "yellow"} ) {

const [width, setWidth] = useState();

useLayoutEffect(() => {
    function scaleSlider() {
        const height = clickArea.current.clientHeight;
        setWidth(height/26 * 100);
    }
    scaleSlider();

    function cleanUp() {
        window.removeEventListener('resize', scaleSlider)
        console.log("cleaned up")
    }

    window.addEventListener('resize', scaleSlider);

    return cleanUp;
}, [])

    const clickArea = useRef();

    function calculateSliderValue(e) {
        const value = (getReferencedMousePos(clickArea.current, e).x - 0.14) * (1/.72);
        return constrain(value, 0, 1);
    }

    function onCircleClick(e) {
    
        const isMobile = /^touch/.test(e.type)
        const handlerSwitch = {
            drag: isMobile ? "touchmove" : "mousemove",
            release: isMobile ? "touchend" : "mouseup"
        }

        function handleDrag (e) {
            if (!isMobile) { 
                e.preventDefault();
            }
            setValue(calculateSliderValue(e))
        }

        handleDrag(e);        

        function cleanUp() {
            window.removeEventListener(handlerSwitch.drag, handleDrag);
            window.removeEventListener(handlerSwitch.release, cleanUp)
        }

        window.addEventListener(handlerSwitch.drag, handleDrag)
        window.addEventListener(handlerSwitch.release, cleanUp)
    }

    return (
            <SVG viewBox='0 0 100 26' xmlns="http://www.w3.org/2000/svg" ref={clickArea} width={width}>
                <Line color={trackColor} x1='15' y1="13" x2="85" y2="13" onClick={(e) => setValue(calculateSliderValue(e))}/>
                <Circle color={circleColor} hoverColor={hoverColor} cx={value * 72 + 14} cy="13" r="6" onMouseDown={onCircleClick} onTouchStart={onCircleClick}/>
            </SVG> 
    )
}

export default Slider;
