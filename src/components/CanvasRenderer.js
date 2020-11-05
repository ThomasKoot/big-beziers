import { findBezierPaths } from './functions'
import { renderScreen } from './drawFunctions'
import { calculateBezierPath } from './berzierFunction';

function canvasRenderer (points, canvas, phaseRef, isAnimated) {
    //handles the rendering of the canvas, takes a phaseRef which is used to increment the phase without
    //rerendering the parent component. 

    //when isAnimated the function starts the animation and return a function that stops the animation, 
    //otherwise, only a single screen in rendered. 

    let requestId;
    const bezierPath = calculateBezierPath(points.map(e => e.map(x => x * canvas.current.clientWidth)), 200);

    function animate() {
        phaseRef.current = (phaseRef.current + 0.001) % 1;
        const paths = findBezierPaths(points, phaseRef.current, canvas.current.clientWidth)
        renderScreen(paths, canvas, bezierPath)
        requestId = requestAnimationFrame(animate)
    }

    if (isAnimated) { 
        requestId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestId)
    } else {
        const paths = findBezierPaths(points, phaseRef.current, canvas.current.clientWidth)
        renderScreen(paths, canvas, bezierPath)
    }
}


export default canvasRenderer;